const DRIFT_AUTH_TOKEN = process.env.DRIFT_AUTH_TOKEN;
const axios = require("axios");
const baseUrl = "https://driftapi.com/contacts/";
const headers = {
	Authorization: `Bearer ${DRIFT_AUTH_TOKEN}`,
	"Content-Type": "application/json",
};

const getDriftContact = async (contactId) => {
	return axios
		.get(baseUrl + contactId, {
			headers,
		})
		.then((res) => {
			return res.data.data.attributes;
		})
		.catch((err) => {
			console.log(err);
			return err
		});
};

module.exports = {
	getDriftContact,
};
