# Stressy

Stressy is a very simple load testing tool of apis/urls. It is written in node.js and has a simple UI to input your parameters.
It can be run locally and hit your testing server. The express node application will send asyncronously your requests to the specified server.

The most important feature that currently has is that you can pass in your request body an expression and Stressy will replace that expression with a random generated integer (at least 4 digits)


## Getting Started

Simply download or clone stressy project.

### Prerequisites

Node, Npm

### Installing

First Install packages in package.json
Say what the step will be

```
npm install
```
Then you can run server 
```
npm start
```
This will create local express server.
Express server opens in port 3131 but you can change by setting the environment variable 'port'

## Built With

* [Node]
* [Express]
* [Materialize] - For CSS and JS
* [JQuery]

## Example

![Sample Screenshot](screenshot.png)
