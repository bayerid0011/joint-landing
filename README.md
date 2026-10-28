# Joint Landing — mobile-first demo

Open `index.html` in a browser. The page is responsive and works as a static site. External Unsplash photos require internet access.

## GEO adaptation
Edit `config.js`: `locale`, `currency`, `price`, `phonePlaceholder`, `images`, `fields`, `translations`. The visual design remains unchanged. Text for other languages can be replaced using `translations` keys from `data-i18n` attributes.

## Important before going live
- Replace demo product and all ingredient references with actual product data and permitted claims.
- Replace placeholder imagery with licensed product and lifestyle photos.
- Add real seller details, privacy policy, delivery/returns and any country-specific mandatory disclosures.
- Replace demo form handler with an HTTPS backend/CRM integration, anti-spam controls, secure storage, and legally valid consent flow.
- Verify local advertising/health claims and translations.
- Never use invented testimonials, scarcity, or discounts.

## Deployment
Upload `index.html` and `config.js` together to any static hosting service (Netlify, Cloudflare Pages, GitHub Pages). Form submission currently only displays a local demo confirmation and sends no data.