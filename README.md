# API Meetingroom

The API booking a meeting room that can authentication, authorization, manage a meeting room, booking, and cancel a meeting room by [ParinchatJ](https://github.com/ParinchatJ) and built using a nodeJS, expressJS

## Stack (nodeJS expressJS mongoDB)

* `nodeJS` *for server*
* `ExpressJS` *as Node web framework*
* `MongoDB` *NoSQL database*
* `Mongoose` *to create the database connection*
* `dayJS` *to config DATE data pattern*
* `bcryptjs` *for create password encryption*
* `express-session` *to create session*
* `uuid` *to generate id number*

## Basic Function

- [x] **authentication** : Login, register using by express-session, cookie-parser
- [x] **manage a meeting room (only admin)** : **(1)** create room only by admin (using middleware to check admin and have login) **(2)** Get all room **(3)** Get one room by ID
- [x] **Booking a meeting room** : **(1)** Get avilable room **(2)** Booking
- [x] **Booking cancel**


# ระบบจัดการจองห้องประชุม

API การจองห้องประชุม มีการทำงานตรวจสอบสิทธิ์ อนุญาตสิทธิ์ จัดการห้องประชุม จองห้องประชุม และยกเลิกห้องประชุม จัดทำโดย [ParinchatJ](https://github.com/ParinchatJ) สร้างโดย nodeJS

## เครื่องมือที่ใช้ (nodeJS expressJS mongoDB)

* `nodeJS` *ในการจัดการ server*
* `ExpressJS` *จัดการการเขียน API ให้ง่ายขึ้น เป็น framework ของ nodeJS*
* `MongoDB` *ฐานข้อมูลที่ไม่มีความสัมพันธ์ตาราง*
* `Mongoose` *เชื่อมต่อฐานข้อมูล*
* `dayJS` *สร้างรูปแบบของวันและเวลา*
* `bcryptjs` *สร้างรหัสผ่านแบบเข้ารหัส*
* `express-session` *สร้าง session ใช้งาน*
* `uuid` *สร้างเลข ID เพื่อใช้งาน*

## หน้าที่พื้นฐาน

- [x] **การตรวจสอบสิทธิ์** : เข้าสู่ระบบ, สมัครสมาชิก โดยใช้ express-session และ cookie-parser
- [x] **จัดการห้องประชุม (เฉพาะ admin เท่านั้น)** : **(1)** สร้างห้องประชุม (ใช้ middleware ในการตรวจสอบ admin และการเข้าสู่ระบบ) **(2)** แสดงรายการห้องประชุมทั้งหมด **(3)** แสดงรายละเอียดของห้องประชุมในบางห้อง
- [x] **การจองห้องประชุม** : **(1)** แสดงรายการห้องประชุมที่ว่าง **(2)** จองห้องประชุม
- [x] **ยกเลิกการจองห้องประชุม**