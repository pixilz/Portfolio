var express = require('express'),
	router = express.Router(),
	entities = require('html-entities').AllHtmlEntities,
	moment = require('moment'),
	references = require('../templateData/index/references.json').inuse,
	skills = require('../templateData/index/skills.json').skills,
	projects = require('../templateData/index/projects.json'),
	whyMe = require('../templateData/index/whyMe.json');

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', {
		entities: entities,
		title: entities.decode('Portfolio - Zoë Clarno'),
		year: moment().format('YYYY'),
		references: references,
		skills: skills,
		whyMe: whyMe,
		pObj: projects
	});
});

module.exports = router;
