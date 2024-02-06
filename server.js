const app = require("./app.js");
const { connectDB } = require("./model/user.js");
require("dotenv").config();

const db = connectDB(process.env.DBURI);
db.then(() => {
  app.listen(process.env.PORT, (err) => {
    console.log(`app is listing on port ${process.env.PORT}`);
  });
});
