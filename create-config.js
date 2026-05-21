const fs = require("fs");

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Falten SUPABASE_URL o SUPABASE_ANON_KEY");
}

const config = `window.SUPABASE_CONFIG = {
  url: ${JSON.stringify(SUPABASE_URL)},
  anonKey: ${JSON.stringify(SUPABASE_ANON_KEY)}
};
`;

fs.writeFileSync("config.js", config);
