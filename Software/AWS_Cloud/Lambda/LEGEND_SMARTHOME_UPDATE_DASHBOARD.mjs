import { ApiGatewayManagementApiClient, PostToConnectionCommand } from "@aws-sdk/client-apigatewaymanagementapi"; 
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

/* Dynamo DB client config */
const dynamo_db_client = new DynamoDBClient({});
const dynamo_client = DynamoDBDocumentClient.from(dynamo_db_client);
const connectionTable = "CONNECTION_MANAGEMENT_DB";
const dataTable = "SMARTHOME_SENSOR_DATA_DB";

/* API Gateway client config */
const ENDPOINT = "https://m45bd73suj.execute-api.us-east-1.amazonaws.com/production";
const api_gw_client = new ApiGatewayManagementApiClient({endpoint: ENDPOINT});

export async function handler(event) {
    try {
      const res_connectionId = await dynamo_client.send (await new ScanCommand ({ TableName: connectionTable }));
      const connectionIds = res_connectionId.Items;
    
      // console.log(event, res_connectionId)
    
      const resData = await dynamo_client.send ( await new ScanCommand ({ TableName: dataTable }));
      console.log(resData)

      let broastcast = connectionIds.map(async (e) => {
        const input = {
            Data: JSON.stringify(resData.Items),
            ConnectionId: e.connectionId,
          }
        try {
          const command = await new PostToConnectionCommand(input)
          return await api_gw_client.send(command)
        } catch (err)
        {
          console.log(err)
        }
      })
      const res_promise = await Promise.all(broastcast);
      return { statusCode: 200, res: JSON.stringify(res_promise) };
    } catch (e) {
      console.log(e);
    }
    return { statusCode: 200 };
}