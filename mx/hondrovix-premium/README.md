# Hondrovix MX — premium direct response product landing

Responsive Spanish-language site with unique original layout inspired by high-conversion Shopify product-page structure (not a copy of the reference site's copyrighted assets or copy).

## Deployment
Serve this folder directly on GitHub Pages or import its files into a Keitaro landing. Assets are relative to the folder. Publish under `/mx/hondrovix-premium/`.

## Product
Hondrovix joint gel, 50 ml, price **590 MXN**, SkyLead code **G2**, offer ID **1670**. Product photographs supplied by user: `2.jpg`, `4.png`. The first is displayed in the real-packaging section; the other is cropped for the hero.

## Lead connection
`config.js` has `leadEndpoint` empty by default. Until the HTTPS backend or approved Keitaro order form integration is configured, form submissions are **DEMO**, not sent. The form collects name, 10-digit Mexican phone number and consent. The backend must implement security, privacy, deduplication, and SkyLead lead API submission. *Never put SkyLead API secrets in front-end JS.*

Keitaro Click ID can be supplied using `?subid={subid}` (replace with actual configured token). Page pushes `LandingView`, `HeroCTA`, `DiscoverCTA`, `StickyCTA`, `LeadFormSubmit`, `LeadSubmitted` to `window.dataLayer`. No Pixel ID or unauthorized third-party transmission is hard-coded. On actual successful backend response, `LeadSubmitted` fires.

Seller, privacy and terms URLs, delivery and payment conditions must be filled before selling. Form state indicates demo if endpoint is unset.

## Copy standards
The product package itself uses stronger claims that are preserved in user-provided photography, but the webpage does not independently assert unverified instantaneous relief, restoration, fake expert endorsements, or fake scarcity. Promos and assurances require true conditions.
