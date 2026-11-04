import type { Language } from './i18n'

/**
 * Conteúdo da página do livro "Jovens e a Corrida pelo Dinheiro".
 * Sumário, resumos e citações vêm do próprio livro.
 */

export const BOOK_URL = 'https://docs.google.com/document/d/1ZX7XrDxalbt19qlP34cvyzclXYiEiXaSa-QbcPVMP-o/edit?tab=t.0'
export const BOOK_COVER = '/projetos/ebook/capa.webp'

interface Chapter {
  title: string
  summary: string
}
interface Part {
  id: string
  name: string
  title: string
  subtitle: string
  chapters: Chapter[]
}

const PT = {
  nav: { idea: 'A ideia', contents: 'Sumário', epilogue: 'Epílogo' },
  hero: {
    eyebrow: 'PROJETO EM DESTAQUE / LIVRO',
    title: 'Jovens e a Corrida pelo Dinheiro',
    subtitle: 'O desespero por sucesso na geração da pressa',
    lead:
      'Um olhar honesto sobre a geração que corre sem saber onde quer chegar, e o preço que paga por isso. Um livro sobre pressa, comparação, trabalho, dinheiro como identidade e, no fim, sobre aprender a andar no próprio ritmo.',
    meta: 'LUCAS LEUCK · PORTUGUÊS',
    read: 'Ler o livro',
    contents: 'Ver o sumário',
    back: '← Voltar aos projetos',
  },
  stats: [
    { value: '3', label: 'partes' },
    { value: '13', label: 'capítulos' },
    { value: '1', label: 'epílogo' },
    { value: 'Grátis', label: 'leitura online' },
  ],
  idea: {
    eyebrow: '01 / A IDEIA',
    quote: 'Vivemos em uma era em que o silêncio assusta mais do que o fracasso.',
    p1: 'Os jovens de hoje nasceram conectados, acelerados e, de alguma forma, cansados antes do tempo. A cada deslizar de tela, alguém parece estar vencendo mais rápido. Sem perceber, entramos na corrida: pelo dinheiro, pelo reconhecimento, pela validação.',
    p2: 'O livro nasceu da observação de um comportamento coletivo: a pressa. Pressa de vencer, de provar algo, de não ser esquecido. E de uma pergunta que atravessa todos os capítulos: vale a pena correr tão rápido quando nem sabemos para onde vamos?',
    callout: 'Este livro não é sobre finanças. É sobre o que o dinheiro representa: status, medo, liberdade e, às vezes, desespero.',
  },
  contents: {
    eyebrow: '02 / SUMÁRIO',
    title: 'Três partes, uma corrida.',
    intro: 'Escolha uma parte e abra um capítulo para ler o resumo.',
    parts: [
      {
        id: 'I',
        name: 'Parte I',
        title: 'A Era da Corrida',
        subtitle: 'Entender o cenário onde tudo começou',
        chapters: [
          { title: 'A Geração da Pressa', summary: 'A rotina acelerada dos jovens conectados: como a pressão social, a comparação constante e o culto à produtividade moldam uma geração que aprende cedo demais que a vida é uma corrida.' },
          { title: 'A Influência Invisível das Redes', summary: 'O impacto das redes sociais na saúde mental e no valor pessoal: como a validação online e a comparação transformam relacionamentos, autoestima e identidade.' },
          { title: 'Dinheiro como Identidade', summary: 'Quando o dinheiro deixa de ser ferramenta e passa a definir quem somos, influenciando carreira, estilo de vida e autoestima num ciclo de comparação e pressão.' },
          { title: 'Trabalhar até Quebrar', summary: 'A cultura do excesso de produtividade: como trabalhar sem limites afeta corpo, mente e relações, e reforça a sensação de que nunca é suficiente.' },
        ],
      },
      {
        id: 'II',
        name: 'Parte II',
        title: 'O Custo da Corrida',
        subtitle: 'As consequências psicológicas, sociais e econômicas',
        chapters: [
          { title: 'Quando o Sucesso Vira Sofrimento', summary: 'A pressão por resultados, reconhecimento e status causando ansiedade, burnout e vazio. O sucesso externo nem sempre vira bem-estar interno.' },
          { title: 'Educação Financeira de Influencer', summary: 'Os riscos de seguir conselhos financeiros superficiais nas redes, e como a ilusão do enriquecimento rápido gera frustração, dívidas e ansiedade.' },
          { title: 'O Mercado de Trabalho Líquido', summary: 'Gig economy, empregos temporários e trabalhos paralelos: instabilidade e pressão para produzir mais com menos segurança.' },
          { title: 'Desigualdade Disfarçada de Meritocracia', summary: 'Como origem social, acesso à educação, gênero e raça influenciam oportunidades, mostrando que esforço sozinho nem sempre garante sucesso.' },
          { title: 'O Preço da Aparência', summary: 'A pressão estética e a imagem perfeita nas redes, e o impacto disso na saúde mental, nas finanças e na autoestima.' },
          { title: 'O Peso da Comparação', summary: 'Cada conquista alheia vira medida da própria insuficiência. Comparar-se consigo mesmo e valorizar o progresso pessoal ajuda a quebrar o ciclo.' },
        ],
      },
      {
        id: 'III',
        name: 'Parte III',
        title: 'Parar para Respirar',
        subtitle: 'A reconstrução: novos valores, novas rotas',
        chapters: [
          { title: 'O Valor do Tempo', summary: 'Desacelerar e priorizar o tempo pessoal como base da saúde mental: descanso e introspecção sem culpa, reconectando com amigos, família e consigo.' },
          { title: 'Propósito, Não Performance', summary: 'Redefinir sucesso e colocar propósito acima da performance, com histórias de escolhas que priorizam significado e aprendizado.' },
          { title: 'A Nova Riqueza', summary: 'Riqueza vai além do financeiro: tempo livre, relações saudáveis e equilíbrio emocional como formas essenciais de riqueza na vida moderna.' },
        ],
      },
    ] as Part[],
    chapter: 'CAPÍTULO',
  },
  voices: {
    eyebrow: '03 / COM QUEM O LIVRO CONVERSA',
    title: 'Ideias que atravessam as páginas.',
    items: [
      { name: 'Byung-Chul Han', work: 'A sociedade do cansaço', text: 'A produtividade medida como valor moral: para muitos jovens, trabalhar demais virou sinônimo de ser digno.' },
      { name: 'Jonathan Haidt', work: 'A Geração Ansiosa', text: 'A presença constante das redes sociais na adolescência e sua relação com a ansiedade de uma geração.' },
      { name: 'Friedrich Nietzsche', work: '“O que não nos mata nos fortalece”', text: 'Revisitado: na geração da pressa, o que nos cansa quase sempre não ensina a viver melhor, só a sobreviver mais rápido.' },
    ],
  },
  epilogue: {
    eyebrow: '04 / EPÍLOGO',
    title: 'O Silêncio Depois da Corrida',
    quotes: [
      'O silêncio não é vazio. É espaço.',
      'Descansar não é desistir, mas recuperar a energia que nos permite sentir, criar e existir plenamente.',
      'A corrida nunca foi sobre vencer os outros, mas sobre nos encontrarmos a nós mesmos.',
    ],
  },
  author: {
    eyebrow: '05 / NOTA DO AUTOR',
    text:
      'Escrever este livro foi, antes de tudo, uma viagem pessoal. Cada capítulo nasceu da observação, do diálogo com amigos e colegas e da reflexão sobre as escolhas que fazemos, muitas vezes sem perceber. Se ele conseguir, mesmo que por alguns instantes, ajudar alguém a respirar e perceber o valor do que já existe, então toda a pressa terá valido a pena.',
    quote: 'A verdadeira riqueza não está no que se acumula, mas na atenção que damos à vida que nos acontece.',
    signature: 'Lucas Leuck',
  },
  end: { eyebrow: 'RESPIRA. AGORA PODEMOS COMEÇAR.', title: 'Pronto para ler?', read: 'Ler o livro completo', button: 'Voltar ao portfólio' },
  footer: '© 2026 · Lucas Leuck de Oliveira',
  top: 'Voltar ao topo ↑',
}

