import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

const WORD2VEC_API_URL = "http://nlp.polytechnique.fr/similarityscore";
const WORD = "chat";

async function handler(_req: Request): Promise<Response> {
    const payload = await _req.formData();
    const word = payload?.get("text")?.toString().trim();

    const response = await fetch(WORD2VEC_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lang: "fr",
            sim1: word,
            sim2: WORD,
            type: "General Word2Vec",
        }),
    });
    const result = await response.json();

  return new Response(`Le mot ${word} a une similarité de ${Math.round(result.simscore * 1e6)/1e6} avec le mot du jour.`);
}

serve(handler);