import multer from 'multer';

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.IMAGE_SAVE_PATH);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + Math.round(Math.random() * 1e9);
        // eslint-disable-next-line no-useless-escape
        cb(null, fileName + '-' + file.originalname.trim().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, ''));
    },
});
