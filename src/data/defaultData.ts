import { CustomConfig, RomanticMessage } from '../types';

import img1 from '../assets/images/story_1.jpg';
import img2 from '../assets/images/story_2.jpg';
import img3 from '../assets/images/story_3.jpg';
import img4 from '../assets/images/story_4.jpg';
import img5 from '../assets/images/story_5.jpg';
import imgCorinthians from '../assets/images/story_corinthians.jpg';

export const DEFAULT_MESSAGES: RomanticMessage[] = [
  {
    id: 1,
    title: '1 - O Início de Tudo',
    subtitle: 'Nosso encontro no Conex 💕',
    text: 'Acho muita coincidência a gente ter se encontrado no Conex. Eu não queria ir, nem você, e por incrível que pareça foi um dos meus melhores dias. Porque encontrei você lá. No começo, quando a gente se viu e conversou no Conex, eu sabia por algum motivo que você ia ficar apaixonada por mim kk. Então fui conversando com você já sabendo. 💕',
    quote: 'Por incrível que pareça foi um dos meus melhores dias. Porque encontrei você lá.',
    imageUrl: img4,
    imageAlt: 'Foto do Conex ou de um encontro inesperado',
  },
  {
    id: 2,
    title: '2 - Se Conhecendo',
    subtitle: 'Para Todos os Garotos que Já Amei ✨',
    text: 'Quanto mais a gente conversava, mais eu queria saber de você. Seus gostos, sua fé, seus sonhos. E fui percebendo que você não era qualquer pessoa, era alguém diferente de tudo que eu já tinha visto. ❤️',
    quote: 'Eu sabia por algum motivo que você ia ficar apaixonada por mim... kk',
    imageUrl: img5,
    imageAlt: 'Cena de Para Todos os Garotos que Já Amei',
  },
  {
    id: 3,
    title: '3 - Falei Besteira',
    subtitle: 'Beleza Verdadeira 💙',
    text: 'Falei sobre castidade sem nem saber o que era, e quase perdi você por causa dessa bobeira. Foi aí que percebi: quando você quase perde algo importante é que entende o quanto aquilo é precioso. E você é a coisa mais preciosa que eu poderia perder. 💙',
    quote: 'E você é a coisa mais preciosa que eu poderia perder.',
    imageUrl: img3,
    imageAlt: 'Cena de Beleza Verdadeira',
    imagePosition: 'center 25%',
  },
  {
    id: 4,
    title: '4 - A Fé que Nos Une',
    subtitle: '1 Coríntios 13 📖✨',
    text: 'Você me cobrava oração, me cobrava Bíblia, me cobrava crescer. E eu ia crescendo sem perceber, não só na fé, mas em você. A gente falava de futuro, de faculdade, de casamento como se fosse a coisa mais natural. E talvez seja né, porque quando a pessoa é certa tudo faz sentido. ❤️🔥',
    quote: 'Quem ama nunca desiste, porém suporta tudo com fé, esperança e paciência',
    imageUrl: imgCorinthians,
    imageAlt: '1 Coríntios 13 - A Fé que Nos Une',
    imagePosition: 'center center',
  },
  {
    id: 5,
    title: '5 - Quase Perdi Você',
    subtitle: 'Segurando o que é precioso 💖',
    text: 'Quando eu disse "foi legal enquanto durou" eu tava mentindo pra mim mesmo. Nada ia ser legal sem você. Quando você mandou "adeus" meu coração afundou. Mas quando eu joguei aquele "e eu pensando que ia falar algo depois do meu tchau"... era porque eu precisava de você de volta. ❤️🩹',
    quote: 'Era porque eu precisava de você de volta...',
    imageUrl: img1,
    imageAlt: 'A garota das minhas orações',
    imagePosition: 'center 52%',
  },
  {
    id: 6,
    title: '6 - A Garota das minhas Orações',
    subtitle: 'Nossa história escrita por Ele 🙏',
    text: 'Quando briguei com a menina que conversava antes, fiz uma oração pedindo a Deus que me desse uma garota do meu estilo: alguém que gostasse de livros, de filmes e séries, que pensasse parecido comigo, que seguisse o mesmo caminho. E depois de um tempo... você apareceu. Acho tão lindo a gente ter se apaixonado um pelo outro do jeito que aconteceu. Você é a primeira garota com quem sinto isso de verdade, e você me disse que eu também sou o primeiro pra você. Adoro aquelas histórias de casais que se encontraram na adolescência e construíram algo bonito juntos. Sempre achei especial demais. **Eu queria poder contar essa história com você.** ❤️✏️',
    imageUrl: img2,
    imageAlt: 'Cena de My Hero Academia / Segurar o que é precioso',
    imagePosition: 'center 60%',
  },
];

export const DEFAULT_CONFIG: CustomConfig = {
  recipientName: 'Sarah Luna',
  senderName: 'Christian',
  relationshipDate: '2024-01-01',
  mainQuestion: 'Conquistei você? ❤️',
  messages: DEFAULT_MESSAGES,
};

export const FUNNY_NO_MESSAGES = [
  "Ops! O botão fugiu! 😜",
  "Tem certeza? Tenta de novo! 😉",
  "Não vale fugir do meu amor! 💕",
  "O botão Sim tá bem mais bonito, vai! 🥰",
  "Acho que seu dedo escorregou... 🤭",
  "Erro 404: Opção Não indisponível! 🚫💖",
  "Eu sei que você quer clicar em SIM! 😜",
  "Última chance de aceitar o óbvio! 💕",
];
