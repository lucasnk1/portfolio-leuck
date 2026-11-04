import type { Language } from './i18n'

/**
 * "Cérebro" do Nube: respostas locais por palavra-chave, sem servidor.
 * Para mudar o que o Nube sabe, edite os textos abaixo.
 *
 * Cada resposta existe em PT e EN com a MESMA posição, assim o chat inteiro
 * troca de idioma quando o visitante muda a língua do site.
 *
 * Formatação aceita nas respostas:
 *   • linha começando com "• "  → tópico
 *   **texto**                   → negrito
 *   [rótulo](https://...)       → link
 */

export interface NubeReply {
  text: string
  /** Botão opcional que acompanha a resposta */
  action?: { label: string; scrollTo?: string; href?: string; send?: 'another-joke' }
}

/** Referência a uma resposta, independente do idioma */
export type ReplyRef =
  | { kind: 'greeting' }
  | { kind: 'topic'; topic: number; variant: number }
  | { kind: 'joke'; index: number }
  | { kind: 'fallback'; variant: number }

type Bilingual = { pt: NubeReply; en: NubeReply }

interface Topic {
  id?: 'joke'
  keywords: string[]
  replies: Bilingual[]
}

/* ------------------------------------------------------------------ */
/* Piadas (pares PT/EN)                                                */
/* ------------------------------------------------------------------ */

