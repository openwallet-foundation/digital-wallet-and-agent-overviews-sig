import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_FOLDER = 'src/assets/logos';
const OUTPUT_FOLDER = 'src/assets/logos-resized';
const MAX_WIDTH = 200;

// Create the output folder if it doesn't exist
function createOutputFolder(folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
}

// Resize an image if its width is greater than maxWidth, otherwise copy it
async function resizeImage(inputPath, outputPath, maxWidth) {
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
}

// Resize all images in a folder
async function resizeImagesInFolder(inputFolder, outputFolder, maxWidth) {
  const files = fs.readdirSync(inputFolder);
  for (const file of files) {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(outputFolder, file);
    if (fs.lstatSync(inputPath).isFile() && /\.(jpg|jpeg|png|gif|bmp)$/i.test(file)) {
      await resizeImage(inputPath, outputPath, maxWidth);
    }
  }
}

// Move all files from one folder to another and remove the original folder
function overrideFolder(inputFolder, outputFolder) {
  const files = fs.readdirSync(inputFolder);
  for (const file of files) {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(outputFolder, file);
    fs.copyFileSync(inputPath, outputPath);
  }
  fs.rmSync(inputFolder, { recursive: true });
}

// Main function to resize images and override the folder
async function main() {
  createOutputFolder(OUTPUT_FOLDER);
  await resizeImagesInFolder(INPUT_FOLDER, OUTPUT_FOLDER, MAX_WIDTH);
  overrideFolder(OUTPUT_FOLDER, INPUT_FOLDER);
}

main().catch(error => console.error('An error occurred:', error));
