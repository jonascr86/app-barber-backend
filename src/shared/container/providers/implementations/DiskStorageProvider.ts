import IStorageProvider from "../models/IStorageProvider";
import fs from 'fs';
import path from 'path';
import UploadConfig from '@config/upload';

class DiskStorageProvider implements IStorageProvider{
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(UploadConfig.tempFolder, file),
      path.resolve(UploadConfig.uploadFolder, file)
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(UploadConfig.uploadFolder, file);
    try {
      await fs.promises.stat(file);
    } catch (error) {
      return;
    }
    await fs.promises.unlink(file);
  }

}

export default DiskStorageProvider;
