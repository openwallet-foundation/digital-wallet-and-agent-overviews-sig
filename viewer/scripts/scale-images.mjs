import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputFolder = 'src/assets/logos';
const outputFolder = 'src/assets/logos-resized';
const maxWidth = 200;

// Create the output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

const resizeImage = async (inputPath, outputPath, maxWidth) => {
  try {
    const metadata = await sharp(inputPath).metadata();
    if (metadata.width > maxWidth) {
      await sharp(inputPath)
        .resize({ width: maxWidth })
        .toFile(outputPath);
    } else {
      // If image width is smaller than maxWidth, just copy the file
      fs.copyFileSync(inputPath, outputPath);
    }
    console.log(`Processed: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`Error processing ${path.basename(inputPath)}:`, error);
  }
};

const resizeImagesInFolder = async (inputFolder, outputFolder, maxWidth) => {
  const files = fs.readdirSync(inputFolder);
  for (const file of files) {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(outputFolder, file);
    if (fs.lstatSync(inputPath).isFile() && /\.(jpg|jpeg|png|gif|bmp)$/i.test(file)) {
      await resizeImage(inputPath, outputPath, maxWidth);
    }
  }
};

resizeImagesInFolder(inputFolder, outputFolder, maxWidth)
  .then(() => console.log('Image resizing completed.'))
  .catch(error => console.error('An error occurred:', error));
