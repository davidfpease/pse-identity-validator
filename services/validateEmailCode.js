const axios = require('axios');
const { sendCodeEmail } = require('./sendCodeEmail');
const { updateDriftContact } = require('./drift/updateDriftContact');
const codeTable = require('./dynamo/codeTable');

const validateEmailCode = async (req, res) => {
  
  let { code, contactId, conversationId, orgId } = req.body;
  
  let codeItem = await codeTable.findCode(conversationId);
  
  if (codeItem) {
    //check for 15 minute expiration
    if(codeItem.Item.initiatedAt <= (Date.now() - 6000 * 15)){
      await updateDriftContact(contactId, {"valid_code": "expired"})
      res.status(200).json({});
    } else if (code === codeItem.Item.code) {
      await updateDriftContact(contactId, {"valid_code": "valid"})
      res.status(200).json({});
    } else {
      await updateDriftContact(contactId, {"valid_code": "invalid"})
      res.status(200).json({});
    }
  }
}

module.exports = {
  validateEmailCode
}