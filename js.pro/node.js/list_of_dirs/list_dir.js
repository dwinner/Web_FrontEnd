const fs = require("fs");
const path = require("path");

async function listDirectory(dirPath)
{
   let dir = await fs.promises.opendir(dirPath);
   for await (let entry of dir)
   {
      let name = entry.name;
      if (entry.isDirectory())
      {
         // Add a trailing slash to subdirectories
         name += "/";
      }

      let stats = await fs.promises.stat(path.join(dirPath, name));
      let size = stats.size;
      console.log(String(size).padStart(10), name);
   }
}

console.log(listDirectory('.'));