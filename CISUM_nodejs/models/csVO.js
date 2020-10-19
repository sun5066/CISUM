var mongoose = require("mongoose");
var schema = mongoose.Schema;

var csVO = new schema({
    cs_id: String,
    cs_title: String
});

module.exports = mongoose.model("tbl_cs", csVO);