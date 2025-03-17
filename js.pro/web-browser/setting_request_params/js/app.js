async function search(term)
{
   let url = new URL("/api/search");
   url.searchParams.set("q", term);
   let response = await fetch(url);
   if (!response.ok)
   {
      throw new Error(response.statusText);
   }

   return await response.json();
}
