// Search for external link of images, download them and set a new reference to the local file
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import axios, { AxiosError } from 'axios';
import { createWriteStream } from 'fs';
import { error } from 'console';

const folder = "../wallets";
const files = readdirSync(folder);

async function downloadImage(url, filepath) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  const contentType = response.headers['content-type'];
  let extension = 'jpg'; // Default to jpg if content type is unknown

  if (contentType === 'image/png') {
    extension = 'png';
  } else if (contentType === 'image/jpeg') {
    extension = 'jpg';
  } else if(contentType === 'image/svg+xml') {
    extension = 'svg';
  } else if(contentType === 'image/webp') {
    extension = 'webp';
  } else {
    throw Error(`${contentType} is not a supported image type with url ${url}`);
  }

  const writer = createWriteStream(`${filepath}.${extension}`);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(extension));
    writer.on('error', reject);
  });
}

const imageFolder = join('src', 'assets', 'logos');

(async () => {
  for (const file of files) {
    const content = JSON.parse(readFileSync(join(folder, file)));
    if (content.logo?.startsWith("http")) {
      console.log("Downloading image from", content.logo);
      const imageUrl = content.logo;
      const imageFilename = `${file.split('.')[0]}`;
      const imagePath = join(imageFolder, imageFilename);

      // Download image and save it locally
      await downloadImage(imageUrl, imagePath).then((extension) => {
        // Set new reference to the local file
        content.logo = `logos/${imageFilename}.${extension}`;

        // Write updated content back to the file
      }, (err) => {
        if(err.status !== 403) {
          throw Error(err);
        }
        delete content.logo;
      });
      writeFileSync(join(folder, file), JSON.stringify(content, null, 2));
    }
  }
})();
