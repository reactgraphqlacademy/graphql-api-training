// https://mongoosejs.com/docs/index.html
const mongoose = require("mongoose");
require("./models/training");
require("./models/discount");

const connection = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.gcp.mongodb.net/LMS`;
console.log("🔥", connection);
mongoose.connect(connection, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
