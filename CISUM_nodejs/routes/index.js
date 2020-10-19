var express = require("express");
var router = express.Router();

var csVO = require("../models/csVO");

/* GET home page. */
router.get("/", function (req, res, next) {
  var searchList = [];

  csVO.find().then(function (dbSelectAll) {
    res.render("index", {
      csList: dbSelectAll,
      cisumList: searchList,
      search_word: "검색결과",
    });
  });
});

module.exports = router;
