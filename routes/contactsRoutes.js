const express = require("express");
const router = express.Router();
const {
    getcontacts,
    postcontact,
    getcontact, 
    updatecontact, 
    deletecontact
} = require("../controllers/contact.controllers");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getcontacts).post(postcontact);
router.route("/:id").get(getcontact).put(updatecontact).delete(deletecontact);

module.exports = router;