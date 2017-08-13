var express = require('express'),
    router = express.Router(),
    request = require('request'),
    nodemailer = require('nodemailer');

/* GET home page. */
router.use('/', function(req, res) {
    // req.body is an object with POST parameters

    var data = req.body,
        name = data.cf_name,
        email = data.cf_email,
        msg = data.cf_message,
        captcha = data['g-recaptcha-response'],
        errors = [],
        ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress,
        emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Error checking
    if (!name) errors.push({cf_name: 'A name is required'});

    if (!email) errors.push({cf_email: 'An email is required'});
    else if (!email.match(emailRegex)) errors.push({cf_email: 'Please enter a valid email'});

    if (!msg) errors.push({cf_message: 'A message is required'});

    if (!captcha) errors.push({'g-recaptcha-response': 'Please validate the captcha'});


    var sendResponse = function(statusCode, success, data) {
        res.status(statusCode).json({success: success, data: data});
    };

    if (errors.length) {
        //There were errors in the form
        sendResponse(418, false, errors);
    } else {
        var options = {
            method: 'post',
            url: 'https://www.google.com/recaptcha/api/siteverify',
            qs: {
                secret: process.env.CAPTCHA_SECRET,
                response: captcha,
                remoteip: ip
            },
            json: true
        };

        request(options, function(err, response, body) {
            if (err) {
                //There was an unidentified communication error
                console.log('reCAPTCHA Error:\n ', err);
                sendResponse(418, false, [{'g-recaptcha-response': 'reCAPTCHA failed to validate.'}]);
                return false;
            }

            if (body.success) {
                var emailMsg = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`;

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: process.env.GMAIL_ACC,
                        clientId: process.env.GMAIL_CLIENTID,
                        clientSecret: process.env.GMAIL_CLIENTSECRET,
                        refreshToken: process.env.GMAIL_RFRESHTOKEN,
                        accessToken: process.env.GMAIL_ACCESSTOKEN
                    }
                });

                var mailOptions = {
                    from: process.env.GMAIL_ACC,
                    to: process.env.GMAIL_ACC,
                    subject: `Portfolio Contact Form - ${name}`,
                    text: emailMsg
                };

                transporter.sendMail(mailOptions,
                    function(mailErr, mailRes) {
                        if(mailErr) {
                            //Mail was unable to send
                            sendResponse(418, false, [{'email': 'Server was unable to send email.'}]);
                            console.log('Mail Error:\n ', mailErr);
                        } else {
                            //Everything worked correctly. (As far as responses go)
                            sendResponse(200, true);
                        }
                    }
                );
            } else {
                //reCAPTCHA passed in was plain wrong.
                sendResponse(418, false, [{'g-recaptcha-response': 'reCAPTCHA was invalid.'}]);
            }
        });
    }
});

module.exports = router;
