const router = require("express").Router();
const { postuser , getuser , getsingleuser , updateuser , deleteuser , loginuser , auth} = require("../components/components");

router.route("/").post(postuser).get(getuser);
router.route("/user").get(getsingleuser).patch(updateuser).delete(deleteuser)
router.route("/login").get(loginuser)
router.route("/auth").get(auth)

module.exports = router;
