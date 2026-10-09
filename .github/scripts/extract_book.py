"""Temporary: extract page text, page renders and embedded images from a textbook PDF."""
import io
import json
import os
import sys

import fitz  # PyMuPDF
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
os.makedirs(f'{out}/pages', exist_ok=True)
os.makedirs(f'{out}/images', exist_ok=True)

doc = fitz.open(src)
texts, seen = [], set()
for i, page in enumerate(doc, 1):
    texts.append({'page': i, 'text': page.get_text('text')})
    page.get_pixmap(dpi=90).pil_save(f'{out}/pages/p{i:03d}.jpg', quality=70)
    for n, img in enumerate(page.get_images(full=True), 1):
        xref = img[0]
        if xref in seen:
            continue
        seen.add(xref)
        try:
            im = Image.open(io.BytesIO(doc.extract_image(xref)['image']))
        except Exception:
            continue
        if im.width < 250 or im.height < 150:
            continue
        im = im.convert('RGB')
        im.thumbnail((1400, 1400))
        im.save(f'{out}/images/p{i:03d}-{n}.jpg', quality=82)

with open(f'{out}/text.json', 'w', encoding='utf8') as f:
    json.dump(texts, f, ensure_ascii=False, indent=1)
print(src, doc.page_count, 'pages,', len(os.listdir(f'{out}/images')), 'images')
