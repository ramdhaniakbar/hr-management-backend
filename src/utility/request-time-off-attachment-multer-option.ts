import { ForbiddenException, HttpStatus } from "@nestjs/common";
import { existsSync, mkdirSync, readdir, rmdirSync, rmSync } from "fs";
import { diskStorage } from "multer";
import { extname } from "path";

export const RequestTimeOffAttachmentOption = {
    limits :{
        fileSize: 5000000
    },
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(new ForbiddenException(`Unsupported file type ${extname(file.originalname)}`), false);
        }
    },
    storage:diskStorage({
        destination: (req: any, file: any, cb: any) =>{
            var requestTimeOff = req.params.id
            var uploadPath = './upload-file/request-time-off-attachment/'+requestTimeOff

            //!! Alt way to delete the whole folder no matter if it's the same file or not
            // if(existsSync(uploadPath)) {
            //     rmdirSync(uploadPath)
            //     // readdir(uploadPath,function(err, file){
            //     //     if(err){
            //     //         throw new ForbiddenException(err)
            //     //     }
            //     //     rmdirSync(uploadPath)
            //     // })
            // }
            
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            else{
                    readdir(uploadPath,function(err, files){
                        if(err){
                            throw new ForbiddenException(err)
                        }
                        if(extname(file.originalname) != extname(files[0])){
                            var temp = uploadPath+"/"+files[0]
                            rmSync(temp,{ recursive: true, force: true })
                        }
                    })

            }
            cb(null, uploadPath)
        },
        filename: (req, file, callback) =>{
            const x:any = req.params.id
            const ext = extname(file.originalname)
            const fileName = x+""+ext
            callback(null, fileName)
        }
    })
}