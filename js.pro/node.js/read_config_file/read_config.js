const fs = require("fs");
const util = require("util");
const pfs = {readFile: util.promisify(fs.readFile)};

function readConfigFileSync(path)
{
   let text = fs.readFileSync(path, "utf-8");
   return JSON.parse(text);
}

async function readConfigFileAsync(path)
{
   let text = await pfs.readFile(path, "utf-8");
   return JSON.parse(text);
}

function readConfigFilePfs(path)
{
   return pfs.readFile(path, "utf-8").then(text =>
                                           {
                                              return JSON.parse(text);
                                           });
}

// Read a config file, parse its contents as JSON, and pass the
// resulting value to the callback. If anything goes wrong,
// print an error message to stderr and invoke the callback with null
function readConfigFile(path, callback)
{
   fs.readFile(path, "utf8", (err, text) =>
   {
      if (err)
      {
         // Something went wrong reading the file
         console.error(err);
         callback(null);
         return;
      }

      let data = null;
      try
      {
         data = JSON.parse(text);
      }
      catch (e)
      {
         // Something went wrong parsing the file contents
         console.error(e);
      }

      callback(data);
   });
}
