'use strict';
const async = require('async');
const request_retry = require('requestretry')

module.exports = (req) => {
	//console.log(`Parameters are ${JSON.stringify(req.body)}`);
	if (req.body.url){
		let url = req.body.url;
		let method = req.body.method || 'GET';
		let header = req.body.header;
		let headerValue = req.body.headerValue;
		let requests = req.body.requests || '1000';
		let requestBody = req.body.requestBody;
		let reqs = parseInt(requests);
		let matchWord = req.body.matchWord;
		let matchWordReplace = (req.body.matchWordReplace || "false" ) === "true";

		let toSendRequests = [];
		let re = new RegExp(matchWord, 'g');
		for (var i = 0; i < reqs; i++) {
			let bodyText = "";
			let rand = Math.floor(Math.random() * 90000) + 10000;
			if (method !== 'GET' && requestBody && requestBody.length && matchWordReplace){
				rand = rand + i 
				bodyText = requestBody.replace(re, rand.toString());
			}
			let headers = {}
			if (header && headerValue){
				headers = [{name:header, value:headerValue}]
			}
			let options = {
				url :url,
				method:method,
				headers:headers,
				body: bodyText
				
			}
		    toSendRequests.push(options);
		}
		async.map(toSendRequests, request_retry, (err,results)=>{
			if (err){
				console.log('Error! '+ err);
			}
			console.log(results);
		});

		return `${reqs} Requests started to flow`



	}
	else{
		return 'Url input parameter is needed!';
	}
	
}