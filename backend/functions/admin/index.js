const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLES = {
  blog: 'lixi-blog',
  products: 'lixi-products',
  quotes: 'lixi-quotes',
  services: 'lixi-services',
  projects: 'lixi-projects',
  users: 'lixi-users',
  shopping: 'lixi-shopping',
  solutions: 'lixi-solutions',
  about: 'lixi-about'
};

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { resource, action } = event.pathParameters || {};
    const body = event.body ? JSON.parse(event.body) : {};

    if (!TABLES[resource]) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid resource' }) };
    }

    const tableName = TABLES[resource];

    switch (action) {
      case 'list':
        const scanResult = await docClient.send(new ScanCommand({ TableName: tableName }));
        return { statusCode: 200, headers, body: JSON.stringify(scanResult.Items || []) };

      case 'get':
        const getResult = await docClient.send(new GetCommand({
          TableName: tableName,
          Key: { id: body.id }
        }));
        return { statusCode: 200, headers, body: JSON.stringify(getResult.Item) };

      case 'create':
        await docClient.send(new PutCommand({
          TableName: tableName,
          Item: { ...body, id: body.id || Date.now().toString(), createdAt: Date.now() }
        }));
        return { statusCode: 201, headers, body: JSON.stringify({ success: true }) };

      case 'update':
        await docClient.send(new PutCommand({
          TableName: tableName,
          Item: { ...body, updatedAt: Date.now() }
        }));
        return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };

      case 'delete':
        await docClient.send(new DeleteCommand({
          TableName: tableName,
          Key: { id: body.id }
        }));
        return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };

      default:
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid action' }) };
    }
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
