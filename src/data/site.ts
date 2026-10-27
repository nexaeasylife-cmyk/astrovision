export const site = {
  name: 'Astro Vision',
  maps: 'https://maps.app.goo.gl/rj2mQdtfo7izqfCD8',
  instagram: 'https://www.instagram.com/a_s_t_r_o_vision/',
  astrologer: '', whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '', phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? '', email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '', hours: process.env.NEXT_PUBLIC_OPENING_HOURS ?? '', facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? '', location: 'Ledras 154-154, Nicosia 1011, Cyprus',
  stats: [],
  disclaimer: 'Astrology and spiritual guidance are offered for reflection and support. They are not a substitute for medical, legal, financial or psychological advice.',
};
export const categories = [
  { title: 'Love & family', topic: 'Marriage', number: '01', mark: 'together', description: 'Personal guidance for love, marriage, family relationships, and the changes you are navigating.', services: ['Get Your Love Back', 'Family Disputes', 'Separation / Divorce', 'Horoscope Matching', 'Marriage Problems', 'Relationship Problems', 'Kundli Matching', 'Marriage Guidance', 'Relationships'] },
  { title: 'Work & prosperity', topic: 'Career', number: '02', mark: 'growth', description: 'Explore questions about your career, finances, business, and property through an astrological perspective.', services: ['Job Problems', 'Money Problems', 'Career Problems', 'End Business Problems', 'End Property Disputes', 'Career Guidance', 'Business', 'Property Matters'] },
  { title: 'Wellbeing & balance', topic: 'Health and Wellbeing', number: '03', mark: 'lotus', description: 'A supportive space for spiritual reflection and emotional wellbeing, alongside professional care.', services: ['Spiritual Healing', 'Depression — Spiritual Support', 'Wellbeing Guidance', 'Spiritual Practice'] },
  { title: 'Readings & perspective', topic: 'Palm or Face Reading', number: '04', mark: 'rings', description: 'Explore traditional readings for self-reflection and a fresh perspective on your next chapter.', services: ['Palm Reading', 'Face Reading', 'Psychic Reading', 'Future Predictions', 'Birth Chart', 'Annual Reading'] },
  { title: 'Protection & cleansing', topic: 'Protection and Cleansing', number: '05', mark: 'protection', description: 'Traditional spiritual consultations and cleansing practices for concerns about negative influences.', services: ['Bad Luck Removal', 'Jealousy and Curse', 'Evil Spirits Removal', 'Black Magic Removal'] },
];
export const topics = [...new Set([
  'Marriage', 'Relationships', 'Family', 'Money and Business', 'Career', 'Property',
  'Health and Wellbeing', 'Protection and Cleansing', 'Palm or Face Reading',
  ...categories.flatMap(category => category.services), 'Other',
])];
export const steps = [
  ['Start a conversation', 'Tell us what is on your mind. A simple message is enough to begin.'],
  ['Share your details', 'We explain what information is helpful and agree on your session.'],
  ['Meet for your consultation', 'Speak by phone, video, or in person, subject to availability.'],
  ['Take time to reflect', 'Receive a clear summary. Any traditional remedies are optional.'],
];
export const faqs = [
  ['What happens during a consultation?', 'We begin with your question, discuss the relevant details, and explore a traditional astrological perspective. You have space to ask questions and decide what feels useful to you.'],
  ['Do I need to know my exact birth time?', 'A birth date, time, and place can help with a birth-chart reading. If your time is unknown, say so when you reach out; we will explain the limitations and suitable alternatives.'],
  ['Are results guaranteed?', 'No. Astrology offers perspective and reflection, not certain predictions or guaranteed outcomes. Decisions always remain yours.'],
  ['Will I need to perform a ritual?', 'No. Traditional remedies and rituals are always optional. Any costs must be explained and agreed before you choose to proceed.'],
  ['Can this replace professional advice?', 'No. Please consult a qualified doctor, mental health professional, lawyer, or financial adviser for those needs. Spiritual guidance is a complementary space for reflection.'],
];

// Transcribed from the client-supplied review screenshot; not a live Google feed.
export const reviews = [
 {name:'Luca Bianchi', language:'el', text:'Η ενόρασή του ήταν σαν ένα απαλό ξύπνημα — παρηγορητική, καθαρή και βαθιά αληθινή.'},
 {name:'Sohaila Al-Mansouri', language:'en', text:'The reading was insightful and impressively detailed. I truly appreciated the thoughtful attention given to addressing my concerns.'},
 {name:'Sakura Tanaka', language:'en', text:'The reading was insightful and impressively detailed. I truly appreciated the thoughtful attention given to addressing my concerns.'},
 {name:'Diego Fernández', language:'en', text:'The reading was insightful and impressively detailed. I truly appreciated the thoughtful attention given to addressing my concerns.'},
 {name:'Katsuro Sato', language:'en', text:'The session was truly transformative, helping me reconnect with parts of myself I had lost touch with.'},
 {name:'Pavitra Sharma', language:'en', text:'The session was a profound journey of self-discovery and emotional release, illuminating long-held beliefs and encouraging authentic transformation.'},
];
