
import fs from 'fs';
import path from 'path';

const iconDir = path.join(process.cwd(), 'public', 'icon');

if (!fs.existsSync(iconDir)) {
  console.error('Icon directory not found:', iconDir);
  process.exit(1);
}

const files = fs.readdirSync(iconDir);
let count = 0;

console.log('Starting rename process: replacing "+" with "--"...');

files.forEach(file => {
  if (file.includes('+')) {
    const newName = file.replace(/\+/g, '--');
    const oldPath = path.join(iconDir, file);
    const newPath = path.join(iconDir, newName);
    
    // Check if target file already exists to avoid overwriting
    if (fs.existsSync(newPath)) {
      console.warn(`Skipping ${file} -> ${newName}: Target already exists`);
      return;
    }

    try {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${file} -> ${newName}`);
      count++;
    } catch (err) {
      console.error(`Error renaming ${file}:`, err);
    }
  }
});

console.log(`\nRename complete. Total files renamed: ${count}`);
