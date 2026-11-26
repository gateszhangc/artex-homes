# ARTEX Research

Independent English research landing page for ARTEX, published at
`https://artex.homes/`.

The page itself stays on `artex.homes`. Primary CTA buttons open the production
ARTEX console at `https://artex.lol/`.

## Analytics

GA4 browser collection uses `G-53Y83S6DR8` from the `ARTEX` property. Outbound
CTA clicks are sent as the `console_open` event. The Content Security Policy in
`public/_headers` allows only the GA4 and Google Tag Manager endpoints required
for collection.

## Local preview

```bash
python3 -m http.server 3108 --bind 0.0.0.0 --directory public
```

## Deploy

```bash
npx wrangler pages deploy public \
  --project-name artex-homes \
  --branch main \
  --commit-dirty=true
```

Cloudflare Pages serves the static files in `public/`. The zone-level
`http_request_dynamic_redirect` rule sends `www.artex.homes` to the apex with a
`308`, and `public/_headers` applies security and cache headers.
