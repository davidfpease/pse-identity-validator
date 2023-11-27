const sendCodeEmail = async (email, code) => {

  const sparkpostApiKey = process.env.SPARKPOST_API_KEY;

  const axios = require('axios');
  const data = JSON.stringify({
    "campaign_id": "pse-identity-validator",
    "recipients": [
      {
        "address": email
      }
    ],
    "content": {
      "from": {
        "email": "email_verification@drift.com",
        "name": "Email Validation"
      },
      "subject": "Here is the code you requested.",
      "html": `<div> <meta name='format-detection' content='telephone=no'><table align='center'><tr><td width='500' style='padding:0px 10px 0px 10px;'><div style='max-width:500px; Font-Size:11pt; Font-Family: \"Segoe UI\", Arial, Helvetica;'><span style='Font-Size: 16pt;margin-left:10px'>Here is your one-time passcode</span><br><span style='Font-Size: 30pt'><span id='passcode'>${code}</span></span><br><br><span style=''>To verify your email, please enter the code in the chat where you requested it.</span><br><br><span style=''>NOTE: This one-time code expires 15 minutes after it was requested.</span><br><br><br><br><hr><span style='color:#888888'>This message was automatically generated when your email address was submitted to an interactive chat powered by Drift. Please don't reply to it.  If you believe this message was received in error please reach out to <a href=\"https://www.drift.com/contact-us/#contact-us\">Drift</a>.</span></div></td></tr></table>`,
      "text": `Here is your code, ${code}.  Please enter it in the chat where you requested the code.`
    }
  });

  const config = {
    method: 'post',
    url: 'https://api.sparkpost.com/api/v1/transmissions?num_rcpt_errors=3',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': sparkpostApiKey
    },
    data: data
  };

  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
}

module.exports = {
  sendCodeEmail
}