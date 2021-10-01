# Server
## Install package
```
npm i express jsonwebtoken mongoose dotenv argon2 cors
```
```
express: Server epxress
jsonwebtoken: Manage login logout and authenication
mongoose: Object relation model to handle from server to database
dotenv: Get variable enviroment
argon2: Hash password into database
cors: Allow front-end work with back-end
```
mongodb+srv://thuonghuynh:cloud123456@mern.usdlv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

# Client
## Install package
```
npm i react-bootstrap bootstrap axios react-router-dom
```
react-bootstrap bootstrap: Create front-end
axios: Axios is a promise-based HTTP Client for node.js and the browser
react-router-dom: Router

## Create react app
```
npx create-react-app client
```

## Deploy heroku
```
heroku login

heroku create
heroku git:clone -a morning-cove-83082
cd morning-cove-83082

git init
git add .
git commit -am "make it better"

git subtree push --prefix server heroku master

heroku config:set DB_USERNAME=thuonghuynh
heroku config:set DB_PASSWORD=cloud123456
heroku config:set ACCESS_TOKEN_SECRET=Mario
```

