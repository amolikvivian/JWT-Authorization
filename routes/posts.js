const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    posts: [
      { title: "My first post", desc: "Data" },
      { title: "My second post", desc: "More Data" },
    ],
  });
});

module.exports = router;
