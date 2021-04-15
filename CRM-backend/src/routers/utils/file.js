const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg' || 
        file.mimetype === 'application/pdf'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}
const upload = multer({storage: storage, fileFilter: filefilter});
// const upload = multer({ dest: 'uploads/' });

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
}

// const createFiles = async (files, next) => {
//     let filesArray = [];
//     files.forEach(f => {
//         const newFile = new File ({
//             _id: new mongoose.Types.ObjectId(),
//             fileName: f.originalname,
//             filePath: f.path,
//             fileType: f.mimetype,
//             fileSize: fileSizeFormatter(f.size, 2)
//         });
//         filesArray.push(newFile);
//     });
//     let createdFiles;
//     filesArray.forEach(f => {
//         f.save()
//     })
//     return createdFiles;
// }

module.exports = {upload, fileSizeFormatter}