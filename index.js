const express = require("express");
const app = express();
const mongoose = require("mongoose");
const WilderController = require("./controllers/Wilder");
const cors = require("cors");

const port = 3001;

mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", { autoIndex: true })
  .then(() => console.log("connection au serveur réussie"))
  .catch((err) => console.log("erreur"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const runAsyncWrapper = (callback) => (req, res, next) => {
  return Promise.resolve(callback(req, res, next)).catch(next);
};

// app.get("/", (req, res) => {
//   WilderModel.init().then(() => {
//     const firstWilder = new WilderModel({
//       name: "First Wilder",
//       city: "San Francisco",
//       skills: [
//         { title: "HTML", votes: 10 },
//         { title: "React", votes: 5 },
//       ],
//     });

//     firstWilder
//       .save()
//       .then((result) => {
//         console.log("success:", result);
//         res.status(200).send("wilder saved");
//       })
//       .catch((err) => {
//         console.log("error:", err);
//         res.status(400).send("error while saving");
//       });
//   });
// });

app.post("/api/wilder/create", runAsyncWrapper(WilderController.create));

app.get("/api/wilder/read", runAsyncWrapper(WilderController.read));

app.put("/api/wilder/update/:id", runAsyncWrapper(WilderController.update));
// app.patch("/api/wilder/patch/:id", WilderController.patch);

app.delete("/api/wilder/delete/:id", runAsyncWrapper(WilderController.delete));

app.get("/", (req, res) => {
  res.send("Hello World test!");
});

// app.use((req, res, next) => {
//   res.status(404).send("Sorry can't find that!");
// });

app.use((error, req, res, next) => {
  if (error.code === 11000) {
    res.status(400);
    res.json({ success: false, message: "The name is already used" });
  } else {
    res.status(400);
    res.json("unknown error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
