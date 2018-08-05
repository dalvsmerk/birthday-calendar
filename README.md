## Setup the project
### API

The API server can be found in the server folder.

1. Go to the server folder and run `yarn` to install the required dependencies.
2. To create and seed the test database, inside the server folder, please execute the command **`yarn run seed`**
3. Afterwards the API server can be started with **`yarn start`** (execute inside the server folder). By default it listens on port 3004 (can be changed in server.js) and it provides a REST endpoint called `persons`.
4. To test the API send a `GET` request to `localhost:3004/persons`, which the API should respond with a json formatted list of all available persons.

`POST`, `PUT`, `DELETE` requests are handled accordingly. (if required, see [documentation](https://github.com/typicode/json-server) for more information)

### React application
1. Go to the project‘s root folder and run `yarn` to install the required dependencies
2. Start the application by executung `yarn start`