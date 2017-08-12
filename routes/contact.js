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
        req.connection.socket.remoteAddress;

    //Error checking
    if (!name) errors.push({
        cf_name: 'A name is required'
    });
    if (!email) errors.push({
        cf_email: 'An email is required'
    });
    else if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        errors.push({
            cf_email: 'Please enter a valid email'
        });
    }
    if (!msg) errors.push({
        cf_message: 'A message is required'
    });
    if (!captcha) errors.push({
        'g-recaptcha-response': 'Please validate the captcha'
    });


    if (errors.length) {
        res.status(200).json({
            success: false,
            data: errors
        });
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
                console.log('error posting json: ', err);

                res.status(500).json({success: false, data: [{'g-recaptcha-response': 'reCAPTCHA failed to validate.'}]});
                return false;
            }

            if (body.success) {
                var emailMsg = 'Name: ${name}\nEmail: ${email}\n\nMessage: ${msg}';

                var transporter = nodemailer.createTransport( {
                    service:  'Mailgun',
                    auth: {
                     user: process.env.MAILGUN_USER,
                     pass: process.env.MAILGUN_PASS
                    }
                });
                var mailOpts = {
                    from: process.env.MAILGUN_USER,
                    to: 'zoeclarno@gmail.com',
                    subject: 'Portfolio Contact Form',
                    text: emailMsg
                };
                transporter.sendMail(mailOpts, function (err, response) {
                    if (err) {
                     //ret.message = "Mail error.";
                     res.status(200).json({success: false, data: [{'email': 'Your email failed to send.'}]});
                    } else {
                     //ret.message = "Mail send.";
                     res.status(200).json({success: true});
                    }
                });
            } else {
                res.status(200).json({success: false, data: [{'g-recaptcha-response': 'reCAPTCHA was invalid.'}]});
            }
        });
    }


    /*if(req.query.test) {
      // respond with JSON
      res.status(200).json();
      res.json(200, { data: req.query.test })
    } else {
      // or show an error
      res.status(500).json({error: 'message'});
    }*/

});

module.exports = router;
