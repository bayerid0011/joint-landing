# NOW Foods — Nutra Direct Response Landing (editable template)

A real responsive HTML/CSS/JS landing page (no flattened mockup) for **NOW Foods Glucosamine & Chondroitin with MSM, 90 capsules**.

## Change offer in `config.js`
Change `id`, `brand`, `shortName`, `headline`, `description`, `facts`, `painPoints`, `decisionPoints`, `highlights`, `dailyUse`, `units`, `servings`, `warning`, `disclaimer`, and product images. Preserve truthful product claims and regulatory notices for each market.

Put your actual offer's photo at `assets/product.webp`, and your licensed lifestyle photo at `assets/lifestyle.webp`; update `image` / `lifestyleImage` to match filenames. Images are standalone files, not screenshot backgrounds.

## Before accepting leads
- Set actual `price` / `oldPrice` only when substantiated; `null` displays a price inquiry instead.
- Set `seller`, `sellerEmail`, `privacyUrl`, `termsUrl`, and `orderEndpoint`.
- Localize language, contact details, phone placeholder, legal notices, delivery, and currency to the GEO.
- Add a real consent manager before loading Meta Pixel; currently the site only emits structured `dataLayer` events and does not load a pixel.
- Put your own tested HTTPS backend at `orderEndpoint` (POST JSON) and ensure abuse protection and consent logging.

## Events
`landing_view`, `cta_click`, `lead_validation_error`, `lead_submit_success`, `lead_submit_error`, `demo_form_attempt` are pushed to `window.dataLayer`. UTM parameters accompany the POST on the backend-enabled form.

## Constraints
The page is not an official NOW Foods store. The example is a demo, not a live checkout. No invented reviews or medical cures. Pricing, availability, seller details, and policies must be supplied before launch. The existing page and images were inspected, JS passed syntax checks, but browser rendering could not be verified in this environment (Chromium returned `ERR_BLOCKED_BY_ADMINISTRATOR` on `file://` and `localhost`).
