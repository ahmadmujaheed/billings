import multer from 'multer';
import dotenv from 'dotenv';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {v2 as cloudinary} from 'cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})


//cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:(req, file)=>{
        const folder =
        file.fieldname = 'avatar'
        ? 'avatars'
        :file.fieldname = 'banner'
        ? 'banners'
        : file.fieldname = 'video'
        ?'videos'
        : file.fieldname = 'cover'
        ?'covers'
        : 'default';

        const allowedFormats = file.mimetype.startsWith('video/')
        ? ['mp4', 'mov', 'avi']
        :['jpeg', 'jpg', 'png', 'gif', 'webp'];

        return{
            folder:folder,
            allowedFormats:allowedFormats,
            resource_type:file.mimetype.startsWith('video/') ? 'video' : 'image'
        }
    },
})

//multer configuration
const upload = multer({
    storage,
    limits: {fileSize: 1025 * 1024 * 10  },//limit file size to 10mb,
    fileFilter(req, file, cb){
        console.log('file Details', file);
        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
            'video/mp4',
            'video/mov',
            'video/avi'
        ]

        if(!allowedTypes.includes(file.mimetype)){
            const error = new Error ('Invalid file type. Only JPEG, JPG, PNG, GIF, WEBP, MP4, MOV, AVI file only')
            error.code = 'LIMIT_FILE_TYPES';
            return cb(error)
        }
        cb(null, true);
    },
}).fields([
    {name: 'avatar'}, //fields to be uploaded from our model
    {name: 'banner'},
    {name: 'video'},
    {name: 'cover'},
    {name:'images'},
]);


//middleware to handle file upload, nulter errors and log request details
const uploadMiddleware = (req, res, next) => {
    upload(req, res, (err)=>{
        if(err instanceof multer.MulterError){
            console.error('Multer Error', err)
            return res.status(400).json({message: "File upload error", error:err.message});
        }else if(err){
            console.error('Unknown upload Error', err);
            return res.status(400).json({message:"File upload error", error: err.message});
        }

        //debug
        console.log("Request body", req.body);
        console.log("Request files", req.files)

        next();
    })
};

export default uploadMiddleware;