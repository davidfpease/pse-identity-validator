const axios = require('axios');
const { sendCodeEmail } = require('./sendCodeEmail');
const { getDriftContact } = require('./drift/getDriftContact');
const codeTable = require('./dynamo/codeTable');

const createEmailCode = async (req, res) => {
  res.status(200).json({});
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10);
  }

  let { conversationId, orgId, contactId } = req.body;
  let driftContact = await getDriftContact(contactId);

  let codeItem = await codeTable.addCode(conversationId, code, orgId, driftContact.email, contactId);

  if (codeItem) {
    let emailSendStatus = await sendCodeEmail(driftContact.email, code)
  }








  // let driftToken, bearerToken;
  // const { orgId, type = "", data = {} } = req.body;
  // const convoId = data.conversationId

  // if (type === "new_command_message" && data.body === "/joke") {
  //   driftToken = await getToken(orgId);
  //   bearerToken = driftToken.Item.access_token;
  // }

  // const body = JSON.stringify({
  //   "type": "chat",
  //   "body": joke
  // })

  // const config = {
  //   method: 'post',
  //   url: baseUrl + convoId + "/messages",
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${bearerToken}`
  //   },
  //   data: body
  // };

  // axios(config)
  //   .then((response) => {

  //   }).catch(err => {
  //     console.log(err);
  //     postSlackErrorMessage(orgId, "<Your App Name Here>", err.message)
  //   })

}

module.exports = {
  createEmailCode
}