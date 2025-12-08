# How to structure the files after database connection and what things we need to follow accordinglyy

## 1. configuring app.js
### > importing express and exporting the app so that it can be used in index.js for running the server
### > we use middlewares with use() and since cors is a middleware it is used with use(). Also we there are several parameters with needs to be set or can be ignored but for mor control we need the paramaters to work on.
### > cors origin needs to be setted in dot env file so that the origin we want to set for accessing the server is listed by the server itself
### > four things need to be setted( not mandatorily but it is good to have them for later work of us )
### > express.json(), express.urlencoded(), express.static() and cookieparser(). This are all middlewares and needs to be passed through it for some of the working of our application
### > the syntax and all are given in the notes itself so we can refer to it later on for implementation.

## 2. now we will configure the utils folder by adding some of the essential files which will help a lot while handling error and response and make our code look cleaner as well as easy to rectify problems later on. (configuring utils folder with files)
### > one of the file is asyncHandler.js which will be our wrapper function so that it can be used for wrapping the methods we will write later on for handling errors and response and pass on the individual methods (the reference can be used for creating one of those functions)
### > for standardization of error we use error class of node.js to extend it as per our need and use them in asyncHandler function dor further use. The file is named as "ApiError.js" and more implementation can be seen in the notes of those files.
### > like the error we wuill also handle the response as well but here we need to create our own class since it is not provided by nodejs itself 