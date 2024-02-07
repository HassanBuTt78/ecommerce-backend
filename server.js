const app = require("./app.js");
const mongoose = require("mongoose");
require("dotenv").config();

const db = mongoose.connect(process.env.DBURI);
db.then(() => {
    app.listen(process.env.PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`app is listing on port ${process.env.PORT}`);
    });
});
