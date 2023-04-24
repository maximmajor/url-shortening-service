TThis Project is a URL shortening service where you enter a URL such as https://indicina.co and it returns a short URL such as http://short.est/GeAi9K. Visiting the shortened URL should redirect the user to the long URL. Using the example above, visiting http://short.est/GeAi9K should redirect the user to https://indicina.co.



`**To run and test the code, follow these steps:**`
```
1. Clone the repository from GitHub:
git clone https://github.com/maximmajor/url-shortening-service.git 

2. on your terminal, cd into the server directory (cd server)

3. run `** yarn **` to Install dependencies:

4. Set environment variables:
   Create a .env file at the root of the project directory and add the following environment variables:
   MONGODB_URI=<mongodb-uri> 
   Replace <mongodb-uri> with a valid MongoDB connection string.

5. run `** yarn tsc **`
   This compiles the TypeScript code into JavaScript code. and create a dist folder where it is stored.

6. run `** yarn start **`
   This will start the server and listen for incoming requests.

   To run the test cases
1. run `** yarn test **`
```


`**                         TO INTERACT WITH THE SERVER:**`
```
Once the server is running, you can interact with it using a tool like Postman or a browser extension. Here are some of the requests:
1. Encode a URL:
   POST http://localhost:<port-number>/encode
   Content-Type: application/json
   {
      "originalUrl": "https://indicina.co"
   }

2. Decode a short URL:
   POST http://localhost:<port-number>/decode
   Content-Type: application/json
   {
      "shortUrl": "http://localhost:3000/Rc2BJwKwO"
   }

3. Get statistics for a short URL:
   GET http://localhost:<port-number>/statistic/:urlpath

4. Redirect to the original URL:
   GET http://localhost:<port-number>/:urlpath
```

`** Explanation of each endpoint **`
```
1. router.post('/encode'): 
   This endpoint is used to encode a long URL into a short URL. It is a POST request that takes a long URL in the request body and returns a JSON response containing the short URL.

2. router.post('/decode'): 
   This endpoint is used to decode a short URL into the original long URL. It is a POST request that takes a short URL in the request body and returns a JSON response containing the long URL.

3. router.get('/statistic/:urlpath?'): 
   This endpoint is used to retrieve statistics about a short URL. It is a GET request that takes an optional URL path parameter and returns a JSON response containing information about the number of times the short URL has been accessed and the date of the last access.

4. router.get('/:urlpath?'):
   This endpoint is used to redirect a short URL to its original long URL. It is a GET request that takes a short URL path parameter and redirects the user to the original long URL.
```




###                      FILE STTRUCTURE
```
├── src/
│   ├── ShortLink/
│   │   ├── models/
│   │   │   └── shortLinkModel.ts
│   │   ├── controllers/
│   │   │   └── shortLinkController.ts
│   │   ├── repositories/
│   │   │   └── shortLinkRepository.ts
│   │   ├── routes/
│   │   │   └── shortLinkRoutes.ts
│   │   ├── interfaces/
│   │   │   ├── shortLinkController.ts
│   │   │   ├── shortLinkRepository.ts
│   │   │   └── shortLinkModel.ts
│   │   ├── middlewares/
│   │   │   ├── errorHandlers.ts
│   │   │   └── HttpException.ts
│   │   ├── config/
│   │   │   └── db.ts
│   │   └── utils/
│   │       └── server.ts
│   ├── app.ts
│   └── test/
│       └── shortLink.test.ts
└──
```
`** Breakdown of what each folder and file contains: **`
```
1. src/: 
   This directory contains all the source code for the project.

2. ShortLink/:
   This is a sub-directory of src/ that holds the code related to a specific feature or module of the project.

3. controllers/: 
   This sub-directory contains code related to handling requests and responses from the client.

4. shortLinkController.ts:
   This contains functions to handle CRUD (Create, Read, Update, Delete) operations.

5. repositories/:
   This sub-directory contains code related to interacting with the database
   
6. shortLinkRepository.ts:
   This contains functions to read from and write to the database for short links.

7. routes/:
   This sub-directory contains code related to defining and handling HTTP routes for the feature. 

8. shortLinkRoutes.ts:
   This contains functions to define the routes for the short link feature.

9. interfaces/: 
   This sub-directory contains code related to defining data structures, interfaces, types for the feature.

10. shortLinkController.ts, shortLinkRepository.ts, and shortLinkModel.ts:
    These define the interfaces for the controller, repository, and data model.

11. middlewares/:
    This sub-directory contains code related to handling middleware logic for the feature.

12. errorHandlers.ts and HttpException.ts:
    These contain code to handle errors and exceptions that may occur during the handling of HTTP requests.

13. config/:
    db.ts:
    This contains configuration settings for connecting to the database.

14. utils/: 
    This sub-directory contains utility functions/other miscellaneous code related to the feature.

15. server.ts:
    This contains code to set up and start the HTTP server for the feature.

16. app.ts:
    This file contains code to start the entire application and tie together the various features and modules.

17. __test__:
    This is a sub-directory that likely contains code for testing the functionality of the ShortLink feature.

18. shortLink.test.ts:
    contains test cases to ensure the short link feature works as expected
```



###                  TECHNOLOGY USE
```
1. Node.js: a JavaScript runtime environment that allows running JavaScript code outside of a web browser
2. Express.js: a popular web application framework for Node.js used for building APIs and web applications
3. TypeScript: a superset of JavaScript that adds optional static typing and other features to JavaScript code
4. MongoDB: a NoSQL document database used for storing and retrieving data
5. Mongoose: a Node.js library used for modeling and interacting with MongoDB databases
6. Jest: a JavaScript testing framework used for unit and integration testing of Node.js applications
7. Supertest: a library used for testing Node.js HTTP servers such as Express.js applications1
```