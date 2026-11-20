UPDATE producto
SET imagen_url = CASE nombre
    WHEN 'Guitarra eléctrica Stratocaster' THEN 'https://audiomusicacl.vtexassets.com/arquivos/ids/191443/1-guitarra-electrica-fender-squier-sonic-stratocaster-hss-tahitian-coral-1113313.jpg?v=638525238954070000'
    WHEN 'Guitarra acústica F310' THEN 'https://i5.walmartimages.cl/asr/a1774d9f-e686-4dec-b03b-5d30e6736a1f.33ddf2d8b210f44efdbf39ea93665da8.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff'
    WHEN 'Guitarra eléctrica RG421' THEN 'https://musicworks.cl/wp-content/uploads/2025/11/2-15-600x720-1.jpg'
    WHEN 'Piano digital FP-30X' THEN 'https://kraftmusic.com/cdn/shop/files/ROL-FP30X_Style-Shots-13.jpg?v=1770225759&width=3000'
    WHEN 'Teclado PSR-E373' THEN 'https://es.yamaha.com/es/files/PSR_E463_tcm121-1687045.jpg?impolicy=resize&imwid=735&imhei=735'
    WHEN 'Batería electrónica TD-1K' THEN 'https://musicbox.com.co/wp-content/uploads/2022/06/6033467-1-768x743.jpg'
    WHEN 'Micrófono SM58' THEN 'https://www.blupointmusic.cl/wp-content/uploads/2026/04/Shure-MV7X-Microfono-Dinamico-3.webp'
    WHEN 'Micrófono SM57' THEN 'https://www.tiendavisionbroadcast.co/wp-content/uploads/2022/10/shure-super-55.webp'
    WHEN 'Set de cuerdas para guitarra' THEN 'https://rockbox.es/40287-home_default/ernie-ball-eb2006-earthwood-bronze-extra-light-2006-1050.jpg'
    WHEN 'Correa para guitarra' THEN 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80'
    ELSE imagen_url
END
WHERE (imagen_url IS NULL OR imagen_url LIKE 'https://placehold.co/%')
  AND nombre IN (
    'Guitarra eléctrica Stratocaster',
    'Guitarra acústica F310',
    'Guitarra eléctrica RG421',
    'Piano digital FP-30X',
    'Teclado PSR-E373',
    'Batería electrónica TD-1K',
    'Micrófono SM58',
    'Micrófono SM57',
    'Set de cuerdas para guitarra',
    'Correa para guitarra'
  );