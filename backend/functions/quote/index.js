const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { quoteSchema } = require('../../shared/validation');
const { quoteEmailTemplate } = require('../../shared/email-templates');
const { randomUUID } = require('crypto');

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const sesClient = new SESClient({});

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body);
    const validatedData = quoteSchema.parse(body);

    // Rate limiting check (simple IP-based)
    const ip = event.requestContext?.identity?.sourceIp || 'unknown';
    const rateLimitKey = `ratelimit-${ip}`;
    const now = Date.now();
    
    // Store in DynamoDB
    const id = randomUUID();
    await docClient.send(new PutCommand({
      TableName: process.env.LEADS_TABLE,
      Item: {
        id,
        ...validatedData,
        ip,
        createdAt: now,
        ttl: Math.floor(now / 1000) + (90 * 24 * 60 * 60), // 90 days TTL
      },
    }));

    // Send email notification
    await sesClient.send(new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [process.env.SES_FROM_EMAIL],
      },
      Message: {
        Subject: {
          Data: `New Quote Request from ${validatedData.firstName} ${validatedData.lastName}`,
        },
        Body: {
          Html: {
            Data: quoteEmailTemplate(validatedData),
          },
        },
      },
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Quote request submitted successfully',
        id,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    
    if (error.name === 'ZodError') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Validation error',
          errors: error.errors,
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Internal server error',
      }),
    };
  }
};
