module.exports = function(app) {
	let format				= require('string-format');

	format.extend(String.prototype);

	app.post('/board/:name', function(req, res) {
		const board_name = req.params.name;

		res.send(`posting to ${board_name}`);
	});
}