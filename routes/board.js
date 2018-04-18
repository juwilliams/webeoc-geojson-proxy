module.exports = function(app) {
	let format					= require('string-format')
		, arcgisToGeoJsonUtils 	= require('@esri/arcgis-to-geojson-utils')
		, soap 					= require('soap')
		, parser				= require('xml2json');

	const { webeoc_wsdl: wsdl } = app.settings.services;

	format.extend(String.prototype);

	//	request board data
	app.post('/board/getdata', function(req, res) {
		const {
			boardName: BoardName,
			displayViewName: DisplayViewName
		} = req.body;

		const { getGeoJson } = req.query;

		//	fields to search for in the webeoc response which will contain geospatial location
		const { latitudeField, longitudeField } = req.body.hasOwnProperty('translation') ? req.body.translation : {};

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
					if ( err ) {
						res.status(500).send({ err });
						return;
					}

					const parsedXmlToJson = JSON.parse(parser.toJson(soap_res.GetDataResult));

					//	transform to geojson is the request indicated that
					//	the webeoc response would contain geospatial location fields
					if ( getGeoJson ) {
						const features = parsedXmlToJson.data.record.map(rec => ({
							attributes: rec,
							spatialReference: {
								wkid: 4326
							},
							geometry: {
								x: parseFloat(rec[longitudeField]),
								y: parseFloat(rec[latitudeField]),
							}
						}));

						const geoJson = arcgisToGeoJsonUtils.arcgisToGeoJSON({ features });

						res.send(geoJson);
					} else {
						res.send({ json, err });
					}
				});
			});
		} catch (err) {
			console.log(err);
		}
	});
}
