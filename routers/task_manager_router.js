const express = require("express");

const router = express.Router();

const {getalltask , posttask , deletetask , patchtask , deletealltask} = require("../components/Task_Manager_Component")

router.route("/").get(getalltask).post(posttask).delete(deletealltask);
router.route("/:id").delete(deletetask).patch(patchtask)

module.exports = router