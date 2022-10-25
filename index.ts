import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

async function handler(_req: Request): Promise<Response> {
    const payload = await _req.formData();
    const word = payload?.get("text");
    console.log(word);
  return new Response("Mangez vos darons Kévin et Melon");
}

serve(handler);