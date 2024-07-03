const express = require("express");
const router = express.Router();

const Record = require("../models/Record");

router.get("/test", (req, res) => {
  return res.json({ status: "test success" });
});

router.post("/addRecord", (req, res) => {
  console.log(req.body.name, req.body.marks);

  const newRecord = new Record({
    name: req.body.name,
    marks: req.body.marks,
    date: new Date(),
  });
  newRecord
    .save()
    .then((record) =>
      res.json({ msg: "successfully created", record: record })
    );
  // .catch((err) => res.json({ msg: "Error", err: err }));
  // .catch((err) => console.log(err));
});

router.get("/ranking", (req, res) => {
  Record.find()
    .sort({ marks: -1 })
    .limit(20)
    .then((record) => res.json(record))
    .catch((err) => res.status(404).json({ record: "No records found" }));
});

module.exports = router;
