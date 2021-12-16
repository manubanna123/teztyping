const expressJwt = require('express-jwt');
const config = require('../config/config.json');
const fs = require('fs');
const jwt_decode = require('jwt-decode');
module.exports = jwt;

function jwt() {
    const secret = config.secret;
    //const secret = fs.readFileSync('./config/rsa.public');
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/auth/token',
            '/api/auth/newticket',
            '/api/auth/signup',
            '/api/auth/setpassword',
            '/api/auth/checkexpirelink',
            '/api/auth/forgotpwdsendmail',
            '/api/auth/resetpassword',
            '/api/home/details',
            '/api/test/getfreetest',
            '/api/test/getfreetestbyid',
            '/api/auth/getdropdowns',
            '/api/home/saveinquiry',
            '/api/test/gettestrank',
            '/api/articles/features',
            '/api/tutorial/gettutorial',
            '/api/test/getlearningtestforuser',
            '/api/test/getlearningtestforuserbyid',
            '/api/test/getlearningtestforuserbytype',
            '/api/user/getvideosettings',
            '/api/auth/logout',
            '/api/tutorial/download'
        ]
    });
}

async function isRevoked(req, payload, done) {
    if ((new Date().getTime() / 1000) >= payload.exp) {
        return done(null, true);
    }
    done();
};