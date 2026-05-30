import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Ensure public/images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download function
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (Status Code: ${response.statusCode})`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Successfully downloaded: ${path.basename(filepath)}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete local file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const main = async () => {
  console.log(`Starting download of 22 images to ${imagesDir}...`);
  
  // Curious curation: let's download a mix of nature, flowers, sunsets, and warm aesthetic photos
  // Using picsum seeds to make them consistent yet distinct
  const categories = [
    'sunset', 'flower', 'couple', 'love', 'nature', 'romance', 
    'stars', 'travel', 'sea', 'hills', 'cafe', 'forest',
    'lights', 'sky', 'clouds', 'beach', 'mountain', 'lake',
    'autumn', 'aesthetic', 'mist', 'fire'
  ];

  for (let i = 1; i <= 22; i++) {
    const filename = `image${i}.jpg`;
    const filepath = path.join(imagesDir, filename);
    const category = categories[i - 1] || 'love';
    
    // Check if file already exists to avoid redundant downloads
    if (fs.existsSync(filepath)) {
      console.log(`${filename} already exists, skipping.`);
      continue;
    }

    // We use a high quality seed based on the category and index
    const url = `https://picsum.photos/seed/deepika-${category}-${i}/800/600`;
    
    try {
      await downloadImage(url, filepath);
      // Small pause to prevent rate limiting
      await new Promise(r => setTimeout(r, 100));
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error.message);
    }
  }
  
  console.log("All placeholders processed!");
};

main();
