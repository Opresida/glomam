// Dados centralizados do evento "Chá das Acácias — 1ª Edição 2026" (Damas da Fraternidade).
// Fonte única de verdade para a landing /damasdafraternidade.

export const evento = {
  titulo: 'Chá das Acácias',
  edicao: '1ª Edição · 2026',
  subtitulo: 'Mulheres que inspiram e fortalecem a família e a maçonaria',

  data: {
    extenso: '15 de agosto de 2026',
    diaSemana: 'Sábado',
    horario: '16h às 19h',
  },

  local: {
    nome: 'Salão de Festas',
    condominio: 'Cond. Jardim das Américas',
    logradouro: 'Av. Coronel Teixeira, 3594',
    bairroCidade: 'Ponta Negra · Manaus / AM',
    // Endereço plano para builders de rota (Waze/Uber/Apple)
    enderecoCompleto: 'Condomínio Jardim das Américas, Av. Coronel Teixeira, 3594, Ponta Negra, Manaus, AM, Brasil',
    mapaUrl:
      'https://www.google.com/maps/search/?api=1&query=Condom%C3%ADnio+Jardim+das+Am%C3%A9ricas+Av+Coronel+Teixeira+3594+Ponta+Negra+Manaus+AM',
  },

  passaporte: {
    valor: 100,
    valorFormatado: 'R$ 100,00',
  },

  // Pagamento PIX (chave e recebedor para o BR Code)
  pix: {
    chave: 'damasdafraternidadeglomam@gmail.com',
    nomeRecebedor: 'DAMAS DA FRATERNIDADE',
    cidade: 'MANAUS',
  },

  // Placeholders — trocar pelos valores reais (ver TODO.md)
  whatsapp: {
    // Número para envio de comprovante (placeholder)
    numeroComprovante: '559200000000',
    // Link de convite do grupo (placeholder)
    grupoUrl: 'https://chat.whatsapp.com/PLACEHOLDER',
  },

  instagram: '@damasdafraternidade',
};

// Texto-convite institucional exibido na landing.
export const convite = [
  'Sua presença é de fundamental importância e indispensável para o fortalecimento das Damas da Fraternidade e da GLOMAM. Cada participação representa um gesto de união, compromisso e dedicação aos nossos princípios, contribuindo para estreitar os laços de amizade, promover o crescimento da nossa instituição e fortalecer o trabalho desenvolvido por todas.',
  'Contamos com sua presença para que, juntas, possamos continuar construindo uma Fraternidade cada vez mais forte, unida e atuante.',
  'Será uma grande alegria contar com sua participação. Sua presença fará toda a diferença!',
];
