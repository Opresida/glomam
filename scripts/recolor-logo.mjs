import { readFileSync, writeFileSync } from 'fs';

const svgPath = process.argv[2] || '../LOGO GLOMAM.svg';
const outputPath = process.argv[3] || '../public/logo-glomam-slate.svg';

let svg = readFileSync(svgPath, 'utf8');

// 1) Tornar o fundo do círculo transparente (remover fill azul)
svg = svg.replaceAll('#2e2f98', 'none');

// 2) Modificar feColorMatrix que renderiza branco → renderizar #1a2332
// #1a2332: r=26/255≈0.102, g=35/255≈0.137, b=50/255≈0.196
// Matrix original mapeia tudo para branco (1,1,1)
// Substituir para mapear para slate (0.102, 0.137, 0.196)
const whiteMatrix = '0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0';
const slateMatrix = '0 0 0 0 0.102 0 0 0 0 0.137 0 0 0 0 0.196 0 0 0 1 0';

const whiteLumMatrix = '0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.2126 0.7152 0.0722 0 0';
const slateLumMatrix = '0 0 0 0 0.102 0 0 0 0 0.137 0 0 0 0 0.196 0.2126 0.7152 0.0722 0 0';

svg = svg.replaceAll(whiteMatrix, slateMatrix);
svg = svg.replaceAll(whiteLumMatrix, slateLumMatrix);

writeFileSync(outputPath, svg, 'utf8');
console.log('Variante slate criada:', outputPath);

// 3) Criar versão com fundo azul mantido e símbolo em slate
let svg2 = readFileSync(svgPath, 'utf8');
svg2 = svg2.replaceAll(whiteMatrix, slateMatrix);
svg2 = svg2.replaceAll(whiteLumMatrix, slateLumMatrix);
writeFileSync(outputPath.replace('-slate.', '-blue-slate.'), svg2, 'utf8');
console.log('Variante blue+slate criada:', outputPath.replace('-slate.', '-blue-slate.'));

// 4) Criar versão gold (fundo transparente, símbolo em gold)
let svg3 = readFileSync(svgPath, 'utf8');
svg3 = svg3.replaceAll('#2e2f98', 'none');
// #b4975a: r=180/255≈0.706, g=151/255≈0.592, b=90/255≈0.353
const goldMatrix = '0 0 0 0 0.706 0 0 0 0 0.592 0 0 0 0 0.353 0 0 0 1 0';
const goldLumMatrix = '0 0 0 0 0.706 0 0 0 0 0.592 0 0 0 0 0.353 0.2126 0.7152 0.0722 0 0';
svg3 = svg3.replaceAll(whiteMatrix, goldMatrix);
svg3 = svg3.replaceAll(whiteLumMatrix, goldLumMatrix);
writeFileSync(outputPath.replace('-slate.', '-gold.'), svg3, 'utf8');
console.log('Variante gold criada:', outputPath.replace('-slate.', '-gold.'));
