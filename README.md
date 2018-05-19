<img src="/public/images/chatterbot.svg" height='200px' width='200px'/>

# Chatterbot

A simple real-time chat application built with Node and Socket.io.

[View live site](https://iamchatterbot.herokuapp.com/)

## Getting Started

For a local copy, clone the repo and from the command line: `npm install && npm start`.

### Features

* Join a room, and communicate in real-time with those in the room.
* Automated admin, with notifications upon entering/leaving room.
* Send out a 'current location' with Google Maps.

## Running Tests

Chatterbot is fully tested using [Mocha](https://mochajs.org/). To run the automated test suite, clone the repo locally, and run `npm test`.

## Built With

Chatterbot is a very simple chat-room-like app that utilizes:

* [Socket.io](https://socket.io/) for real-time communication.
* [jQuery](https://jquery.com/) for basic front-end interfacing.
* A logic-less templating engine called [{{mustache}}](https://mustache.github.io/)
* A simple [Express](https://expressjs.com/) server for hosting on [Heroku](https://www.heroku.com/)
