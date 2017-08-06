var express = require('express'),
	router = express.Router(),
	resume = require('../templateData/index/resume.json'),
	entities = require('html-entities').AllHtmlEntities,
	moment = require('moment'),
	skills = require('../templateData/index/skills.json').skills,
	projects = require('../templateData/index/projects.json'),
	whyMe = require('../templateData/index/whyMe.json');

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', {
		entities: entities,
		title: entities.decode('Zoë Clarno'),
		year: moment().format('YYYY'),
		resume: resume,
		skills: skills,
		whyMe: whyMe,
		pObj: projects
	});
});

module.exports = router;
