/**
 * Diretório central de fotos de Irmãos da GLOMAM.
 * Use findPhoto(nome) para recuperar a URL conforme aparece em outras seções.
 *
 * O matching é tolerante a variações ortográficas comuns (Lousmar/Louismar,
 * Ericlenio/Ericlênio) e ignora acentos, ordem e tokens intermediários.
 */

export const photoDirectory = [
  // Governantes
  { name: 'Tufi Salim Jorge Filho', photo: 'https://i.imgur.com/DmqA6an.png' },
  { name: 'Louismar de Matos Bonates', aliases: ['Lousmar Bonates'], photo: 'https://i.imgur.com/yMM6r3J.png' },
  { name: 'José Nasser', photo: 'https://i.imgur.com/a2bVjCf.png' },

  // Grandes Secretários (carrossel)
  { name: 'Arthur Sales Gesta de Melo', aliases: ['Arthur Sales de Gesta de Melo'], photo: 'https://i.imgur.com/KDSWv0p.png' },
  { name: 'Daniel Txa-Iá A. Amâncio', photo: 'https://i.imgur.com/JsYyh6o.png' },
  { name: 'Denner Fadoul', photo: 'https://i.imgur.com/aVECNDU.png' },
  { name: 'Eduardo Toledo da Silva', photo: 'https://i.imgur.com/RhxrvMj.png' },
  { name: 'Ericlênio Faustino de Oliveira Castro', aliases: ['Ericlenio F. de Oliveira Castro'], photo: 'https://i.imgur.com/mgR6oKp.png' },
  { name: 'Gabriel Melgueiro Neto', photo: 'https://i.imgur.com/BK3W3PM.png' },
  { name: 'José Antonio Costa Filho', aliases: ['Jose Antonio Costa Filho'], photo: 'https://i.imgur.com/edK0jBY.png' },
  { name: 'José Ribamar Campelo Anibal', aliases: ['Jose Ribamar Campelo Anibal'], photo: 'https://i.imgur.com/6FWy862.png' },
  { name: 'Leonardo Câmara', photo: 'https://i.imgur.com/oT1Kvem.png' },
  { name: 'Marcos Carvalho Sarquis', photo: 'https://i.imgur.com/LscWXIJ.png' },
  { name: 'Paulo da Silva R. de Almeida Filho', photo: 'https://i.imgur.com/GUXxYmC.png' },
  { name: 'Rafael Normando Miranda', photo: 'https://i.imgur.com/BajoV1h.png' },
  { name: 'Thiago de Souza Brandão', photo: 'https://i.imgur.com/AUU4x3w.png' },
  { name: 'Valter M. da Silveira Jr', photo: 'https://i.imgur.com/bppgpAw.png' },
  { name: 'Zilmar Moreira de Souza', photo: 'https://i.imgur.com/XCLpiPL.png' },
  { name: 'Luiz Filipi Batista Cardozo', aliases: ['Luiz Filipe B. Cardozo'], photo: 'https://i.imgur.com/vppcUiM.png' },
  { name: 'Julio Tomé Neto', photo: 'https://i.imgur.com/IuL19JA.png' },
  { name: 'Yuri Simon Salim J. Assel', photo: 'https://i.imgur.com/4vTqmNX.png' },
  { name: 'Marcos Túlio Tomé Catunda', photo: 'https://i.imgur.com/NwIlEIq.png' },
  { name: 'Samuel Marques da Silva', photo: 'https://i.imgur.com/EQGfOkd.png' },
  { name: 'Rennalt Lessa de Freitas', photo: 'https://i.imgur.com/o3LlRqB.png' },
  { name: 'Manoel Bernado Matos', photo: 'https://i.imgur.com/OFOCaKv.png' },
  { name: 'Wandecy Gomes Campos', photo: 'https://i.imgur.com/NSk9VTP.png' },
  { name: 'André L. Souza', photo: 'https://i.imgur.com/iOhdKtU.png' },
  { name: 'Raimundo Bentes de Almeida', photo: 'https://i.imgur.com/4acXfeO.png' },
  { name: 'Eduardo Akira Sakita', photo: 'https://i.imgur.com/Eqt05Io.png' },
  { name: 'João Bosco Pinto Rocha', photo: 'https://i.imgur.com/GrpwsZE.png' },
  { name: 'Éder Willian Lisboa Santiago', photo: 'https://i.imgur.com/5I2xorA.png' },
  { name: 'José Jaborandy Neto', photo: 'https://i.imgur.com/5anxwJ1.png' },
  { name: 'Jocélio B. Cardoso', photo: 'https://i.imgur.com/cp8Qw3m.png' },

  // Judiciário
  { name: 'Carlos Alexandre Baracho Valente', photo: 'https://i.imgur.com/Z1S1zZG.jpeg' },
  { name: 'Euler Carlos de Souza Cordeiro', photo: 'https://i.imgur.com/k4CQIgy.jpeg' },
  { name: 'Jocione dos Santos Souza Júnior', photo: 'https://i.imgur.com/hjTD0xL.jpeg' },
  { name: 'André de Souza Oliveira', photo: 'https://i.imgur.com/sNhTdtQ.png' },
  { name: 'Adilson Dantas Maciel', photo: 'https://i.imgur.com/IP9cCN4.jpeg' },
  { name: 'Fábio Lopes Alfaia', photo: 'https://i.imgur.com/oA3d3Kx.jpeg' },
  { name: 'Renato de Souza Pinto', photo: 'https://i.imgur.com/0hhU5yc.jpeg' },
  { name: 'Imbergman Maia Litaiff', photo: 'https://i.imgur.com/rHLj2Jy.jpeg' },
];

/** Normaliza: minúsculas, sem acentos, apenas letras/números e espaços. */
function normalize(s) {
  return (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Tokens "significativos" — ignora stop-words de sobrenome que comuns (de, da, do, dos, das). */
function tokens(s) {
  const STOP = new Set(['de', 'da', 'do', 'dos', 'das', 'e', 'jr', 'filho', 'neto']);
  return normalize(s).split(' ').filter(t => t.length > 1 && !STOP.has(t));
}

/**
 * Busca uma foto no diretório por nome, com matching tolerante.
 * Retorna a URL ou null se não encontrar.
 */
export function findPhoto(nome) {
  if (!nome) return null;
  const target = tokens(nome);
  if (target.length === 0) return null;

  let best = { entry: null, score: 0 };

  for (const entry of photoDirectory) {
    const candidates = [entry.name, ...(entry.aliases || [])];
    for (const c of candidates) {
      const cand = tokens(c);
      // sobreposição de tokens
      const overlap = target.filter(t => cand.includes(t)).length;
      // bônus se primeiro e último token batem (nome + sobrenome principal)
      const firstMatch = cand[0] === target[0] ? 1 : 0;
      const lastMatch = cand[cand.length - 1] === target[target.length - 1] ? 1 : 0;
      const score = overlap + firstMatch + lastMatch;
      // exige ao menos 2 tokens em comum para evitar falso-positivo
      if (overlap >= 2 && score > best.score) {
        best = { entry, score };
      }
    }
  }

  return best.entry ? best.entry.photo : null;
}
