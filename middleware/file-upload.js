const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        const fileExtension = path.extname(file.originalname);
        cb(
            null,
            path.parse(file.originalname).name.trim().replace(" ", "-") +
                "-" +
                uniqueSuffix +
                fileExtension
        );
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
