# All about the starting of any backend file and how to structure it

> Note: certain things may changed later due to updates

## 1. install an empty package with npm inside a folder.
## 2. after that we can change the "type: module" to use module js for importing and exporting.
## 3. adding certain folders for later use
### > controllers, utils, db, middlewares, routes and models (till now)
## 4. install some of the npm packages (may not be essential) like
### > dotenv, cors, multer (for file upload), nodemon(dev dependency), jsonwebtoken(token generation and validation), bcrypt(authentication), cookieparser, mongoose and cloudinary(for file upload).
### > installing nodemon with "npm install --save-dev nodemon" (for installing it in dev dependency)
### > we will also modify the "dev" option in "package.json" for running the nodemon in development dependency
## 5. adding proxy in "vite.config.js" under "export default defineConfig"
### > "server: { proxy : { '/api' : 'http://localhost:3000',},},"
### > instead of "/api" anything can be given as per the convention we given this. The second field is the server url
## 6. then we can create our data models in mongoose inside the "models" folder
### > given inside the models folders of most of the projects done yet.
## 7. now the mongoose needs to be connected with the mongoDb for database connection
### > most of the given information are there in the notes of the models and how to deal with the most of the model structure.
### > since clusters were done before in the mongodb we just need to copy the string of the mongodb uri so that we can keep it in the env file for the later connection use
### > we just need to replace the password with ours and just remove the "/" from the last of the string.
### > we can name the database separaterly inside a file here "/src/constant.js"  and export it for the naming of the database
### > now for the connection we will do it inside the "src/db/index.js" then connect it in "src/index.js"
### > the format of the that can be seen in "src/db/index.js" of related project file.
