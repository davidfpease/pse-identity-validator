//in the atmos recipes the lambda is created with a local ENVIRONMENT variable of "prod" or "qa"
//this check allows for local dev, but will be ignored in the Lambda runtime environment

const setEnvironment = () => {
  if (!process.env.ENVIRONMENT) {
    //for local dev
    process.env.ENVIRONMENT = "qa";

  } else if (process.env.ENVIRONMENT === "qa") {
    //qa on AWS

  } else {
    //prod on AWS

  }
}

module.exports = {
  setEnvironment
}