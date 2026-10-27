const hindiTopics: Record<string, string> = {
  'Get Your Love Back': 'प्रेम संबंधों में दोबारा जुड़ने',
  'Family Disputes': 'पारिवारिक विवादों',
  'Separation / Divorce': 'अलगाव या तलाक',
  'Horoscope Matching': 'कुंडली मिलान',
  'Marriage Problems': 'वैवाहिक समस्याओं',
  'Relationship Problems': 'रिश्तों की समस्याओं',
  'Marriage Guidance': 'विवाह संबंधी मार्गदर्शन',
  'Job Problems': 'नौकरी की समस्याओं',
  'Money Problems': 'धन संबंधी समस्याओं',
  'Career Problems': 'करियर की समस्याओं',
  'End Business Problems': 'व्यवसाय की समस्याओं',
  'End Property Disputes': 'संपत्ति विवादों',
  'Career Guidance': 'करियर मार्गदर्शन',
  Business: 'व्यवसाय',
  'Property Matters': 'संपत्ति संबंधी मामलों',
  'Spiritual Healing': 'आध्यात्मिक सहयोग',
  'Depression — Spiritual Support': 'अवसाद के दौरान आध्यात्मिक सहयोग',
  'Wellbeing Guidance': 'स्वस्थ जीवन के मार्गदर्शन',
  'Spiritual Practice': 'आध्यात्मिक अभ्यास',
  'Palm Reading': 'हस्तरेखा अध्ययन',
  'Face Reading': 'मुखाकृति अध्ययन',
  'Psychic Reading': 'अंतर्ज्ञान आधारित अध्ययन',
  'Future Predictions': 'भविष्य संबंधी ज्योतिषीय मार्गदर्शन',
  'Birth Chart': 'जन्म कुंडली',
  'Annual Reading': 'वार्षिक ज्योतिषीय अध्ययन',
  'Bad Luck Removal': 'दुर्भाग्य संबंधी आध्यात्मिक मार्गदर्शन',
  'Jealousy and Curse': 'ईर्ष्या और श्राप संबंधी चिंताओं',
  'Evil Spirits Removal': 'नकारात्मक शक्तियों से जुड़ी आध्यात्मिक चिंताओं',
  'Black Magic Removal': 'काले जादू से जुड़ी आध्यात्मिक चिंताओं',
  'Traditional Ritual Guidance': 'पारंपरिक अनुष्ठान मार्गदर्शन',
 Marriage: 'विवाह', Relationships: 'रिश्तों', Family: 'परिवार', 'Money and Business': 'धन और व्यवसाय', Career: 'करियर', Property: 'संपत्ति', 'Health and Wellbeing': 'स्वास्थ्य और कल्याण', 'Protection and Cleansing': 'पारंपरिक सुरक्षा और शुद्धिकरण', 'Palm or Face Reading': 'हस्तरेखा या मुखाकृति अध्ययन', 'Kundli Matching': 'कुंडली मिलान', Other: 'अपने प्रश्न', 'a consultation': 'परामर्श', 'a question about consultations': 'परामर्श से जुड़े प्रश्न' };
export function buildMessage(topic: string, name = '', language = 'English') {
  const who = name.trim().slice(0, 80);
  return language === 'Hindi'
    ? `नमस्ते, मैं ${hindiTopics[topic] ?? topic} के बारे में जानकारी चाहता/चाहती हूँ।${who ? ` मेरा नाम ${who} है।` : ''} कृपया अगला कदम बताएं। मैं हिंदी में बात करना चाहूँगा/चाहूँगी।`
    : `Namaste, I would like to know more about ${topic}.${who ? ` My name is ${who}.` : ''} Please let me know the next step.`;
}
export function whatsappUrl(phone: string, message: string) {
  if (!/^[1-9]\d{6,14}$/.test(phone)) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
