//in the atmos recipes the lambda is created with a local ENVIRONMENT variable of "prod" or "qa"
//this check allows for local dev, but will be ignored in the Lambda runtime environment

const setEnvironment = ()=>{
  if (!process.env.ENVIRONMENT){
    //for local dev
    process.env.ENVIRONMENT = "qa";

  } else if (process.env.ENVIRONMENT === "qa"){
    //qa on AWS
    process.env.DRIFT_AUTH_API_KEY = "b7297c47-2e11-4227-abee-1767cff694bd"
    process.env.DRIFT_VERIFICATION_TOKEN="OiEi7MijSVv5HHw36PBOjuWfmJv85zAc"
  } else {
    //prod on AWS
    process.env.DRIFT_AUTH_API_KEY = "set in the pse-app-secrets-prod DynamoDb table"
    process.env.DRIFT_VERIFICATION_TOKEN="set in the Drift dev portal where the app lives"
  }
}

module.exports = {
  setEnvironment
}