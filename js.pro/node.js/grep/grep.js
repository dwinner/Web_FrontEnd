import GrepStream from "./GrepStream.mjs";

// Now we can write a program like 'grep' with this class.
let pattern = new RegExp(process.argv[2]); // Get a RegExp from command line.
const grepStream = new GrepStream(pattern);
process.stdin                // Start with standard input,
   .setEncoding("utf8")      // read it as Unicode strings,
   .pipe(grepStream)         // pipe it to our GrepStream,
   .pipe(process.stdout)     // and pipe that to standard out.
   .on("error", () => process.exit());    // Exit gracefully if stdout closes.
