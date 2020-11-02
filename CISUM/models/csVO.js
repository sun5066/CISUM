const mongoose = require("mongoose");
const schema = mongoose.Schema;

var csVO = new schema({
    cs_id: String,
    cs_title: String,
    user_email: String,
});

module.exports = mongoose.model("tbl_cs", csVO);