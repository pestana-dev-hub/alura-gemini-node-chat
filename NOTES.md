# Notas

## 1. Criar uma conversa

Documentação: https://ai.google.dev/gemini-api/docs/text-generation?hl=pt-br&lang=node#chat

## 2. Function calling

Function calling, no contexto da API Gemini, refere-se à capacidade de definir funções personalizadas que podem ser chamadas pela IA quando determinadas palavras ou frases são detectadas nas interações do usuário. Isso permite que o assistente virtual execute ações específicas, como calcular taxas de juros ou fornecer informações personalizadas, com base nas solicitações do usuário. Ao implementar essas funções, você pode garantir que a IA responda de maneira mais precisa e relevante, melhorando a experiência do usuário.

Documentação: https://ai.google.dev/gemini-api/docs/function-calling?hl=pt-br

Exemplos de códigos com a utilização dos recursos do Gemini: https://github.com/google-gemini/cookbook

## 3. Embeddings

Técnica de processamento de linguagem natural que converte texto em um modelo vetorial. Esse modelo vetorial define a localização de cada palavra em um espaço e palavras com significados semelhantes ficam próximas umas das outras. Quando o usuário faz uma pergunta é feito uma busca nesse modelo vetorial para identificar similaridades entre palavras que constam na pergunta e o texto de referência que será consultado para criar a resposta adequada.
Fluxo: Usuário faz uma pergunta > Uma função retorna o arquivo que tem o conteúdo com significado mais próximo da pergunta feita. > É criado um prompt que contém a pergunta do usuário mais o conteúdo de referência para orientar a geração da resposta.
