module.exports = function(app) {
	let format				= require('string-format'),
		soap				= require('soap');

	const { webeoc_wsdl: wsdl } = app.settings.services;

	format.extend(String.prototype);

	//	request board data
	app.post('/board/getdata', function(req, res) {
		const {
			boardName: BoardName,
			displayViewName: DisplayViewName
		} = req.body;

		const {
			username: Username,
			password: Password,
			position: Position,
			incident: Incident
		} = req.body.credentials;

		const args = {
			credentials: { Username, Password, Position, Incident },
			BoardName,
			DisplayViewName
		};

		try {
			soap.createClient(wsdl, function(err, client) {				
				client.API.APISoap12.GetData(args, function(err, soap_res) {
					const { lastRequest } = client;
					console.log(lastRequest);
					res.send({ soap_res, lastRequest });
				});
			});
		} catch (err) {
			console.log(err);
		}
	});
}