const JOKES: Array<{ pt: string; en: string }> = [
  {
    pt: 'Por que o cientista de dados foi parar na terapia? 🛋️\n\nEle tinha muitos problemas de **relacionamento**... entre tabelas. 🗃️',
    en: 'Why did the data scientist go to therapy? 🛋️\n\nToo many **relationship** issues... between tables. 🗃️',
  },
  {
    pt: 'Uma query SQL entra num bar, vai até duas mesas e pergunta:\n\n**"Posso dar um JOIN com vocês?"** 🍻',
    en: 'A SQL query walks into a bar, goes up to two tables and asks:\n\n**"Can I JOIN you?"** 🍻',
  },
  {
    pt: 'Existem **10** tipos de pessoas no mundo:\n\n• as que entendem binário\n• e as que não entendem 🤓',
    en: "There are **10** kinds of people in the world:\n\n• those who understand binary\n• and those who don't 🤓",
  },
  {
    pt: 'A esposa do programador pediu: "Amor, compra um leite. E se tiver ovos, traz 6."\n\nEle voltou com **6 leites**. 🥛🥛🥛🥛🥛🥛',
    en: 'A programmer\'s partner says: "Buy a carton of milk, and if they have eggs, get 6."\n\nThey came back with **6 cartons of milk**. 🥛',
  },
  {
    pt: 'Estatístico é aquele que, com a cabeça no forno e os pés no freezer, diz:\n\n**"Na média, tá tudo ótimo."** 🔥🧊',
    en: 'A statistician has their head in the oven and feet in the freezer and says:\n\n**"On average, I feel great."** 🔥🧊',
  },
  {
    pt: 'Sabe por que eu nunca chovo? ☁️\n\nSou uma nuvem de **alta disponibilidade**: 99,9% de uptime.',
    en: "Why do I never rain? ☁️\n\nI'm a **high-availability** cloud: 99.9% uptime.",
  },
  {
    pt: 'Quantos programadores são necessários pra trocar uma lâmpada? 💡\n\n**Nenhum.** É problema de hardware.',
    en: "How many programmers does it take to change a light bulb? 💡\n\n**None.** That's a hardware problem.",
  },
  {
    pt: 'Por que programadores confundem Halloween com Natal? 🎃🎄\n\nPorque **OCT 31 = DEC 25**.',
    en: 'Why do programmers mix up Halloween and Christmas? 🎃🎄\n\nBecause **OCT 31 = DEC 25**.',
  },
  {
    pt: 'Machine Learning é igual adolescente 🤖\n\nVocê passa meses ensinando... e no final ele faz **o que quer**.',
    en: 'Machine Learning is like a teenager 🤖\n\nYou spend months teaching it... and it still does **whatever it wants**.',
  },
  {
    pt: 'Eu ia contar uma piada sobre UDP...\n\nmas talvez você **não receba**. 📡',
    en: 'I was going to tell you a UDP joke...\n\nbut you might **not get it**. 📡',
  },
  {
    pt: 'Pra entender recursão, primeiro você precisa entender recursão. 🔁',
    en: 'To understand recursion, you must first understand recursion. 🔁',
  },
  {
    pt: 'Por que o JavaScript usa óculos? 👓\n\nPorque ele **não consegue C#**.',
    en: "Why do Java developers wear glasses? 👓\n\nBecause they **can't C#**.",
  },
  {
    pt: 'O backend e o frontend saem pra jantar.\n\nO backend **paga a conta** e o frontend **leva o crédito**. 💸',
    en: 'Backend and frontend go out to dinner.\n\nBackend **pays the bill**, frontend **takes the credit**. 💸',
  },
  {
    pt: 'Meu código não tem bugs. 🐛\n\nEle só desenvolve **funcionalidades surpresa** por conta própria.',
    en: 'My code has no bugs. 🐛\n\nIt just develops **surprise features** on its own.',
  },
  {
    pt: '— Funciona na minha máquina!\n— Então tá, vamos **mandar sua máquina pro cliente**. 💻📦',
    en: "— It works on my machine!\n— Great, then we'll **ship your machine to the client**. 💻📦",
  },
  {
    pt: 'Histórico de commits de uma sexta-feira:\n\n• "consertei tudo"\n• "agora sim consertei tudo"\n• "por favor funciona" 🙏',
    en: 'Friday commit history:\n\n• "fixed everything"\n• "ok NOW fixed everything"\n• "please work" 🙏',
  },
  {
    pt: 'A minha IA me classificou como 98% legal. 📈\n\nOs outros 2% ela marcou como **outlier**.',
    en: 'My AI rated me 98% cool. 📈\n\nThe other 2% it flagged as an **outlier**.',
  },
  {
    pt: 'Por que a planilha foi ao psicólogo? 📗\n\nEla tinha muitas **células** com problema.',
    en: 'Why did the spreadsheet see a therapist? 📗\n\nIt had too many **cells** with issues.',
  },
  {
    pt: 'Por que o gráfico de pizza é o mais popular da reunião? 🍕📊\n\nPorque **todo mundo quer um pedaço**.',
    en: 'Why is the pie chart the most popular one in meetings? 🍕📊\n\nBecause **everyone wants a slice**.',
  },
  {
    pt: 'Minha dieta é bem rigorosa:\n\nsó consumo **dados**... e de vez em quando um **cookie**. 🍪',
    en: 'My diet is very strict:\n\nI only consume **data**... and the occasional **cookie**. 🍪',
  },
  {
    pt: 'O que a nuvem falou pro raio? ⚡\n\n**"Para de me dar choque, eu tô em home office!"** ☁️',
    en: 'What did the cloud say to the lightning? ⚡\n\n**"Stop zapping me, I\'m working from home!"** ☁️',
  },
  {
    pt: 'Meu boné funciona igual a um **cache** 🧢\n\nDeixa tudo mais rápido e ninguém sabe direito como.',
    en: 'My cap works like a **cache** 🧢\n\nIt makes everything faster and nobody really knows how.',
  },
  {
    pt: 'Correlação não implica causalidade... 🤔\n\nmas toda vez que eu apareço alguém sorri. **Coincidência?** 😏',
    en: "Correlation doesn't imply causation... 🤔\n\nbut every time I show up, someone smiles. **Coincidence?** 😏",
  },
  {
    pt: 'O Python perguntou pro Java por que ele é tão estressado. 🐍☕\n\nO Java respondeu: "É que eu tenho muitas **chaves** pra carregar."',
    en: 'Python asked Java why it\'s always so stressed. 🐍☕\n\nJava said: "I\'ve got way too many **braces** to carry."',
  },
  {
    pt: 'Dev júnior: "Achei o bug!"\nDev sênior: "Ótimo. Agora acha os **outros 47** que ele estava escondendo." 🔍',
    en: 'Junior dev: "Found the bug!"\nSenior dev: "Great. Now find the **other 47** it was hiding." 🔍',
  },
  {
    pt: 'Por que o dataset foi barrado na festa? 🚫\n\nEstava cheio de **valores nulos** e ninguém sabia quem ele era.',
    en: 'Why was the dataset kicked out of the party? 🚫\n\nToo many **null values**, nobody knew who it was.',
  },
  {
    pt: 'Qual a comida favorita do desenvolvedor? 🍝\n\n**Código espaguete**, claro. Com bastante molho de gambiarra.',
    en: "What's a developer's favorite food? 🍝\n\n**Spaghetti code**, of course. Extra sauce of quick fixes.",
  },
  {
    pt: 'Fui fazer um modelo pra prever o futuro. 🔮\n\nEle deu **overfitting** no passado e agora só fala de 2019.',
    en: 'I built a model to predict the future. 🔮\n\nIt **overfit** the past and now only talks about 2019.',
  },
]

