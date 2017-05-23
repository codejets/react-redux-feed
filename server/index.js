var express = require('express')
var Twit = require('twit')
var _ = require('lodash')
var twitterAuth = require('./.twitterAuth.js')

var app = express()

var T = new Twit(
	_.merge(twitterAuth, {
		timeout_ms: 60 * 1000
	})
)

app.get('/', function(req, res) {
	res.send('Hello World!')
})

app.get('/tweets/:keyword', function(req, res) {
	var searchKeyword = req.params.keyword
	T.get('search/tweets', { q: searchKeyword, count: 20 }, function(
		err,
		data,
		response
	) {
		res.send(data)
	})
})

app.listen(3000, function() {
	console.log('Example app listening on port 3000!')
})