type Copy = typeof PT

const EN: Copy = {
  nav: { idea: 'The idea', contents: 'Contents', epilogue: 'Epilogue' },
  hero: {
    eyebrow: 'FEATURED PROJECT / BOOK',
    title: 'Jovens e a Corrida pelo Dinheiro',
    subtitle: '“Youth and the Race for Money”: the desperation for success in the generation in a hurry',
    lead:
      'An honest look at a generation running without knowing where it wants to go, and the price it pays for it. A book about hurry, comparison, work, money as identity and, in the end, learning to walk at your own pace.',
    meta: 'LUCAS LEUCK · WRITTEN IN PORTUGUESE',
    read: 'Read the book',
    contents: 'See the contents',
    back: '← Back to projects',
  },
  stats: [
    { value: '3', label: 'parts' },
    { value: '13', label: 'chapters' },
    { value: '1', label: 'epilogue' },
    { value: 'Free', label: 'to read online' },
  ],
  idea: {
    eyebrow: '01 / THE IDEA',
    quote: 'We live in an era where silence is scarier than failure.',
    p1: 'Young people today were born connected, accelerated and somehow tired before their time. With every swipe, someone seems to be winning faster. Without noticing, we join the race: for money, for recognition, for validation.',
    p2: 'The book was born from watching a collective behavior: hurry. The hurry to win, to prove something, to not be forgotten. And from a question that runs through every chapter: is it worth running this fast when we don’t even know where we’re going?',
    callout: 'This book is not about finance. It is about what money represents: status, fear, freedom and, sometimes, desperation.',
  },
  contents: {
    eyebrow: '02 / CONTENTS',
    title: 'Three parts, one race.',
    intro: 'Pick a part and open a chapter to read its summary.',
    parts: [
      {
        id: 'I',
        name: 'Part I',
        title: 'The Age of the Race',
        subtitle: 'Understanding where it all began',
        chapters: [
          { title: 'The Generation in a Hurry', summary: 'The accelerated routine of connected youth: how social pressure, constant comparison and the cult of productivity shape a generation that learns too early that life is a race.' },
          { title: 'The Invisible Influence of Social Media', summary: 'The impact of social media on mental health and self-worth: how online validation and comparison reshape relationships, self-esteem and identity.' },
          { title: 'Money as Identity', summary: 'When money stops being a tool and starts defining who we are, shaping careers, lifestyle and self-esteem in a cycle of comparison and pressure.' },
          { title: 'Working Until You Break', summary: 'The culture of excessive productivity: how working without limits affects body, mind and relationships, and feeds the feeling that it’s never enough.' },
        ],
      },
      {
        id: 'II',
        name: 'Part II',
        title: 'The Cost of the Race',
        subtitle: 'The psychological, social and economic consequences',
        chapters: [
          { title: 'When Success Becomes Suffering', summary: 'The pressure for results, recognition and status causing anxiety, burnout and emptiness. Outer success doesn’t always become inner well-being.' },
          { title: 'Influencer Financial Education', summary: 'The risks of following shallow financial advice on social media, and how the illusion of getting rich quick leads to frustration, debt and anxiety.' },
          { title: 'The Liquid Job Market', summary: 'Gig economy, temporary jobs and side hustles: instability and the pressure to produce more with less security.' },
          { title: 'Inequality Disguised as Meritocracy', summary: 'How social background, access to education, gender and race shape opportunities, showing that effort alone doesn’t always guarantee success.' },
          { title: 'The Price of Appearance', summary: 'Aesthetic pressure and the perfect image on social media, and its impact on mental health, finances and self-esteem.' },
          { title: 'The Weight of Comparison', summary: 'Every achievement of others becomes a measure of our own inadequacy. Comparing yourself with yourself and valuing personal progress helps break the cycle.' },
        ],
      },
      {
        id: 'III',
        name: 'Part III',
        title: 'Stopping to Breathe',
        subtitle: 'Rebuilding: new values, new paths',
        chapters: [
          { title: 'The Value of Time', summary: 'Slowing down and prioritizing personal time as the basis of mental health: rest and introspection without guilt, reconnecting with friends, family and yourself.' },
          { title: 'Purpose, Not Performance', summary: 'Redefining success and putting purpose above performance, with stories of choices that prioritize meaning and learning.' },
          { title: 'The New Wealth', summary: 'Wealth goes beyond money: free time, healthy relationships and emotional balance as essential forms of wealth in modern life.' },
        ],
      },
    ],
    chapter: 'CHAPTER',
  },
  voices: {
    eyebrow: '03 / WHO THE BOOK TALKS WITH',
    title: 'Ideas that run through the pages.',
    items: [
      { name: 'Byung-Chul Han', work: 'The Burnout Society', text: 'Productivity measured as a moral value: for many young people, overworking became a synonym for being worthy.' },
      { name: 'Jonathan Haidt', work: 'The Anxious Generation', text: 'The constant presence of social media in adolescence and its link to the anxiety of a generation.' },
      { name: 'Friedrich Nietzsche', work: '“What doesn’t kill us makes us stronger”', text: 'Revisited: in the generation in a hurry, what wears us out rarely teaches us to live better, only to survive faster.' },
    ],
  },
  epilogue: {
    eyebrow: '04 / EPILOGUE',
    title: 'The Silence After the Race',
    quotes: [
      'Silence is not emptiness. It is space.',
      'Resting is not giving up, but recovering the energy that lets us feel, create and fully exist.',
      'The race was never about beating others, but about finding ourselves.',
    ],
  },
  author: {
    eyebrow: '05 / AUTHOR’S NOTE',
    text:
      'Writing this book was, above all, a personal journey. Each chapter was born from observation, from conversations with friends and colleagues, and from reflecting on the choices we make, often without noticing. If it can help someone breathe, even for a moment, and see the value of what already exists, then all the hurry will have been worth it.',
    quote: 'True wealth is not in what we accumulate, but in the attention we give to the life that happens to us.',
    signature: 'Lucas Leuck',
  },
  end: { eyebrow: 'BREATHE. NOW WE CAN BEGIN.', title: 'Ready to read?', read: 'Read the full book', button: 'Back to portfolio' },
  footer: '© 2026 · Lucas Leuck de Oliveira',
  top: 'Back to top ↑',
}

export const BOOK_COPY: Record<Language, Copy> = { pt: PT, en: EN }
