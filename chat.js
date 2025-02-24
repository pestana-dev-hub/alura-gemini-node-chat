import { chat, funcoes } from './inicializaChat.js';
import { incorporarDocumentos, incorporarPergunta } from './embedding.js';

// Transforma o texto em um modelo vetorial
const documentos = await incorporarDocumentos(
    ["A política de cancelamento é de 30 dias antes da viagem, caso contrário, não faremos o reembolso",
    "Viagem para a Disney, 6 dias, R$ 20.000,00 - Viagem para a Disney, 10 dias, R$ 25.000,00"
    ]
);

export async function executaChat(mensagem) {
  console.log("Tamanho do histórico: " + (await chat.getHistory()).length);

  // Antes de enviar a mensagem para a api é feito uma consulta nos arquivos de referência em busca de similaridades entre a mensgaem do usuário e os arquivos. Isso é feito para orientar a resposta gerada pela ia.
  let doc = await incorporarPergunta(mensagem, documentos);
  let prompt = mensagem + "talvez esse trecho te ajude a formular a resposta" + doc.text
  const result = await chat.sendMessage(prompt);
  const response = await result.response;

  const content = response.candidates[0].content;

  const fc = content.parts[0].functionCall;
  const text = content.parts.map(({ text }) => text).join("");
  console.log(text);
  console.log(fc);

  if (fc) {
    const { name, args } = fc;
    const fn = funcoes[name];
    if (!fn) {
      throw new Error(`Unknown function "${name}"`);
    }
    const fr = {
      functionResponse: {
        name,
        response: {
          name,
          content: funcoes[name](args),
        }
      },
    }

    console.log(fr)

    const request2 = [fr];
    const response2 = await chat.sendMessage(request2);
    const result2 = response2.response;
    return result2.text();
  } else if (text) {
    return text;
  }

}