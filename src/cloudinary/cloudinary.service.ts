import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'tqltjxmq',
      api_key: '911281654236147',
      api_secret: 'YVuhAg8wJF6TrheKx-O9kMnyH60',
    });
  }

  async uploadImage(buffer: Buffer, folder: string = 'fallega') {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      Readable.from(buffer).pipe(uploadStream);
    });
  }

  async uploadVideo(buffer: Buffer, folder: string = 'fallega') {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'video',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      Readable.from(buffer).pipe(uploadStream);
    });
  }

  async uploadFile(buffer: Buffer, folder: string = 'fallega') {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      Readable.from(buffer).pipe(uploadStream);
    });
  }
}
