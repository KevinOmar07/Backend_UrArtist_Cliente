import multer from 'multer';
import DatauriParser from 'datauri/parser.js';
import path from 'path';

const storage = multer.memoryStorage();
const multerUploadsPerfil = multer({ storage }).fields( 
    [
        { name: 'perfilfile', maxCount: 1 }
    ]);

const parser = new DatauriParser();

const dataUri = req => 
    parser.format( path.extname(req.file.originalname).toString() , req.file.buffer);

export { multerUploadsPerfil, dataUri };