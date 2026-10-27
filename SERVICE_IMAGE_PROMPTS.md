# Service image generation

Tool: built-in `image_gen.imagegen`, using the imagegen skill. One independent image-generation call was made for each of the 24 services. No CLI/API fallback was used.

## Shared production prompt

> Use case: photorealistic-natural. Create ONE finished modern premium editorial photograph for an astrology and personal spiritual guidance website service. Landscape 3:2 composition, important subjects centrally composed with generous crop room. This is a real photographic visual with tactile natural materials, authentic textures, beautiful art direction and credible proportions, not an icon, not a 3D toy render. Cohesive contemporary Mediterranean/Indian wellness editorial style, warm ivory limestone, soft linen, muted natural colours with navy shadows and understated brass accents; elegant natural window light, thoughtful depth of field, magazine-quality. No readable text, no letters, no logos, no watermark, no collage, no website mockup, no frames. No fear-based imagery or promises of results.

Each call appended `Service: {title}. Subject and meaning: {subject}` using the corresponding title and subject in [the complete service manifest](src/data/service-imagery.json). The manifest also records every final saved file in `public/images/services/`.

## First service's initial style-setting prompt

> Use case: photorealistic-natural. Create ONE premium editorial website service photograph for 'Love & Relationship Guidance'. Landscape 3:2 composition. Close-up of two adults' hands resting comfortably together on a pale warm limestone table, one hand gently touching the other, authentic natural skin texture, neutral linen sleeves, a small soft-focus branch of olive leaves, afternoon window light. Contemporary Mediterranean wellness editorial, refined restrained palette of warm ivory, muted rose, deep blue shadows and subtle brass details. Symbolise respectful communication and emotional connection, intimate without sentimentality. Beautiful real photographic composition, tactile materials, shallow depth of field, magazine quality. Subjects and hands fully visible with comfortable central crop for a website card. No faces needed. No text, no letters, no lettering, no logos, no watermarks, no horoscope wheel, no icons, no collage, no frame. This is a single finished photographic asset, not a website mockup. Save the resulting image for project use.

Generated PNG originals are retained in the imagegen output directory. WebP files were resized to 1280px wide and encoded at quality 85 for use in catalogue cards, category previews and individual service pages.
