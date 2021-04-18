const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
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

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
}

const toFileObjects = (files) => {
    return files.map((f) => ({
        fileName: f.originalname,
        filePath: f.path.replace('public\\',''),
        fileType: f.mimetype,
        fileSize: fileSizeFormatter(f.size, 2)
    }))
}

module.exports = {upload, toFileObjects}