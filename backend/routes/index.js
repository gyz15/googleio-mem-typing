const express = require("express");
const router = express.Router();

// TODO handle data update
// Import route files
const recordRoutes = require("./recordRoutes");

// Use route files
router.use("/record", recordRoutes);

module.exports = router;
