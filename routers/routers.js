const router = require("express").Router();
const { postuser , getuser , getsingleuser , updateuser , deleteuser , loginuser , auth , reguser} = require("../components/components");

router.route("/").post(postuser).get(getuser);
router.route("/user").get(getsingleuser).patch(updateuser).delete(deleteuser)
router.route("/login").get(loginuser)
router.route("/auth").get(auth)
router.route("/reg").get(reguser)

module.exports = router;
