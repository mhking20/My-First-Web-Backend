const router = require("express").Router();
const { postuser , getuser , getsingleuser , updateuser , deleteuser} = require("../components/components");

router.route("/").post(postuser).get(getuser);
router.route("/user").get(getsingleuser).patch(updateuser).delete(deleteuser)

module.exports = router;
