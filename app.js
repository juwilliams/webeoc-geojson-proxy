let express					= require('express')
	, app					= express()
	, config				= require('./config/config.js')
	, format				= require('string-format')
	, fs					= require('fs')
	, https					= require('https')
	, https_port			= config.ports.web_ssl
	, https_server 			= https.createServer({ cert: fs.readFileSync(config.ssl_certificate), key: fs.readFileSync(config.ssl_key)}, app);

format.extend(String.prototype);

// allow self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// init servers and force ssl
https_server.listen(https_port, function () {
	console.log('[SERVER/HTTPS] Listening on port: ' + https_port);
});

app.get('/status', function(req, res) {
	res.send('server status is ONLINE');
});

//	routes
const board					= require('./routes/board.js')(app);