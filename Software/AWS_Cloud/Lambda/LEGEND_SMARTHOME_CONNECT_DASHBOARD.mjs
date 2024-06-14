import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

/* Dynamo DB client config */
const dynamo_db_client = new DynamoDBClient({});
const dynamo_client = DynamoDBDocumentClient.from(dynamo_db_client);
const connectionTable = "LEGEND_SMARTHOME_CONNECTION_MANAGEMENT";

export async function handler(event) {
    const routeKey = await event.requestContext.routeKey;
    const connectionId = await event.requestContext.connectionId;
    
    switch (routeKey)
    {
        case '$connect':
            return {statusCode: 200};
        case '$disconnect':
            try {
                await dynamo_client.send (
                    await new DeleteCommand ({
                        TableName: connectionTable,
                        Key: { "connectionId" : connectionId }
                    })
                );
                return {statusCode: 200};
            }
            catch (err) {
                console.log(err);
                return {statusCode: 500};
            }
        case 'user':
            try {
                const messageData = await JSON.parse(event.body);
                await dynamo_client.send (
                    await new PutCommand ({
                        TableName: connectionTable,
                        Item: {
                          "connectionId": connectionId,
                          "username": messageData.userName
                        }
                    })
                );
                const res = {"type": "auth", "status": 1};
                return {statusCode: 200, body: JSON.stringify(res)};
            }
            catch (err) {
                console.log(err)
                return {statusCode: 500, body: JSON.stringify(err)};
            }
    }
    return { statusCode: 200 };
}