// Fila embaralhada: não repete piada até contar todas
let jokeQueue: number[] = []
function nextJokeIndex(): number {
  if (!jokeQueue.length) {
    jokeQueue = JOKES.map((_, i) => i)
    for (let i = jokeQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[jokeQueue[i], jokeQueue[j]] = [jokeQueue[j], jokeQueue[i]]
    }
  }
  return jokeQueue.shift() as number
}

/* ------------------------------------------------------------------ */
/* Tópicos                                                             */
/* ------------------------------------------------------------------ */

const TOPICS: Topic[] = [
  {
    id: 'joke',
    keywords: ['piada', 'joke', 'engracado', 'funny', 'diverte', 'conta outra', 'another', 'rir', 'laugh', 'humor'],
    replies: [],
  },
  {
    keywords: ['quem e voce', 'quem e vc', 'seu nome', 'who are you', 'your name', 'nube', 'o que voce e', 'what are you', 'o que voce faz', 'what can you do', 'obsidian', 'ollama', 'open source', 'assistente pessoal', 'personal assistant'],
    replies: [
      {
        pt: {
          text: 'Prazer, eu sou o **Nube**! ☁️🧢\n\nSou o assistente virtual do Lucas: meio guia turístico, meio mascote, 100% pelúcia de boné.\n\nPosso te ajudar com:\n• 🚀 os **projetos** do Lucas\n• 🧰 o que ele **sabe fazer**\n• 📄 **currículo** e **contato**\n• 😂 piadas duvidosas (minha especialidade)\n\nSpoiler: estou virando o **assistente pessoal** do Lucas, conectado ao Obsidian dele e rodando com Ollama. E o código vai ser **open source**! 🤫',
        },
        en: {
          text: "Nice to meet you, I'm **Nube**! ☁️🧢\n\nLucas's virtual assistant: part tour guide, part mascot, 100% plush in a cap.\n\nI can help with:\n• 🚀 Lucas's **projects**\n• 🧰 what he's **good at**\n• 📄 **resume** and **contact**\n• 😂 questionable jokes (my specialty)\n\nSpoiler: I'm becoming Lucas's **personal assistant**, connected to his Obsidian and running on Ollama. And the code will be **open source**! 🤫",
        },
      },
      {
        pt: {
          text: 'Eu sou o **Nube**, a nuvem mais estilosa da internet 😎☁️\n\nO Lucas me contratou pra te receber por aqui. O pagamento? Um boné e uma correntinha. 💸\n\nMe pergunta sobre projetos, habilidades, certificados ou contato!',
        },
        en: {
          text: "I'm **Nube**, the most stylish cloud on the internet 😎☁️\n\nLucas hired me to welcome you. My salary? A cap and a little chain. 💸\n\nAsk me about projects, skills, certificates or contact!",
        },
      },
    ],
  },
  {
    keywords: ['quem e o lucas', 'quem e lucas', 'sobre', 'about', 'who is lucas', 'sobre ele', 'about him', 'conhecer'],
    replies: [
      {
        pt: {
          text: 'Esse é o **Lucas Leuck de Oliveira** 👋\n\n• 🎓 Estudante de **Ciência de Dados** na PUCRS\n• 🤖 Apaixonado por **IA, Automação e Negócios**\n• 🐍 Cria soluções com **Python** e explora dados com **Power BI**\n\nResumindo: ele pega dados bagunçados e transforma em decisões inteligentes. ✨',
          action: { label: 'Ver “Sobre”', scrollTo: 'sobre' },
        },
        en: {
          text: 'Meet **Lucas Leuck de Oliveira** 👋\n\n• 🎓 **Data Science** student at PUCRS\n• 🤖 Passionate about **AI, Automation and Business**\n• 🐍 Builds solutions with **Python** and explores data with **Power BI**\n\nIn short: he turns messy data into smart decisions. ✨',
          action: { label: 'See “About”', scrollTo: 'sobre' },
        },
      },
    ],
  },
  {
    keywords: ['projeto', 'projetos', 'project', 'projects', 'portfolio', 'trabalho', 'trabalhos', 'github', 'repositorio', 'fez'],
    replies: [
      {
        pt: {
          text: 'Os projetos do Lucas vêm direto do GitHub dele 🚀\n\n• 💻 **Programação:** apps, automações e experimentos com IA\n• 🎓 **Acadêmicos:** análises e projetos de ciência de dados da faculdade\n• 🌟 Tem até **reconhecimento facial com máscara**, o **Data Detective** e um **eBook**\n\nVem dar uma olhada e escolher seu favorito!',
          action: { label: 'Ir para Projetos', scrollTo: 'projetos' },
        },
        en: {
          text: "Lucas's projects come straight from his GitHub 🚀\n\n• 💻 **Programming:** apps, automations and AI experiments\n• 🎓 **Academic:** data analysis and data science work from college\n• 🌟 There's even **masked face recognition**, **Data Detective** and an **eBook**\n\nCome take a look and pick your favorite!",
          action: { label: 'Go to Projects', scrollTo: 'projetos' },
        },
      },
    ],
  },
  {
    keywords: ['habilidade', 'habilidades', 'skill', 'skills', 'python', 'power bi', 'powerbi', 'sql', 'linguagem', 'tecnologia', 'stack', 'sabe fazer', 'machine learning', 'ia', ' ai ', 'ferramenta'],
    replies: [
      {
        pt: {
          text: 'Aqui vai o arsenal do Lucas 🧰\n\n• 🧪 **Ciência de Dados:** Python, Pandas, NumPy, Jupyter e IA Generativa\n• 📊 **Análise & BI:** Power BI, visualização de dados, Big Data e Business Analytics\n• 💻 **Programação:** JavaScript, TypeScript, React, Node.js, Java e C\n• 📐 **Matemática:** Cálculo I–III, Probabilidade & Estatística e Álgebra Linear\n• 🛠️ **Extras:** Git, MySQL, Oracle, Photoshop, inglês B2 e francês A2',
          action: { label: 'Ver Habilidades', scrollTo: 'skills' },
        },
        en: {
          text: "Here's Lucas's toolbox 🧰\n\n• 🧪 **Data Science:** Python, Pandas, NumPy, Jupyter and Generative AI\n• 📊 **Analytics & BI:** Power BI, data visualization, Big Data and Business Analytics\n• 💻 **Programming:** JavaScript, TypeScript, React, Node.js, Java and C\n• 📐 **Math:** Calculus I–III, Probability & Statistics and Linear Algebra\n• 🛠️ **Extras:** Git, MySQL, Oracle, Photoshop, English B2 and French A2",
          action: { label: 'See Skills', scrollTo: 'skills' },
        },
      },
    ],
  },
  {
    keywords: ['certificado', 'certificados', 'certificate', 'certificates', 'curso', 'cursos', 'course', 'formacao', 'faculdade', 'pucrs', 'estuda', 'study', 'education', 'universidade'],
    replies: [
      {
        pt: {
          text: 'O Lucas não para de estudar 📚\n\n• 🎓 Cursa **Ciência de Dados** na **PUCRS**\n• 🏅 Tem certificados de **Microsoft, IBM, Google DeepMind, Apple Developer Academy, IE University** e **University of Chicago**\n• 🔎 Na seção Certificados dá pra buscar e filtrar todos eles',
          action: { label: 'Ver Certificados', scrollTo: 'certificados' },
        },
        en: {
          text: 'Lucas never stops learning 📚\n\n• 🎓 Studies **Data Science** at **PUCRS**\n• 🏅 Certificates from **Microsoft, IBM, Google DeepMind, Apple Developer Academy, IE University** and **University of Chicago**\n• 🔎 You can search and filter them all in the Certificates section',
          action: { label: 'See Certificates', scrollTo: 'certificados' },
        },
      },
    ],
  },
  {
    keywords: ['curriculo', 'cv', 'resume', 'curriculum'],
    replies: [
      {
        pt: {
          text: 'Prontinho! 📄\n\nO currículo completo do Lucas está a **um clique** daqui:',
          action: { label: 'Abrir currículo', href: '/resume-lucas-leuck.pdf' },
        },
        en: {
          text: "Here you go! 📄\n\nLucas's full resume is **one click** away:",
          action: { label: 'Open resume', href: '/resume-lucas-leuck.pdf' },
        },
      },
    ],
  },
  {
    keywords: ['contato', 'contact', 'email', 'e-mail', 'linkedin', 'falar com', 'falo com', 'fala com', 'talk', 'contatar', 'entrar em contato', 'reach', 'mensagem', 'contratar', 'hire', 'vaga', 'job'],
    replies: [
      {
        pt: {
          text: 'Bora falar com o Lucas! 💬\n\n• 💼 **LinkedIn:** [lucasleuck](https://www.linkedin.com/in/lucasleuck)\n• 🐙 **GitHub:** [lucasnk1](https://github.com/lucasnk1)\n• ✉️ **E-mail:** [lucas.oliveria014@edu.pucrs.br](mailto:lucas.oliveria014@edu.pucrs.br)\n\nPode chamar sem cerimônia: ele adora conversar sobre dados e IA. 😉',
          action: { label: 'Ir para Contato', scrollTo: 'contato' },
        },
        en: {
          text: "Let's talk to Lucas! 💬\n\n• 💼 **LinkedIn:** [lucasleuck](https://www.linkedin.com/in/lucasleuck)\n• 🐙 **GitHub:** [lucasnk1](https://github.com/lucasnk1)\n• ✉️ **Email:** [lucas.oliveria014@edu.pucrs.br](mailto:lucas.oliveria014@edu.pucrs.br)\n\nFeel free to reach out: he loves chatting about data and AI. 😉",
          action: { label: 'Go to Contact', scrollTo: 'contato' },
        },
      },
    ],
  },
  {
    keywords: ['obrigado', 'obrigada', 'valeu', 'thanks', 'thank you', 'vlw', 'brigado', 'top', 'legal'],
    replies: [
      {
        pt: { text: 'Por nada! 🤍\n\nSe precisar, é só clicar em mim de novo. Eu fico aqui no cantinho. ☁️' },
        en: { text: "You're welcome! 🤍\n\nJust click me again if you need anything. I'll be right here in the corner. ☁️" },
      },
      {
        pt: { text: 'Imagina! Ajudar é comigo mesmo. 😎☁️' },
        en: { text: 'Anytime! Helping is kind of my thing. 😎☁️' },
      },
    ],
  },
  {
    keywords: ['oi', 'ola', 'eai', 'e ai', 'opa', 'bom dia', 'boa tarde', 'boa noite', 'hello', 'hi', 'hey', 'salve', 'fala'],
    replies: [
      {
        pt: { text: 'Oiê! 👋 Que bom te ver por aqui.\n\nPosso te contar sobre:\n• 🚀 projetos\n• 🧰 habilidades\n• 🏅 certificados\n• 💬 contato do Lucas' },
        en: { text: 'Hey there! 👋 Great to see you.\n\nI can tell you about:\n• 🚀 projects\n• 🧰 skills\n• 🏅 certificates\n• 💬 how to reach Lucas' },
      },
    ],
  },
]

