const DRIFT_AUTH_TOKEN = process.env.DRIFT_AUTH_TOKEN;
const axios = require("axios");
const baseUrl = "https://driftapi.com/contacts/";
const headers = {
	Authorization: `Bearer ${DRIFT_AUTH_TOKEN}`,
	"Content-Type": "application/json",
};

//attributes is an object of attribute names and values
const updateDriftContact = async (contactId, attributes) => {
	return axios
		.patch(baseUrl + contactId,
			{
				"attributes": attributes
			},
			{
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
	updateDriftContact,
};
