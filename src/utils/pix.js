// Gerador de "PIX Copia e Cola" (BR Code estático — padrão EMV do Banco Central).
// Sem API/backend: monta o payload no front e renderiza como QR Code.
// Referência: Manual de Padrões para Iniciação do Pix (EMV® QRCPS-MPM).

// Monta um campo TLV (ID + tamanho com 2 dígitos + valor).
function tlv(id, valor) {
  const len = String(valor.length).padStart(2, '0');
  return `${id}${len}${valor}`;
}

// CRC16/CCITT-FALSE (polinômio 0x1021, inicial 0xFFFF) — exigido pelo campo 63.
function crc16(str) {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Gera o payload "copia e cola" de um PIX estático.
 * @param {object} p
 * @param {string} p.chave     Chave PIX (email/telefone/cpf/aleatória)
 * @param {string} p.nome      Nome do recebedor (máx. 25 chars, sem acento)
 * @param {string} p.cidade    Cidade do recebedor (máx. 15 chars, sem acento)
 * @param {number|string} p.valor  Valor em reais (ex.: 100 ou "100.00")
 * @param {string} [p.txid]    Identificador da transação (default "***")
 * @returns {string} payload EMV pronto para virar QR Code / copiar
 */
export function gerarPixPayload({ chave, nome, cidade, valor, txid = '***' }) {
  const valorStr = Number(valor).toFixed(2); // "100.00"
  const nomeLimpo = String(nome).slice(0, 25);
  const cidadeLimpa = String(cidade).slice(0, 15);

  const merchantAccount = tlv('26', tlv('00', 'BR.GOV.BCB.PIX') + tlv('01', chave));

  const payloadSemCrc =
    tlv('00', '01') + // Payload Format Indicator
    merchantAccount + // Merchant Account Information — PIX
    tlv('52', '0000') + // Merchant Category Code
    tlv('53', '986') + // Moeda: BRL
    tlv('54', valorStr) + // Valor da transação
    tlv('58', 'BR') + // País
    tlv('59', nomeLimpo) + // Nome do recebedor
    tlv('60', cidadeLimpa) + // Cidade do recebedor
    tlv('62', tlv('05', txid)) + // Additional Data — txid
    '6304'; // ID + tamanho do CRC (o valor vem a seguir)

  return payloadSemCrc + crc16(payloadSemCrc);
}
