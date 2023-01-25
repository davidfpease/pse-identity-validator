require('dotenv').config()
const AWS = require('aws-sdk');
const profile = process.env.ENVIRONMENT;


//lambda will assume the permissions of the attached role, no need to request the credentials from a shared file
if (!process.env.LAMBDA_TASK_ROOT) {
  const credentials = new AWS.SharedIniFileCredentials({ profile });
  AWS.config.credentials = credentials;
}
AWS.config.update({
  region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = `pse-identity-validator-codes-${profile}`;

async function addCode(conversationId, code, orgId, email, driftContactId) {
  let params = {
    TableName: dynamodbTableName,
    Item: {
      "driftConvoId": conversationId.toString(),
      "code": code,
      "email": email,
      "orgId": orgId,
      "initiatedAt": Date.now(),
      "driftContactId": driftContactId
    }
  }

  return await dynamodb.put(params).promise().then((e) => {
    return true;
  }, error => {
    console.error('There is an error saving the code: ', error)
    return error;
  });
}

async function updateCode(conversationId, updateKey, updateValue) {
  let params = {
    TableName: dynamodbTableName,
    Key: {
      "driftConvoId": conversationId.toString()
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ':value': updateValue
    },
    ReturnValues: 'UPDATED_NEW'
  }

  return await dynamodb.update(params).promise().then((e) => {
    return e;
  }, error => {
    console.error('There is an error updating the code: ', error)
    return error;
  });

}

async function removeCode(conversationId) {
  let params = {
    TableName: dynamodbTableName,
    Key: {
      "driftConvoId": conversationId.toString()
    },
    ReturnValues: "ALL_OLD"
  }
  return await dynamodb.delete(params).promise().then((e) => {
    return e;
  }, error => {
    console.error('There is an error removing the code: ', error)
    return error;
  });
}

async function findCode(conversationId) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      "driftConvoId": conversationId.toString()
    }
  }

  return await dynamodb.get(params).promise().then(response => {
    return response;
  }, error => {
    console.log("Error finding code in the database.")
    return error;
  })
}

// async function queryRelays(phone) {
//   const params = {
//     TableName: dynamodbTableName,
//     Key: {
//       "whatsAppPhoneNum": phone
//     },
//     ExpressionAttributeValues: {
//       ':p': phone
//     },
//     KeyConditionExpression: 'whatsAppPhoneNum = :p'

//   }

//   return await dynamodb.query(params).promise().then(response => {
//     return response;
//   }, error => {
//     console.log("Error finding app Relay in the database.")
//     return error;
//   })
// }

// async function queryRelaysByConvoId(convoId) {
//   const params = {
//     TableName: dynamodbTableName,
//     IndexName: 'ConvoIdIndex',
//     ExpressionAttributeValues: {
//       ':c': convoId.toString()
//     },
//     KeyConditionExpression: 'driftConvoId = :c'

//   }

//   return await dynamodb.query(params).promise().then(response => {
//     return response;
//   }, error => {
//     console.log("Error finding app Relay in the database for convoId: "+convoId)
//     return error;
//   })
// }

module.exports = {
  addCode,
  updateCode,
  removeCode,
  findCode
}