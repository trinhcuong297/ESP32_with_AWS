import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient,  PutCommand } from "@aws-sdk/lib-dynamodb";

/* Config DynamoDB */
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "LEGEND_SMARTHOME_USER_TABLE";

export const handler = async (event, context) => {
  try 
  {
    await dynamo.send
    (
      new PutCommand
      (
        {
          TableName: tableName,
          Item: 
          {
            "userName": event.userName,
            "userAttribute": event.request
          },
        }
      )
    );
  }
  catch (error) {
    return error;
  }

  return event;
};
