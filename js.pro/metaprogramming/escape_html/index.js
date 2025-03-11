function html(strings, ...values)
{
   // Convert each value to a string and escape special HTML characters
   let escaped = values.map(currentVal => String(currentVal)
      .replace("&", "&amp;")
      .replace("<", "&lt;")
      .replace(">", "&gt;")
      .replace('"', "&quot;")
      .replace("'", "&#39;"));

   // Return the concatenated strings and escaped values
   let result = strings[0];
   for (let i = 0; i < escaped.length; i++)
   {
      result += escaped[i] + strings[i + 1];
   }

   return result;
}

let operator = "<";
console.log(html`<b>x ${operator} y</b>`);   // => "<b>x &lt; y</b>"

let kind = "game", name = "D&D";
console.log(html`
    <div class="${kind}">${name}</div>`);   // =>'<div class="game">D&amp;D</div>'
