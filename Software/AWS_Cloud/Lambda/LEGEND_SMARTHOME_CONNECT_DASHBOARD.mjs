import { ApiGatewayManagementApiClient, PostToConnectionCommand } from "@aws-sdk/client-apigatewaymanagementapi"; 
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

// // Dynamo DB client config
const dynamo_db_client = new DynamoDBClient({});
const dynamo_client = DynamoDBDocumentClient.from(dynamo_db_client);
const connectionTable = "CONNECTION_MANAGEMENT_DB";
const dataTable = "SMARTHOME_SENSOR_DATA_DB";

// API Gateway client config
const ENDPOINT = "https://m45bd73suj.execute-api.us-east-1.amazonaws.com/production";
const api_gw_client = new ApiGatewayManagementApiClient({endpoint: ENDPOINT});

export async function handler(event, context) {
    const routeKey = await event.requestContext.routeKey;
    const connectionId = await event.requestContext.connectionId;
    const apiId = await event.requestContext.apiId;
    const body = await event.body?event.body:"";
    console.log(event, context)
    switch (routeKey) 
    {
      case '$connect':
        try {
          await dynamo_client.send (
            await new PutCommand ({
                TableName: connectionTable,
                Item: {
                  "connectionId": connectionId
                },
            }));
        }
        catch (err) {
          console.log(err)
        }
        return {statusCode: 200};
      case '$disconnect':
        try {
          await dynamo_client.send (
            await new DeleteCommand ({
                TableName: connectionTable,
                Key: {
                  "connectionId": connectionId
                },
            }));
        }
        catch (err) {
          console.log(err)
        }
        return {statusCode: 200};
      case 'updateData':
        try {
          const resData = await dynamo_client.send (
            await new ScanCommand ({ TableName: dataTable })
          );
          return {statusCode: 200, body: JSON.stringify(await resData.Items)};
        }
        catch (err) {
          console.log(err)
          return {statusCode: 500, body: JSON.stringify(err)};
        }
        // const input = {
        //   Data: JSON.stringify("NOOOO"),
        //   ConnectionId: connectionId + "sd",
        // };
        // try {
        //   const command = await new PostToConnectionCommand(input);
        //   await api_gw_client.send(command);
        // } catch (err) {
        //   console.log(err)
        // }
      default:
        console.log("Something wrong!")
    }
    return { statusCode: 200 };
}