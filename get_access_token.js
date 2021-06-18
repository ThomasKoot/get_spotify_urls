const https = require("https");

function getAccessToken({clientId, clientSecret}, callback) {
    
    const authString = clientId + ":" + clientSecret
    const authData = Buffer.from(authString).toString('base64')
    const xFormBody = encodeURI('grant_type=client_credentials')

    const options = {
        hostname: 'accounts.spotify.com',
        path: '/api/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(xFormBody),
            "Authorization" : "Basic " + authData
        }
    };

    const req = https.request(options, res => {
        let response = ""
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            response = response + chunk
        });
        res.on('end', () => {
            let accessToken;
            try {
                accessToken = JSON.parse(response).access_token;
            } catch(err) {
                return callback(err)
            }
            return callback(null, accessToken)
        });
    });

    req.on('error', err => {
        callback(err);
    });

    req.write(xFormBody);
    req.end();
}

module.exports = getAccessToken