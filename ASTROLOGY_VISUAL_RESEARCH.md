# Astrology visual direction — 27 October 2026

The client rejected the first set of generic floating objects and repeated service icons. This revision preserves the existing home-page Jyotisha animation and replaces the other backgrounds with readable, subject-specific astrological diagrams. Motion belongs to a chart pointer, transit indicator or lunar orbit; the whole diagram does not tumble. Non-home backgrounds are contained within their page header.

## Research and scope

- The [Metropolitan Museum's Nine Luminaries handscroll](https://www.metmuseum.org/art/collection/search/45616) identifies the traditional Navagraha as the Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn and the two lunar nodes. The nodes are not drawn as extra physical planets.
- The [Library of Congress, The Heavens](https://loc.gov/exhibits/world/heavens.html) documents celestial charts, movable astronomical diagrams, armillary instruments and Indian planetary traditions. These inform the engraved chart, folio and horizon-instrument visual vocabulary.
- Barry Perlus's Cornell-associated [Jantar Mantar instrument research](https://jantarmantar.org/learn/observatories/instruments/Rasivalaya/index.html) explains the twelve zodiac-related Rasivalaya instruments and their relationship to the equatorial Samrat sundial. The booking image uses an original stylised gnomon and graduated dial, rather than copying a photograph or historical instrument design.
- [NASA's Moon Phases](https://science.nasa.gov/moon/moon-phases/) explains the eight phases and the changing illuminated portion visible from Earth. The horoscope artwork shows a new-to-full-to-new sequence with a phase terminator, rather than eight identical spheres.
- [Smithsonian Folkways' Navagraha notes](https://folkways-media.si.edu/docs/folkways/artwork/FW04131.pdf) identify Rahu and Ketu with the ascending and descending intersections of the lunar path and ecliptic. The FAQ diagram shows two opposite intersections of inclined paths.

These are original symbolic artworks. No diagram represents a visitor's birth chart, actual current transits, calculated auspicious appointment time or a scientific validation of astrology. Sources inform the symbolism; their copyrighted images are not copied into this project.

## Backgrounds

| Page | Visual and its connection to the page | Motion |
| --- | --- | --- |
| Home | Existing Jyotisha background | Preserved |
| About | North Indian square-and-diamond kundli, twelve houses, Sun and Moon | Very slight viewing-angle movement; chart remains legible |
| Services | Twelve-house zodiac chart with aspect connections | Transit indicator travels around the graduated dial |
| How it works | Zodiac intersecting an east–west horizon; highlighted ascendant | Chart indicator demonstrates the relationship of chart, time and place |
| Reviews | Two charts and their connections, inspired by synastry | Restrained movement; represents conversations and individual perspectives |
| Contact | Celestial horizon instrument with cardinal directions | Slight viewing-angle movement; location and orientation |
| Booking | Graduated zodiac sundial with triangular gnomon | Time indicator moves slowly; choosing a moment |
| Horoscope | Eight shaded lunar phases around Chandra | The central Moon cycles through illumination while eight reference phases stay fixed |
| Journal | Open celestial folio with a chart and lunar illustration | Restrained movement; studying and reflecting on a tradition |
| FAQ | Inclined lunar path intersecting the ecliptic at Rahu and Ketu | Moon moves on the inclined path, nodes remain opposite |
| Privacy | A personal kundli held in an engraved folio | Restrained movement; keeping personal chart information in confidence |
| Terms | Zodiac and Libra-inspired star connections | Restrained movement; balance and agreement as an editorial metaphor |

## Individual service photographs

Every catalogue service receives a different image. `src/data/service-imagery.json` records the complete subject/prompt set and final project paths. Images are made with the built-in imagegen tool in a cohesive contemporary editorial style; they are illustrations, not photographs of AstroVision staff, premises, clients or proven outcomes.

Relationships use human connection, commitment, respectful space and repair as distinct subjects. Readings show the relevant practice: an open palm, facial profile, paired charts, a prism or a reflective reading desk. Career, job, business, money and property use different real-world settings. Spiritual concerns use reassuring light, a protected flame, reflection and personal boundaries without frightening depictions. Wellbeing imagery portrays quiet support and reflection without medical-treatment imagery.

Generated originals are retained in the imagegen output directory. Optimised local deliverables are in `public/images/services/`; animations and fallback artwork are defined in `src/lib/page-art.ts` and `public/images/scenes/*-astrology.webp`.
