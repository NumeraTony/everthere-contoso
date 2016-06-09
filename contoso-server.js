var express = require('express');
var app = express();
var hb = require('express3-handlebars');
var crypto = require('crypto');
var libris_secret, insights_app_id, realm, imei;

var isDevelopment = false;
if (process.argv.length > 2){
  isDevelopment =  (process.argv[2] === 'true');
}

if (isDevelopment){
	console.log('running with development variables');
	insights_app_id = 'everthere-contoso-dev';
	libris_secret = 'bb9c99fe79cf43d28ac9f76a51be6f85';
	realm = 'myguardian';
	imei = '358859040028310';
} else {
	insights_app_id = 'everthere-contoso-stage';
	libris_secret = 'bb9c99fe79cf43d28ac9f76a51be6f85';
	realm = 'ContosoEverthere';
	imei = '358859040012800'
}

app.engine('handlebars', hb({defaultLayout: 'main'}));
app.use(express.errorHandler());
//app.use('/static', express.static(__dirname + '/static' ));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

var compute_signature = function(message) {
	var hmac = crypto.createHmac('sha256', libris_secret);
	hmac.update(message);
	return hmac.digest('base64');
};

app.get('/', function(req,res) {
	//create the proof needed for the insights sdk
	var nonce = Math.floor(new Date().getTime() / 1000);
	var to_sign = insights_app_id + realm +  nonce;
	console.log('proof-to-sign = ' + to_sign);

	var tmp_data = {};

	tmp_data.nonce = nonce;
	tmp_data.applicationId = insights_app_id;
	tmp_data.realm = realm;
	tmp_data.proof = compute_signature(to_sign);
	tmp_data.isDevelopment = isDevelopment; //just for the demo
	tmp_data.imei = imei; //just for the demo

	console.log('data = ');
	console.log(tmp_data);

	res.render('index', tmp_data);
});

app.listen(3335);
console.log('listening on 3335');