const FALLBACK: Bilingual[] = [
  {
    pt: { text: 'Hmm, essa eu ainda não sei responder 🤔\n\nTenta perguntar sobre:\n• projetos\n• habilidades\n• certificados\n• currículo ou contato\n\nOu pede uma piada, que disso eu entendo! 😂' },
    en: { text: "Hmm, I don't know that one yet 🤔\n\nTry asking about:\n• projects\n• skills\n• certificates\n• resume or contact\n\nOr ask for a joke, that I'm great at! 😂" },
  },
  {
    pt: { text: 'Minha cabeça é literalmente de nuvem, às vezes eu me perco ☁️😅\n\nPosso te ajudar com **projetos, habilidades, certificados** ou **contato**!' },
    en: { text: 'My head is literally in the clouds, sometimes I get lost ☁️😅\n\nI can help with **projects, skills, certificates** or **contact**!' },
  },
]

const GREETING: Bilingual = {
  pt: { text: 'Oiê! Eu sou o **Nube** ☁️\n\nTô aqui pra te ajudar a conhecer o Lucas. Escolhe uma sugestão aí embaixo ou me pergunta o que quiser!' },
  en: { text: "Hey! I'm **Nube** ☁️\n\nI'm here to help you get to know Lucas. Pick a suggestion below or ask me anything!" },
}

