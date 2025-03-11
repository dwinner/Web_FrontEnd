export default class Glob
{
   constructor(glob)
   {
      this.glob = glob;

      // We implement glob matching using RegExp internally.
      // ? matches any one character except /, and * matches zero or more
      // of those characters. We use capturing groups around each.
      let regexpText = glob.replace("?", "([^/])").replace("*", "([^/]*)");

      // We use the u flag to get Unicode-aware matching.
      // Globs are intended to match entire strings, so we use the ^ and $
      // anchors and do not implement search() or matchAll() since they
      // are not useful with patterns like this.
      this.regexp = new RegExp(`^${regexpText}$`, "u");
   }

   toString()
   {
      return this.glob;
   }

   [Symbol.search](str)
   {
      return str.search(this.regexp);
   }

   [Symbol.match](str)
   {
      return str.match(this.regexp);
   }

   [Symbol.replace](str, replacement)
   {
      return str.replace(this.regexp, replacement);
   }
}
