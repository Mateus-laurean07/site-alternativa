$src = 'C:\Users\mateu\OneDrive\Documentos\Meus Projetos Naveo\Site Alternatica Cochos e Bebedouros\Linha de Produtos\Bovinos\Protecocho'
$hid = 'C:\Users\mateu\OneDrive\Documentos\Meus Projetos Naveo\Site Alternatica Cochos e Bebedouros\Linha de Produtos\Bovinos\Hidramax'
$hero = 'C:\Users\mateu\OneDrive\Documentos\Meus Projetos Naveo\Site Alternatica Cochos e Bebedouros\site-alternativa\public\images\hero'

Copy-Item (Join-Path $src 'Protecocho 200 com bois ao redor.png') (Join-Path $hero 'hero-1.jpg') -Force
Copy-Item (Join-Path $src 'Protecocho 500 com Bois.png') (Join-Path $hero 'hero-2.jpg') -Force
Copy-Item (Join-Path $hid 'Hidramax na terrra.png') (Join-Path $hero 'hero-3.jpg') -Force

Write-Host "Hero OK!"
