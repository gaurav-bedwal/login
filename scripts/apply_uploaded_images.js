import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brainDir = '/Users/gauravbedwal/.gemini/antigravity-ide/brain/0a9e5e28-85d1-4cdd-bcd9-b465e082504d';
const targetDir = path.join(__dirname, '..', 'public', 'images');

// The 5 source media files found in the brain folder
const sourceImages = [
  'media__1780168783984.jpg', // Saree side profile (Hero)
  'media__1780168783992.jpg', // Green dress smiling
  'media__1780168784012.jpg', // Saree front profile
  'media__1780168784017.jpg', // Tree white dress
  'media__1780168784031.jpg'  // Lavender dress
];

const main = () => {
  console.log("Applying uploaded photos of Deepika...");

  // 1. Copy the 5 primary images
  sourceImages.forEach((sourceName, index) => {
    const sourcePath = path.join(brainDir, sourceName);
    const targetPath = path.join(targetDir, `image${index + 1}.jpg`);

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied ${sourceName} -> image${index + 1}.jpg`);
    } else {
      console.error(`Source file not found: ${sourcePath}`);
    }
  });

  // 2. Cycle these 5 images for slots image6.jpg through image22.jpg
  // so the gallery, carousel and timeline remain completely populated with her actual photos.
  for (let i = 6; i <= 22; i++) {
    // Cycle index: (i - 1) % 5
    const sourceIndex = (i - 1) % 5;
    const sourceName = sourceImages[sourceIndex];
    const sourcePath = path.join(brainDir, sourceName);
    const targetPath = path.join(targetDir, `image${i}.jpg`);

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }

  console.log("Successfully personalized all 22 image slots with Deepika's photos!");
};

main();
