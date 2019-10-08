const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Multer = require("multer");
const fileMiddleware = require("express-multipart-file-parser");
const admin = require("firebase-admin");
const serviceAccount = require("../.todoapp-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todoapp-4f92c.firebaseio.com",
  storageBucket: "gs://todoapp-4f92c.appspot.com/"
});
const firestore = admin.firestore();
const storage = admin.storage();
const app = express();

const multer = Multer({
  storage: Multer.memoryStorage()
});

app
  .use(cors({ origin: true }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(fileMiddleware);

const getTodosBySearch = async (req, res) => {
  const docRef = firestore.collection("todos");
  const [search, value] = req.query;
  docRef.where("description");
};

// Routes
const getTodos = async (req, res) => {
  const docRef = firestore.collection("todos");
  if (req.query.search && req.query.value) {
    const [search, value] = req.query;
    docRef;
  }
  const param = req.query.todos;
  const getQuery = () => {
    switch (param) {
      case "all":
        return docRef;
      case "done":
        return docRef.where("checked", "==", true);
      default:
        return docRef.where("checked", "==", false);
    }
  };
  const query = getQuery();
  try {
    const snapshot = await query.get();
    const data = snapshot.docs.map(doc => doc.data());
    return res.status(200).json(data);
  } catch (e) {
    console.error(e);
    return res
      .status(400)
      .json({ message: "Unable to connect to Firestore", error: e });
  }
};

/**
 * Get all the todos that need te be done
 * ?todos=all Get all todos (done and not-done)
 * ?todos=done Get all the done todos
 */
app.get("/todos", getTodos);
/*
 * Add a new todo into the collection
 * include all the information except the attached file that is uploaded through another 
 * route
 */
app.post("/todo", async (req, res) => {
  const { id, description, checked } = req.body;
  const docRef = firestore.collection("todos").doc(id);
  try {
    await docRef.set({
      description,
      checked,
      id
    });
    return res.status(200).send({
      description,
      checked,
      id
    });
  } catch (e) {
    console.error(e);
  }
});

/*
 * Upload a file that comes inside the `file` attribute
 * need to include the id of the todo related to the file
 * Will upload the file and then update the todo stored to add the new attachment.
 */
app.put("/todo", (req, res) => {
  const { id } = req.body;
  const {
    originalname,
    buffer
  } = req.files[0];
  const bucket = storage.bucket();
  const gcsname = Date.now() + originalname;
  const bucketFile = bucket.file(gcsname);
  const run = async () => {
    try {
      await bucketFile.save(Buffer.from(buffer));
      const [downloadUrl] = await bucketFile.getSignedUrl({
        action: "read",
        expires: "03-09-2491"
      });
      console.log(downloadUrl);
      //Store a reference into the db
      const docRef = firestore.collection("todos").doc(id);
      await docRef.update({
        attachment: {
          url: downloadUrl,
          name: originalname
        }
      });
      return res.status(200).json({
        status: "success",
        data: {
          ...bucketFile.metadata,
          downloadUrl,
          originalname
        }
      });
    } catch (e) {
      return res.status(500).json({
        status: "error",
        errors: e
      });
    }
  };
  run();
});

const markAsDone = async (req, res) => {
  const { id } = req.body;
  try {
    const docRef = firestore.collection("todos").doc(id);
    await docRef.update({
      checked: true
    });
    res.status(200).json({ checked: true, id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ errors: e });
  }
};

app.patch("/todo", markAsDone);

module.exports = app;
