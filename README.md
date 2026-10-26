# AstroVision

Next.js website with a navy and gold design, responsive navigation, a shared, front-facing Three.js Jyotisha background, animated service icons and static reduced-motion fallbacks.

## Run locally

Use Node 20.9 or newer. Run `npm install`, then `npm run dev` and open http://localhost:3000.

For production: `npm run build`, then `npm start`. Run `npm test` and `npm run typecheck` for checks. Run the build and typecheck sequentially because the build regenerates `.next/types`.

Browser regression: with the site running, use `npx playwright test tests/navigation.spec.ts tests/enquiry.spec.ts --browser=firefox` (requires Playwright Firefox and its system libraries).

## Pages and content

Home, About, Services, 25 service detail pages, How It Works, Reviews, FAQ, Contact, Book Appointment, Horoscope, Journal with three articles, Privacy and Terms are implemented. No pricing is displayed.

Consultation languages are English, Greek, French, Dutch, Turkish and Hindi. These are consultation preferences; website copy is English. The horoscope contains labelled reflection prompts and an approximate Western sun-sign finder, not calculated personal predictions.

All 22 services from the supplied specialist image are represented, with three existing offerings retained. Descriptive service titles avoid promises; the specialist index also shows the supplied names. Edit `src/data/content.ts` for services, languages, FAQs and articles, and `src/data/site.ts` for business identity, map, Instagram and supplied review excerpts. Reviews are not a live Google feed. Real biography, credentials and video testimonials still require client material.

## Contact configuration

Copy `.env.example` to `.env.local` and fill in the available public business details. WhatsApp requires an international number using digits only, without `+`. Phone, email, opening hours and Facebook appear when configured. `NEXT_PUBLIC_SITE_URL` supplies the production origin for sitemap and robots output; rebuild after changing public environment variables.

Forms prepare an editable enquiry locally. Visitors explicitly open WhatsApp to send it; when no WhatsApp number is configured, they can copy it into Instagram. No enquiry is stored in a website database, and no appointment is confirmed automatically. Scheduling, payments and WhatsApp Business auto-replies are not integrated.

## Animation and assets

`src/components/celestial.tsx` and `living-scene.tsx` supply one decorative Jyotisha scene with Navagraha markers, twelve rashi divisions and twenty-seven nakshatra divisions mounted in the root layout. The same scene stays behind every page. Its matching static Jyotisha poster is hidden once the live canvas is ready; the separate rotating hero zodiac wheel has been removed. A persistent pause control stops the background, service icons and logo animation. `service-art.tsx` supplies the six animated category icons. Reduced motion, hidden tabs, data saving, low-memory hints and unavailable WebGL retain static artwork; off-screen service icons pause. Original procedural artwork and the supplied business logo are used.

The repository contains the application source and runtime assets. Original reference photos, design briefs, internal working notes and local environment files are excluded. Hosting has not been configured.
