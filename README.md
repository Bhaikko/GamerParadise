# GamerParadise
GamerParadise is an E-commerce website where Video games can be sold by vendors and bought by users.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
Before running the server on your local machine, following *npm packages* must be installed in the same directory where you have cloned the project.

*requirements*
* [nodejs](https://nodejs.org)
* npm
* [mysql](https://www.mysql.com)
* [mongodb](https://www.mongodb.com)

You can install them manually or run the following command
```
  npm install
```
*Database*
* mysql - For storing Users, Vendors,etc tables.
* mongodb - For storing Sessions.

## Database Usage
For mongodb, excute the following commands in root directory of GamerParadise Folder
```
  cd Site/database/sessions
  mongod --dbpath=./ --port=5000
```
*Note: The port above can be whatever you assign*

For mysql, To create a database
```
  create database "gamerparadiseAdmin";
  create user "gamerparadiseAdmin" identified by "123456";
  use gamerparadise;
  GRANT ALL PRIVILEGES ON gamerparadise.* to "gamerparadiseAdmin";
  FLUSH PRIVILEGES;
  
```
*Note: These are default credentials hardcoded inside ContactManager/Web Application/database/sqlDatabase.js and can be changed. All the above commands must be executed as root user of mysql*

## Running The Server On Your Machine
```
  cd ./Site
  node server.js
```
*Note: The default port, the website runs on is 4000 and can be changed in server.js"

## Screenshots
### Homepage
<img src="https://github.com/Bhaikko/GamerParadise/blob/master/Screenshots/Homepage.png"
     style="float: left; margin-right: 10px;"/>
     
### User Homepage
<img src="https://github.com/Bhaikko/GamerParadise/blob/master/Screenshots/Userhomepage.png"
     style="float: left; margin-right: 10px;"/>
     
### User Cart
<img src="https://github.com/Bhaikko/GamerParadise/blob/master/Screenshots/Usercart.png"
     style="float: left; margin-right: 10px;"/>
     
### Vendor Dashboard
<img src="https://github.com/Bhaikko/GamerParadise/blob/master/Screenshots/VendorHomepage.png"
     style="float: left; margin-right: 10px;"/>
     
### Vendor Products
<img src="https://github.com/Bhaikko/GamerParadise/blob/master/Screenshots/VendorProducts.png"
     style="float: left; margin-right: 10px;"/>

