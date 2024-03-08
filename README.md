# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# laundry-coms motivation

I live in an apartment complex with 20 units and 2 washing machines. There's been a number of times where I'd want to do my laundry, but someone else's laundry is still in the machine. I want to be courteous and wait 15 minutes before I even think about moving their clothes, but then I lose 15 minutes of laundry time. I personally avoid this by setting an alarm for 40 minutes so I know to come get my laundry when it is done. However, I know that not everyone does that and the urgency to get the clothes might not be that high.

This led me to come up with the idea of creating a simple application to track laundry and enable SMS to remind laundry retrieval. 

# Creating html page

It was easy to make the page and incorporate a timer that ticks from 35 minutes or 45 minutes based on the setting. However, the first issue that I ran into was making sure that the timer will remain running I leave the application. There are several reasons for this. First, the user is likely to not stay on the webpage after setting the timer, and secondly this will allow  other people to check the status of the laundry without having to physically go to the laundry room.

# Creating the timer

I created a separate javascript file to contain the two functions that start and reset the timers. 

# Sychronization of timers

I did not expect it to be difficult to make sure the timers run in sychronization. I started with hosting this webpage on Vercel and I thought that the instances of timers would be synced across the website, but I've come to realize that I will need to create a server that runs on the website.

https://stackoverflow.com/questions/67855874/how-to-synchronise-a-timer-for-everyone-client

# Server

In my initial conception of this project, I did not think that it would require of me to implement server and client functionality, but in order for the timer to be sychronized across devices I need to a server to share the starting time of the timer. 

Server:
- sends message to all clients everytime it received a message from a client
- sends message to newly opened clients

Client:
- sends message to server, when start or reset is pressed

I will host this server in an AWS ECinstance

-> If I implement comments: 
- everytime a message is sent

# SMS API

I am looking at using Brevo to support sms notifications for the website. When a user wants to use a timer, they have an option to be pinged when the timer runs out. Nevermind, instead of Brevo, I will use Twilio.

# Hosting the website online, so that it supports syncronized timers
