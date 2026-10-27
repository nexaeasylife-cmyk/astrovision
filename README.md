# AstroVision

Next.js website with a navy and gold design, responsive navigation, section-specific Three.js backgrounds, animated service icons and static reduced-motion fallbacks.

## Run locally

Use Node 20.9 or newer. Run `npm install`, then `npm run dev` and open http://localhost:3000.

For production: `npm run build`, then `npm start`. Run `npm test` and `npm run typecheck` for checks. Run the build and typecheck sequentially because the build regenerates `.next/types`.

Browser regression: with the site running, use `npx playwright test tests/navigation.spec.ts tests/enquiry.spec.ts --browser=firefox` (requires Playwright Firefox and its system libraries).

## Pages and content

Home, About, Services, 24 service detail pages, How It Works, Reviews, FAQ, Contact, Book Appointment, Horoscope, Journal with three articles, Privacy and Terms are implemented. No pricing is displayed.

The header language selector translates page content into Greek, French, Dutch, Turkish and Hindi, with English as the default. Local dictionaries are fetched only when selected; the choice is saved on the device and remains across navigation. These are website languages, not a promise of consultation-language availability. Original client review quotations and user-entered text remain in their original language. Enquiry messages currently use English labels. The horoscope contains labelled reflection prompts and an approximate Western sun-sign finder, not calculated personal predictions.

Hanuman Puja has been removed as requested, leaving 24 services across five categories. Descriptive service titles avoid promises; the specialist index also shows the supplied names. Edit `src/data/content.ts` for services, FAQs and articles, and `src/data/site.ts` for business identity, map, Instagram and supplied review excerpts. Reviews are not a live Google feed. Real biography, credentials and video testimonials still require client material.

## Contact configuration

Copy `.env.example` to `.env.local` and fill in the available public business details. WhatsApp requires an international number using digits only, without `+`. Phone, email, opening hours and Facebook appear when configured. `NEXT_PUBLIC_SITE_URL` supplies the production origin for sitemap and robots output; rebuild after changing public environment variables.

Forms prepare an editable enquiry locally. Visitors explicitly open WhatsApp to send it; when no WhatsApp number is configured, they can copy it into Instagram. No enquiry is stored in a website database, and no appointment is confirmed automatically. Scheduling, payments and WhatsApp Business auto-replies are not integrated.

## Animation and assets

`src/components/celestial.tsx` retains the home Jyotisha scene and selects distinct astrology diagrams for About, Services, How It Works, Reviews, Contact, Book, Horoscope, Journal, FAQ, Privacy and Terms. Service/article detail pages inherit their section artwork. `src/lib/page-art.ts` defines original kundli, zodiac/aspect, lunar-phase, horizon and other astrological diagrams; see `ASTROLOGY_VISUAL_RESEARCH.md` for sources and page meanings. The home background is preserved. Non-home artwork is contained inside its page header. Each of the 24 services uses its own editorial photograph, mapped in `src/data/service-imagery.json`, on the catalogue and detail pages. `npx tsx scripts/create-page-art.ts` captures matching `*-astrology.webp` fallback posters from the actual WebGL scene (requires a local running server and Playwright Chromium). Reduced motion, hidden tabs, data saving, low-memory hints and unavailable WebGL retain static artwork. A pause control stops animation. New photographs are stored locally; see [asset credits and research](ASSET_CREDITS.md).

## Translations and verification

`public/locales/` contains static dictionaries. `scripts/extract-translations.cjs` extracts source text. Translation drafts were generated offline using Argos models with CTranslate2 and sentencepiece in a separate tooling environment; those tools and models are not application dependencies. `scripts/translate-offline.py` documents regeneration. Reviewed navigation, booking, zodiac and heading translations live in `src/data/translations/ui.tsv`; apply them with `node scripts/apply-translation-overrides.cjs`. Long-form translations are machine-assisted drafts and should receive native-language editorial review before publication.

Run `npm test`, `npm run build`, and then `npm run typecheck`. With a server running, run `npx playwright test tests/navigation.spec.ts tests/enquiry.spec.ts tests/revision.spec.ts --browser=firefox`. Set `PLAYWRIGHT_BASE_URL` to use another port. The revision suite checks all main routes at desktop/mobile widths, axe accessibility/contrast, removed-service URLs, image loading, all language switches, persistence, input preservation and failed-language-download recovery. On Windows-mounted WSL workspaces, `WATCHPACK_POLLING=true npm run dev -- --webpack` reliably detects file changes.

The repository contains the application source and runtime assets. Original reference photos, design briefs, internal working notes and local environment files are excluded. Hosting has not been configured.
