/**
 * Coordenadas geográficas das Lojas filiadas à GLOMAM.
 *
 * Estratégia:
 * - Lojas do interior: coordenadas do CENTRO do município (alta confiança).
 *   Suficiente para mostrar "tem Loja nesta cidade" no mapa estadual.
 * - Lojas de Manaus: coordenadas do BAIRRO/CONDOMÍNIO (média confiança).
 *   Várias Lojas compartilham endereço (condomínios maçônicos), então o pino
 *   pode representar múltiplas Lojas no mesmo ponto.
 *
 * Campo `confidence`:
 * - 'high':   coordenada validada (centros municipais conhecidos)
 * - 'medium': aproximação por bairro/condomínio (precisa revisão visual)
 * - 'low':    fallback, precisa correção manual
 *
 * Para corrigir manualmente: abrir Google Maps no endereço, clicar com o botão
 * direito, copiar o par lat/lng, e atualizar a entrada correspondente abaixo.
 */

import { lojas } from './lojas.js';

// ── CIDADES DO INTERIOR — centros municipais (alta confiança) ──
export const cidadesCoords = {
  'Anamã':                       { lat: -3.5836, lng: -61.4042 },
  'Anori':                       { lat: -3.7728, lng: -61.6447 },
  'Autazes':                     { lat: -3.5797, lng: -59.1304 },
  'Benjamin Constant':           { lat: -4.3836, lng: -70.0319 },
  'Beruri':                      { lat: -3.8978, lng: -61.3736 },
  'Boca do Acre':                { lat: -8.7519, lng: -67.3992 },
  'Borba':                       { lat: -4.3886, lng: -59.5947 },
  'Canutama':                    { lat: -6.5347, lng: -64.3833 },
  'Carauari':                    { lat: -4.8825, lng: -66.8975 },
  'Coari':                       { lat: -4.0853, lng: -63.1408 },
  'Codajás':                     { lat: -3.8358, lng: -62.0567 },
  'Eirunepé':                    { lat: -6.6608, lng: -69.8744 },
  'Envira':                      { lat: -7.1772, lng: -70.0214 },
  'Fonte Boa':                   { lat: -2.5125, lng: -66.0894 },
  'Iranduba':                    { lat: -3.2828, lng: -60.1900 },
  'Itacoatiara':                 { lat: -3.1431, lng: -58.4444 },
  'Lábrea':                      { lat: -7.2578, lng: -64.7967 },
  'Manacapuru':                  { lat: -3.2997, lng: -60.6203 },
  'Manaus':                      { lat: -3.1190, lng: -60.0217 },
  'Maraã':                       { lat: -1.8628, lng: -65.5658 },
  'Maués':                       { lat: -3.3833, lng: -57.7233 },
  'Novo Airão':                  { lat: -2.6336, lng: -60.9444 },
  'Novo Aripuanã':               { lat: -5.1267, lng: -60.3786 },
  'Parintins':                   { lat: -2.6275, lng: -56.7375 },
  'Presidente Figueiredo':       { lat: -2.0331, lng: -60.0258 },
  'São Gabriel da Cachoeira':    { lat: -0.1306, lng: -67.0892 },
  'Tabatinga':                   { lat: -4.2526, lng: -69.9381 },
  'Tefé':                        { lat: -3.3550, lng: -64.7111 },
};

