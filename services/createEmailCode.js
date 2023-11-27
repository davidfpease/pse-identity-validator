const { sendCodeEmail } = require('./sendCodeEmail');
const { getDriftContact } = require('./drift/getDriftContact');
const codeTable = require('./dynamo/codeTable');

const createEmailCode = async (req, res) => {
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10);
  }
  res.status(200).json({
    "setContactAttributes": {
      "attribute1": "test value"
    }
  });

  let { conversationId, orgId, contactId } = req.body;
  let driftContact = await getDriftContact(contactId);

  let codeItem = await codeTable.addCode(conversationId, code, orgId, driftContact.email, contactId);

  if (codeItem) {
    await sendCodeEmail(driftContact.email, code)
  }
}

module.exports = {
  createEmailCode
}