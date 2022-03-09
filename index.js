const express = require("express");
const app = express();
const mongoose = require("mongoose");
const WilderController = require("./controllers/Wilder");

const port = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", { autoIndex: true })
  .then(() => console.log("connection au serveur réussie"))
  .catch((err) => console.log("erreur"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.put("/api/wilder/update/:id", WilderController.update);
// app.patch("/api/wilder/patch/:id", WilderController.patch);

app.delete("/api/wilder/delete/:id", WilderController.delete);

app.get("/", (req, res) => {
  res.send("Hello World test!");
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
