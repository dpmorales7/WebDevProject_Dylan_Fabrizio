const mongoose = require("mongoose");
 
exports.connect = async function (where) {
    if (mongoose.connection.readyState !== 0) return; // already connected
    let uri = process.env.DB_URI;
    if (where === 'test') uri = process.env.TESTDB_URI;
    await mongoose.connect(uri)
      .then(() => console.log("Connected to MongoDB"))
      .catch(err => console.error("MongoDB connection error:", err));
  };
 
exports.disconnect = async function () {
  await mongoose.connection.close();
};