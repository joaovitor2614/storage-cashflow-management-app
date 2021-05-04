

## storage-cashflow-management-app
This was a storage, sales, cash management app built specifically for a petshop business, in this
project you can register new products on the storage, make real time sales with immediate updates 
on the storage and see your history and total cash earned on daily and monthly sales.

-⚙️💻 on development process yet
## Table of contents
* [Technologies](#technologies)
* [Features](#features)
* [Installation](#installation)
* [Credits](#credits)
* [License](#license)

## Technologies
<b>Built with</b>
- [React.js version 17.0.1](https://electron.atom.io)
- [Mongoose: 5.12.1](https://mongoosejs.com/)
- [Redux version: 4.0.5](https://redux.js.org/)
- [Express version: 4.17.1](https://expressjs.com/pt-br/)

## Features
# Back end
- JWT (Json Web Token) authentication
- Day.js for date comparing
- Router level validation with express-validator
- API testing with Postman
# Front-end
- Global state management with Redux
- Formik + yup for state and validation of form
- Material-styles
- Axios for async API calls

## Installation
After downloading the project, first you need to create an .env file and add the following:
```
MONGO_URI=<your_mongoDB_Atlas_uri_with_credentials>
JWT_SECRET=token
```
Then go to the root of folder on cmd and run npm i to download all the dependencies, go also to the client node folder and run npm i again
```
cd storage-cashflow-management-app
npm i
cd client
npm i
```
Then to run the project on development mode, just go back to the root of the folder and run npm run dev
```
cd ..
npm run dev
```

## Credits
Creditis to MoonsBlackSmith for helping with design and software architecture.


## License

MIT © [João Vitor]()