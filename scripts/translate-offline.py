"""Generate static translation drafts with locally downloaded Argos models.
Usage: python scripts/translate-offline.py /path/to/argos-model-directories
Requires ctranslate2 + sentencepiece in a separate tooling environment.
No browser/user data or runtime translation requests are involved.
"""
import json, pathlib, sys, re
import ctranslate2, sentencepiece
root=pathlib.Path(__file__).resolve().parents[1]
source=json.loads((root/'public/locales/en.json').read_text())
models=pathlib.Path(sys.argv[1])
keep={'Astro','Vision','AstroVision','Astro Vision','Instagram','WhatsApp','Facebook','Google Maps','Europe/Nicosia','English','Français','Türkçe','Nederlands','Luca Bianchi','Sohaila Al-Mansouri','Sakura Tanaka','Diego Fernández','Katsuro Sato','Pavitra Sharma','@a_s_t_r_o_vision','Ledras 154-154, Nicosia 1011, Cyprus'}
for code in ['fr','el','tr','nl','hi']:
 if not (models/code).exists(): raise FileNotFoundError(f'Missing model directory: {models/code}')
 package=next((models/code).iterdir())
 sp=sentencepiece.SentencePieceProcessor(model_file=str(package/'sentencepiece.model'))
 translator=ctranslate2.Translator(str(package/'model'),device='cpu',compute_type='int8',intra_threads=2)
 out=root/f'public/locales/{code}.json'
 result=json.loads(out.read_text()) if out.exists() else {}
 keys=[key for key in source if key not in result]
 for start in range(0,len(keys),16):
  batch=keys[start:start+16]
  segments=[]
  lengths=[]
  for key in batch:
   # These models expect sentences rather than multi-sentence paragraphs.
   sentences=re.split(r'(?<=[.!?])\s+(?=[A-Z])',key)
   lengths.append(len(sentences))
   segments.extend(sentence.capitalize() if sentence.isupper() else sentence for sentence in sentences)
  translations=translator.translate_batch([sp.encode(s,out_type=str) for s in segments],beam_size=3,max_decoding_length=512,no_repeat_ngram_size=3)
  offset=0
  for key,count in zip(batch,lengths):
   text=' '.join(''.join(item.hypotheses[0]).replace('▁',' ').strip() for item in translations[offset:offset+count])
   offset+=count
   if not text or '<unk>' in text: raise ValueError(f'Invalid translation; add a reviewed override: {code} {key}')
   text=re.sub(r'\bAstro\s*Vision\b','AstroVision',text,flags=re.I)
   result[key]=key if key in keep else text
  temporary=out.with_suffix('.tmp')
  temporary.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
  temporary.replace(out)
  print(code,start+len(batch),'/',len(keys),flush=True)
 del translator
 print(code,'complete',flush=True)
