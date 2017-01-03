'use strict';
const async = require('async');
const request_retry = require('requestretry')
const debug = require('debug')('stress')

module.exports = (req) => {
    //console.log(`Parameters are ${JSON.stringify(req.body)}`);
    if (req.body.url) {
        let url = req.body.url;
        let method = req.body.method || 'GET';
        let header = req.body.header || 'Content/Type';
        let headerValue = req.body.headerValue || 'application-type/xml';
        let requests = req.body.requests || '1000';
        let requestBody = req.body.requestBody || '';
        let reqs = parseInt(requests);
        let matchWord = req.body.matchWord || ' ';
        let matchWordReplace = (req.body.matchWordReplace || "false") === "true";


        let re = new RegExp(matchWord, 'g');
        // lets break requests to 1000 chunks
        const chunkSize = reqs > 1000 ? 1000 : reqs;
        let chunks = Math.floor(reqs / chunkSize);

        debug('total number of chunks ' + chunks);
        for (let c = 0; c < chunks; c++) {

            let chunkStart = c * chunkSize;
            let chunkEnd = (c + 1) * chunkSize;
            if (c === chunks) {
                chunkEnd = reqs;
            }
            debug('Chunk Start ' + chunkStart);
            debug('Chunk End ' + chunkEnd);
            let toSendRequests = [];
            for (let i = chunkStart; i < chunkEnd; i++) {
                debug(i);
                let bodyText = "";
                let urlText = "";
                let rand = Math.floor(Math.random() * 90000) + 10000;
                if (requestBody && requestBody.length && matchWordReplace) {
                    rand = rand + i
                    bodyText = requestBody.replace(re, rand.toString());
                    urlText = url.replace(re, rand.toString());
                    debug('URL ' + urlText);
                }

                let headers = {}
                if (header && headerValue) {
                    headers = [{ name: header, value: headerValue }]
                }

                let options = {
                    url: urlText || url,
                    method: method,
                    headers: headers,
                    body: bodyText
                }
                toSendRequests.push(options);
            }
            sendRequests(toSendRequests).then(() => {
                debug('Move to next chunk');
            });
        }
        debug('Finished');
        return `${reqs} Requests started to flow`
    } else {
        return 'Url input parameter is needed!';
    }
}

const sendRequests = toSendRequests => {
    return new Promise((resolve, reject) => {
        if (!toSendRequests.length) {
            resolve();
        }
        debug('Send some requests ' + toSendRequests.length)
        async.map(toSendRequests, request_retry, (err, results) => {
            if (err) {
                debug('Error! ' + err);
            }
            // console.log(results);
            debug('done sendRequests ');
            resolve('done');
        });
    });

}