export const QUICK_REPLIES: Record<Language, string[]> = {
  pt: ['Me conta uma piada 😂', 'Quem é você?', 'Quem é o Lucas?', 'Projetos', 'Habilidades', 'Currículo', 'Contato'],
  en: ['Tell me a joke 😂', 'Who are you?', 'Who is Lucas?', 'Projects', 'Skills', 'Resume', 'Contact'],
}

/** Texto da mensagem do usuário quando ele clica em "Conta outra" */
export const ANOTHER_JOKE: Record<Language, string> = {
  pt: 'Conta outra! 😂',
  en: 'Another one! 😂',
}

function normalize(text: string) {
  return ` ${text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `
}

const randomIndex = (n: number) => Math.floor(Math.random() * n)

/** Descobre qual resposta dar (em qualquer idioma) */
export function getNubeReply(message: string): ReplyRef {
  const text = normalize(message)
  let index = -1
  let bestScore = 0

  for (let i = 0; i < TOPICS.length; i++) {
    let score = 0
    for (const kw of TOPICS[i].keywords) {
      const k = normalize(kw)
      // palavras curtas precisam bater como palavra inteira
      if (k.trim().length <= 3 ? text.includes(k) : text.includes(k.trim())) {
        score += k.trim().length
      }
    }
    if (score > bestScore) {
      bestScore = score
      index = i
    }
  }

  if (index < 0) return { kind: 'fallback', variant: randomIndex(FALLBACK.length) }
  if (TOPICS[index].id === 'joke') return { kind: 'joke', index: nextJokeIndex() }
  return { kind: 'topic', topic: index, variant: randomIndex(TOPICS[index].replies.length) }
}

export function nextJoke(): ReplyRef {
  return { kind: 'joke', index: nextJokeIndex() }
}

/** Transforma a referência no texto do idioma atual */
export function resolveReply(ref: ReplyRef, lang: Language): NubeReply {
  switch (ref.kind) {
    case 'greeting':
      return GREETING[lang]
    case 'fallback':
      return FALLBACK[ref.variant][lang]
    case 'topic':
      return TOPICS[ref.topic].replies[ref.variant][lang]
    case 'joke':
      return {
        text: JOKES[ref.index][lang],
        action: { label: lang === 'pt' ? 'Conta outra 😂' : 'Another one 😂', send: 'another-joke' },
      }
  }
}
