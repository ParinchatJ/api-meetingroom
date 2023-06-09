# API Meetingroom

The API booking a meeting room that can authentication, authorization, manage a meeting room, booking, and cancel a meeting room by [ParinchatJ](https://github.com/ParinchatJ) and built using a nodeJS, expressJS

## Stack (nodeJS expressJS mongoDB)

* nodeJS *for server*
* ExpressJS *as Node web framework*
* MongoDB *NoSQL database*
* Mongoose *to create the database connection*
* dayJS *to config DATE data pattern*
* bcryptjs *for create password encryption*
* express-session *to create session*
* uuid *to generate id number*

## Basic Function

- [x] **authentication** : Login, register using by express-session, cookie-parser
- [x] **manage a meeting room (only admin)** : **(1)** create room only by admin (using middleware to check admin and have login) **(2)** Get all room **(3)** Get one room by ID
- [x] **Booking a meeting room** : **(1)** Get avilable room **(2)** Booking
- [x] **Booking cancel**