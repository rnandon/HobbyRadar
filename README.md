# HobbyRadar
HobbyRadar - a hobby finding app built in React using Redux.
Notes: 
-This project depends on a local backend, which can be found here: https://github.com/rnandon/HobbyRadarAPI
-In order to run this application, a file named ApiKeys.js will need to be included in the src directory. This file should have a method getKeys() that returns an object containing a "google" key associated with an active google api key.

## Description
HobbyRadar aims to streamline the process of finding new hobbies, places to engage with your hobbies, and finding people that like the same things you do. 
This is achieved by curating personal recommendations for each user based on their location and saved hobbies, allowing connections to other users, and creating an event dashboard that every user can view and register for. Hobbies can be rated to make better recommendations for the user.

## Installation
Clone the repo, and run 'npm install' to initialize the appropriate libraries. Make sure to create and include the ApiKeys.js file, otherwise the event pages and hobby pages will not work as intended. To run the application, run the command 'npm start' and navigate in a browser to localhost:3000. Enjoy!
