# All about the starting of any backend file and how to structure it

> Note: certain things may changed later due to updates

## 1. creating an empty package with npm inside a folder.
## 2. after that we can change the "type: module" to use module js for importing and exporting.
## 3. adding certain folders for later use
### > controllers, utils, db, middlewares, routes and models (till now)
## 4. install some of the npm packages (may not be essential) like
### > dotenv, cors, multer (for file upload), nodemon(dev dependency), jsonwebtoken(token generation and validation), bcrypt(authentication), cookieparser, mongoose and cloudinary(for file upload).
## 5. adding proxy in "vite.config.js" under "export default defineConfig"
### > "server: { proxy : { '/api' : 'http://localhost:3000',},},"
### > instead of "/api" anything can be given as per the convention we given this. The second field is the server url