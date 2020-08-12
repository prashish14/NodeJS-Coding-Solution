// Import express library which is needed to create server in node.js
import express from "express";

// Import bodyParser library which is used as middleware needed
// to parse request body sent
import bodyParser from "body-parser";

// Create a server using express
const app = express();

// Either use 8080 port or port set in PORT environment variable.
const port = 8080 || process.env.PORT;

// Use body-parser middleware here
app.use(bodyParser.json());

// Create two routers for two version v1 and v2 of the APIs
const v1Router = express.Router();
const v2Router = express.Router();

// Create Person interface to be used when sending response from APIs
interface Person {
    firstName: string, 
    lastName: string,
    clientId: string
}

// V1 version of the API
/*
    Logic:
    - Extract data from data attribute in request body
    - Split data by 0000 to get firstName
    - Split data by 000 to get lastName
    - Split data by 000 to get clientID
    - Finally create person object using Person interface
    - Send response in the given format
*/
v1Router.post('/parse', (req, res) => {
    const data = req.body['data'];
    if (data == undefined) {
        return res.status(400).send({ statusCode: 400, error: "Invalid post request body" });
    }
    const tokens1 = data.split("0000");
    if (tokens1.length != 2) {
        return res.status(400).send({ statusCode: 400, error: "Invalid post request body" });
    }
    const firstName = tokens1[0] + "0000";

    const tokens2 = tokens1[1].split("000");
    if (tokens2.length != 2) {
        return res.status(400).send({ statusCode: 400, error: "Invalid post request body" });
    }
    const lastName = tokens2[0] + "000";
    const clientId = tokens2[1];
    
    const personData:Person = {
        firstName: firstName,
        lastName: lastName,
        clientId: clientId
    }

    return res.send({
        statusCode: 200,
        data: personData
    });
});
app.use('/api/v1', v1Router);

// V2 version of the API
/*
    Logic:
    - Extract data from data attribute in request body
    - Split data by 0000 to get firstName
    - Split data by 000 to get lastName
    - Split data by 000 to get clientID
    - Finally create person object using Person interface
    - Send response in the given format
*/
v2Router.post('/parse', (req, res) => {
    const data = req.body['data'];
    if (data == undefined) {
        return res.status(400).send({ statusCode: 400, error: "Invalid post request body" });
    }
    const tokens1 = data.split("0000")
    if (tokens1.length != 2) {
        return res.status(400).send({ statusCode: 400, error: "Invalid post request body" });
    }
    const firstName = tokens1[0];

    const tokens2 = tokens1[1].split("000")
    if (tokens2.length != 2) {
        return res.status(400).send({ statusCode: 400, error: "Invalid post request body" });
    }
    const lastName = tokens2[0];
    const clientId = tokens2[1].substr(0, 3) + "-" + tokens2[1].slice(-4);
    
    const personData:Person = {
        firstName: firstName,
        lastName: lastName,
        clientId: clientId
    }

    return res.send({
        statusCode: 200,
        data: personData
    });
});
app.use('/api/v2', v2Router);

// Start the node.js server here on given port
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});