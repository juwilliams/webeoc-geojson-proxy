module.exports = {
	ssl_certificate: '../cert/local.cert',
	ssl_key: '../cert/local.pem',
	host: 'localhost',
	ports: {
		web: 8444,
		web_ssl: 8443,
		db: 8445
	},
	auth: {
		jwt_secret: ''
	},
	database: 'pg://<username>:<password>@localhost:port/database_name',
	services: {
	},
	urls: {
	},
	session: {
		secret: '',
		key: '',
		host: '',
		port: '',
		ttl: 260
	}
};