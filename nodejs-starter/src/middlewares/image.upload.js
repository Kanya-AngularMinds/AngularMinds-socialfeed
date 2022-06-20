const multer = require('multer')
const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images")
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    },
    fileFilter: function (req, file, cb) {
        // Allowed ext
        const filetypes = /jpeg|jpg|png|gif/;
        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
})
const upload = multer({ storage: storage })
module.exports = upload.array("photos", 5)
module.exports.singleImg = upload.single("profilePicture")


// const multer = require('multer');
// const upload = multer({
//     dest: '../src/Images',
//     limits: { fileSize: 1000000 }
// }).single("demo_image");

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../src/Images');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// fileFilter: function (req, file, cb) {
//     // Allowed ext
//     const filetypes = /jpeg|jpg|png|gif/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);
//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }

// });