import { config, uploader } from 'cloudinary';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const cloudinaryConfig = (req, res, next)  => {
    config({
        cloud_name: process.env.CLOUDNAME,
        api_key: process.env.APIKEY,
        api_secret: process.env.APISECRET,
    });
    next();
}
    
export { cloudinaryConfig, uploader, cloudinary };