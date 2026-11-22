# ARTEX Research

Independent English research landing page for ARTEX, published at
`https://artex.homes/`.

The page itself stays on `artex.homes`. Primary CTA buttons open the production
ARTEX console at `https://artex.lol/`.

## Local preview

```bash
python3 -m http.server 3108 --bind 0.0.0.0 --directory public
```

## Worker preview

```bash
npx wrangler dev
```

## Deploy

```bash
npx wrangler deploy
```

The Worker serves static assets from `public/`, redirects `www.artex.homes` to
the apex host with a `308`, and adds baseline security headers.
