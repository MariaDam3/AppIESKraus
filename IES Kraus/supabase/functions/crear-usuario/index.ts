import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { email, nombre } = await req.json();

  const password = Array(12)
    .fill(0)
    .map(() =>
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"[
        Math.floor(Math.random() * 56)
      ]
    )
    .join("");

  const supabaseAdmin = createClient(
    "https://ujggmasksxftvnufnumz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqZ2dtYXNrc3hmdHZudWZudW16Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODI1MTE1NywiZXhwIjoyMDYzODI3MTU3fQ.3lOprdG7QoyNpW5m8pLcJ442I56mec7aVGCyoNpxNkg"
  );

  const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { nombre, rol: "profesor" },
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  const { error: insertError } = await supabaseAdmin.from("perfiles").insert([
    { id: user.user.id, nombre, rol: "profesor" },
  ]);

  if (insertError) {
    return new Response(JSON.stringify({ error: insertError.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }

  return new Response(JSON.stringify({ success: true, password }), {
    status: 200,
    headers: corsHeaders,
  });
});
