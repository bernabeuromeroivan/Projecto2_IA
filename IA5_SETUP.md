# IA5 - Supabase

## 1. Crear la taula

A Supabase, ves a SQL Editor i executa el contingut de `supabase.sql`.

La taula creada es diu `respostes` i te aquests camps:

- `id`
- `grup`
- `puntuacio`
- `comentari`
- `created_at`

## 2. Configurar en local

Copia `config.example.js` i crea un fitxer nou anomenat `config.js`.

Canvia els valors:

```js
window.SUPABASE_CONFIG = {
  url: "https://EL-TEU-PROJECTE.supabase.co",
  anonKey: "LA-TEVA-ANON-KEY"
};
```

`config.js` esta a `.gitignore`, per tant no es puja al repositori.

## 3. Configurar a Vercel

A Vercel, afegeix aquestes variables d'entorn:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

El build executa `node create-config.js` i genera `config.js` automaticament.

## 4. Prova manual

Obre la web, guarda una resposta i comprova que apareix a la taula `respostes` de Supabase.

Despres recarrega la pagina: si la resposta continua apareixent al panell, la persistencia funciona.
