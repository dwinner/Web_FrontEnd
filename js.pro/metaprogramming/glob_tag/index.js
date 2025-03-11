import Glob from "./Glob.js";

function glob(strings, ...values)
{
   // Assemble the strings and values into a single string
   let str1St = strings[0];
   for (let i = 0; i < values.length; i++)
   {
      str1St += values[i] + strings[i + 1];
   }

   // Return a parsed representation of that string
   return new Glob(str1St);
}

let root = "/tmp";
let filePattern = glob`${root}/*.html`;  // A RegExp alternative
console.log("/tmp/test.html".match(filePattern)[1]); // => "test"
