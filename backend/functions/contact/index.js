const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { contactSchema } = require('../../shared/validation');
const { contactEmailTemplate } = require('../../shared/email-templates');
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
    const validatedData = contactSchema.parse(body);

    const id = randomUUID();
    const now = Date.now();

    await docClient.send(new PutCommand({
      TableName: process.env.CONTACTS_TABLE,
      Item: {
        id,
        ...validatedData,
        createdAt: now,
      },
    }));

    await sesClient.send(new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [process.env.SES_FROM_EMAIL],
      },
      Message: {
        Subject: {
          Data: `Contact Form: ${validatedData.subject}`,
        },
        Body: {
          Html: {
            Data: contactEmailTemplate(validatedData),
          },
        },
      },
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Message sent successfully',
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
