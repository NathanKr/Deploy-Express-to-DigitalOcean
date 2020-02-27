const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/"; // local mongodb
const my_db = "my_library";
const booksCollection = "books";

function handleUpdate(req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) {
      return res.sendStatus(500);
    }

    // --- check first if document exist if not send 404 and return
    const dbo = db.db(my_db);
    const myquery = { _id: new mongodb.ObjectID(req.params.id) };
    const bookObjToUpdate = req.body;
    const newvalues = { $set: bookObjToUpdate };
    dbo
      .collection(booksCollection)
      .findOneAndUpdate(myquery, newvalues, function(err, result) {
        if (err) {
          return res.sendStatus(500);
        }

        const book = result.value;
        if(!book){
          // --- not found
          return res.sendStatus(404);
        }

        res.sendStatus(200);
      });
  });
}

function handleDelete(req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) {
      return res.sendStatus(500);
    }

    const dbo = db.db(my_db);
    const myquery = { _id: new mongodb.ObjectID(req.params.id) };

    // --- check first if document exist if not send 404 and return
    dbo.collection(booksCollection).findOneAndDelete(myquery, function(err, result) {
      if (err) {
        return res.sendStatus(500);
      }

      const book = result.value;
      if(!book){
        // --- not found
        return res.sendStatus(404);
      }

      res.sendStatus(200);
    });
  });
}

function handlePost(req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) {
      return res.sendStatus(500);
    }
    const dbo = db.db(my_db);
    // --- expecting : name , pages , isNew
    const bookObj = req.body;
    dbo.collection(booksCollection).insertOne(bookObj, function(err, result) {
      if (err) {
        return res.sendStatus(500);
      }

      res.sendStatus(201);
    });
  });
}

function handleGet(req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) {
      return res.sendStatus(500);
    }

    const dbo = db.db(my_db);
    dbo
      .collection(booksCollection)
      .find({})
      .toArray(function(err, books) {
        if (err) {
          return res.sendStatus(500);
        }
        res.send(books);
      });
  });
}

module.exports = { handleGet, handlePost, handleDelete, handleUpdate };
