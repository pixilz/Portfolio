var express = require('express'),
	router = express.Router(),
	entities = require('html-entities').AllHtmlEntities,
	resume = require('../templateData/index/resume.json'),
	moment = require('moment');

/* GET home page. */
router.get('/', function (req, res) {
	res.render('resume', {
		entities: entities,
		title: entities.decode('Resume - Zoë Clarno'),
		year: moment().format('YYYY'),
		resume: resume
	});
});

module.exports = router;
