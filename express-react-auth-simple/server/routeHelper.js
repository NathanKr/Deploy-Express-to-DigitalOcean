const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = "auth-simple",
  collectionName = "users";

function login(req, res) {
  console.log("/users/login is accessed");

  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    const dbo = db.db(dbName);

    // --- expecting email , password
    const queryUser = req.body;
    

    dbo.collection(collectionName).findOne(queryUser, function(err, user) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      if (user) {
        // --- this is post but no document is created so return 200
        return res.status(200).send(user);
      }

      // --- user not found
      return res.sendStatus(404);
    });
  });
}

function register(req, res) {
  console.log("/users/register is accessed");

  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    const dbo = db.db(dbName);
    // --- expecting email , password , ....
    const queryUser = req.body;

    dbo
      .collection(collectionName)
      .findOne({ email: queryUser.email }, function(err, userFound) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }

        if (userFound) {
          // -- email found
          return res.sendStatus(400);
        }

        // --- no email match -> insert user
        dbo
          .collection(collectionName)
          .insertOne(queryUser, function(err, result) {
            if (err) {
              console.log(err);
              return res.sendStatus(500);
            }

            res.sendStatus(201);
          });
      });
  });
}

module.exports.register = register;
module.exports.login = login;