// ── ENDEREÇOS DE MANAUS — por número da Loja (média confiança, revisão visual recomendada) ──
// As coordenadas abaixo apontam para bairros/condomínios. Lojas que compartilham
// endereço físico aparecem agrupadas no mapa (mesmo ponto).
export const manausLojaCoords = {
  // Centro — Av. Eduardo Ribeiro e arredores
  1:  { lat: -3.1322, lng: -60.0262, confidence: 'medium' },  // Rua Bernardo Ramos, 118
  2:  { lat: -3.1310, lng: -60.0245, confidence: 'medium' },  // Rua Leovegildo Coelho, 294
  3:  { lat: -3.1318, lng: -60.0271, confidence: 'medium' },  // Rua Dr. Almínio, 91
  4:  { lat: -3.1323, lng: -60.0260, confidence: 'medium' },  // Rua Bernardo Ramos, 134
  6:  { lat: -3.1326, lng: -60.0181, confidence: 'medium' },  // Av. Sete de Setembro, 1832

  // Adrianópolis — Condomínio Delta (Av. Mário Ipiranga Monteiro, 1686/1689)
  7:  { lat: -3.0992, lng: -60.0102, confidence: 'medium' },  // Arkbal
  9:  { lat: -3.0992, lng: -60.0102, confidence: 'medium' },  // Deus, Lei e Perseverança
  10: { lat: -3.0992, lng: -60.0102, confidence: 'medium' },  // Fraternidade Amazonense
  11: { lat: -3.0992, lng: -60.0102, confidence: 'medium' },  // Esperança e Harmonia
  28: { lat: -3.0992, lng: -60.0102, confidence: 'medium' },  // GBLS Manaus

  // Educandos
  21: { lat: -3.1408, lng: -60.0119, confidence: 'medium' },  // Rua Inácio Guimarães, 142

  // Parque Dez — Condomínio Rio Solimões (Rua Elin Virtonen, 104)
  24: { lat: -3.0775, lng: -59.9881, confidence: 'medium' },  // Rio Solimões
  33: { lat: -3.0775, lng: -59.9881, confidence: 'medium' },  // Encontro das Águas
  41: { lat: -3.0775, lng: -59.9881, confidence: 'medium' },  // 10 de Julho
  43: { lat: -3.0775, lng: -59.9881, confidence: 'medium' },  // Liberdade e Progresso
  46: { lat: -3.0775, lng: -59.9881, confidence: 'medium' },  // Rei Davi

  // Parque Dez de Novembro
  37: { lat: -3.0742, lng: -59.9933, confidence: 'medium' },  // Rua Mozart Guarnieri

  // Cidade Nova II
  39: { lat: -3.0419, lng: -59.9558, confidence: 'medium' },  // Av. Camapuã, 1016

  // Planalto — Condomínio Maçônico Estrela da Alvorada (Rua Praga, 17)
  40: { lat: -3.0822, lng: -60.0344, confidence: 'medium' },  // Estrela da Alvorada
  44: { lat: -3.0822, lng: -60.0344, confidence: 'medium' },  // Rei Salomão
  47: { lat: -3.0822, lng: -60.0344, confidence: 'medium' },  // Pátria Amada
};

/**
 * Retorna { lat, lng } para uma Loja.
 * Para Lojas em Manaus, usa coordenadas específicas do endereço.
 * Para o interior, usa o centro do município.
 */
export function getLojaCoords(loja) {
  if (loja.oriente === 'Manaus') {
    const c = manausLojaCoords[loja.numero];
    if (c) return { lat: c.lat, lng: c.lng };
    return cidadesCoords['Manaus']; // fallback centro de Manaus
  }
  return cidadesCoords[loja.oriente] || null;
}

/** Filtra Lojas que ficam em Manaus. */
export function lojasManaus() {
  return lojas.filter(l => l.oriente === 'Manaus');
}

/** Filtra Lojas que ficam fora de Manaus (interior do Amazonas). */
export function lojasInterior() {
  return lojas.filter(l => l.oriente !== 'Manaus');
}

/**
 * Agrupa Lojas por coordenada (mesmo endereço físico).
 * Útil pra renderizar 1 pino por endereço com lista de Lojas no popup.
 */
export function lojasAgrupadasPorCoord(lojasList) {
  const mapa = new Map();
  for (const loja of lojasList) {
    const coord = getLojaCoords(loja);
    if (!coord) continue;
    const key = `${coord.lat.toFixed(4)},${coord.lng.toFixed(4)}`;
    if (!mapa.has(key)) {
      mapa.set(key, { coord, lojas: [] });
    }
    mapa.get(key).lojas.push(loja);
  }
  return Array.from(mapa.values());
}
