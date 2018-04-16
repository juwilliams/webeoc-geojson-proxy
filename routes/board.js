module.exports = function(app) {
	let format				= require('string-format');

	format.extend(String.prototype);

	app.post('/board/getdata', function(req, res) {
		console.log(req.body);

		const {
			boardName,
			displayViewName
		} = req.body;

		const {
			username,
			password,
			position,
			incident
		} = req.body.credentials;

		res.send(`posting to ${boardName}`);
	});
}
