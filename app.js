const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const cors = require('cors');

require('dotenv/config')

const DATABASE_NAME = "EmployeeManagementDB";

var app = Express();

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(cors());

var database, collection;

app.listen(3000, () => {
    MongoClient.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("Employees");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

//get all employees
app.get("/employees", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//get employee by firstname or lastname text
// app.get("/employees", (request, response) => {
//     collection.find({}).toArray((error, result) => {
//         if (error) {
//             return response.status(500).send(error);
//         }
//         response.send(result);
//     });
// });


//add new employees
app.post("/employees", (request, response) => {
    collection.insertOne(request.body, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

//delete employee
app.delete("/employees/:id", (request, response) => {
    collection.remove({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//update employee
app.post("/employees/:id", (request, response) => {

    console.log(JSON.stringify(request.body))
    
    collection.updateOne({ "_id": new ObjectId(request.params.id) }, { $set: request.body }, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.result); 
    });
});
