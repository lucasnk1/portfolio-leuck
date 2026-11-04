import type { Language } from './i18n'

/**
 * Conteúdo da página do projeto Nube (assistente pessoal).
 * Status atual: conectado ao Obsidian; o restante está em desenvolvimento.
 */

export const NUBE_IMAGE = '/projetos/nube/nube.webp'

export type AreaId = 'college' | 'work' | 'gym' | 'money'
export type StatusId = 'done' | 'dev' | 'planned'

const PT = {
  nav: { how: 'Como funciona', areas: 'Áreas', status: 'Status' },
  hero: {
    eyebrow: 'PROJETO EM DESTAQUE / ASSISTENTE PESSOAL',
    title: 'Nube',
    lead:
      'Meu assistente pessoal para tudo. O Nube já está conectado ao meu Obsidian, onde guardo o que faço na faculdade, no trabalho, na academia (dieta e treino) e no financeiro. Com um modelo de linguagem rodando localmente pela API do Ollama e um dashboard, ele conversa comigo sobre a minha vida, monta metas e acompanha o progresso.',
    tags: ['OBSIDIAN', 'OLLAMA', 'LLM LOCAL', 'DASHBOARD'],
    status: 'EM DESENVOLVIMENTO',
    how: 'Ver como funciona',
    chat: 'Falar com o Nube do site',
    back: '← Voltar aos projetos',
    openSource: 'Open source em breve',
    barLeft: 'NUBE · ASSISTENTE PESSOAL',
    barRight: 'EM DESENVOLVIMENTO',
    demoLabel: 'CONVERSA ILUSTRATIVA',
    demo: [
      { area: 'FACULDADE', q: 'Nube, o que eu tenho pra entregar essa semana?', a: 'Olhei suas notas da faculdade: tem um trabalho para sexta e uma prova na próxima terça. Quer que eu separe um horário de estudo?' },
      { area: 'ACADEMIA', q: 'Como foram meus treinos?', a: 'Pelas suas anotações de treino, você manteve a rotina na maior parte da semana. Posso sugerir uma meta para a próxima?' },
      { area: 'FINANCEIRO', q: 'Tô dentro do orçamento do mês?', a: 'Somei os gastos que você registrou no Obsidian e comparei com a meta do mês. Quer ver o resumo no dashboard?' },
      { area: 'TRABALHO', q: 'Me ajuda a organizar amanhã?', a: 'Juntei as pendências das suas notas de trabalho e montei uma lista por prioridade para você revisar.' },
    ],
  },
  stats: [
    { value: '4', label: 'áreas da vida' },
    { value: 'Obsidian', label: 'já conectado' },
    { value: 'Ollama', label: 'modelo local' },
    { value: 'Open source', label: 'no futuro' },
  ],
  overview: {
    eyebrow: '01 / VISÃO GERAL',
    title: 'Um assistente que conhece a minha rotina.',
    p1: 'Quase tudo o que eu faço vira nota no Obsidian: matérias e provas da faculdade, tarefas do trabalho, treinos e dieta da academia, gastos e metas financeiras. O problema é que essa informação fica espalhada em muitos arquivos.',
    p2: 'O Nube nasceu para juntar tudo isso. Ele já está conectado ao meu Obsidian e usa essas notas como contexto para conversar comigo, ajudar a montar metas e acompanhar o progresso em um só lugar.',
    facts: [
      { title: 'Faculdade', text: 'Matérias, provas, trabalhos e prazos.' },
      { title: 'Trabalho', text: 'Tarefas, projetos e prioridades do dia.' },
      { title: 'Academia', text: 'Treinos e dieta, com acompanhamento da rotina.' },
      { title: 'Financeiro', text: 'Gastos, orçamento e metas do mês.' },
    ],
  },
  how: {
    eyebrow: '02 / COMO FUNCIONA',
    title: 'Das notas à conversa.',
    intro: 'Cada parte tem uma responsabilidade. O Obsidian guarda, o Nube organiza e o modelo local conversa.',
    flow: [
      { tag: 'FONTE', title: 'Obsidian', text: 'Notas em Markdown sobre a minha vida' },
      { tag: 'CONTEXTO', title: 'Nube', text: 'Lê e organiza as notas por área' },
      { tag: 'MODELO', title: 'Ollama', text: 'LLM rodando localmente via API' },
      { tag: 'SAÍDA', title: 'Conversa e metas', text: 'Chat, metas e dashboard' },
    ],
    cards: [
      { tag: '01 / FONTE', title: 'Obsidian', text: 'O cofre de notas onde eu registro faculdade, trabalho, academia e finanças. O Nube já está conectado a ele.' },
      { tag: '02 / MODELO', title: 'Ollama', text: 'Roda o modelo de linguagem na minha própria máquina e expõe uma API para o Nube conversar comigo.' },
      { tag: '03 / VISUAL', title: 'Dashboard', text: 'Uma visão geral das áreas da vida, das metas e do progresso, para não depender só do chat.' },
      { tag: '04 / OBJETIVO', title: 'Metas', text: 'A partir das conversas e das notas, o Nube ajuda a definir metas e acompanhar se elas estão sendo cumpridas.' },
    ],
  },
  areas: {
    eyebrow: '03 / ÁREAS',
    title: 'Uma vida, quatro frentes.',
    intro: 'Escolha uma área para ver o que o Nube acompanha e o tipo de pergunta que dá para fazer.',
    tracks: 'O que ele acompanha',
    asks: 'Exemplos de pergunta',
    items: {
      college: { name: 'Faculdade', tracks: ['Matérias e anotações de aula', 'Provas e trabalhos com prazo', 'Plano de estudos'], asks: ['O que eu tenho pra entregar essa semana?', 'Me ajuda a montar um plano de estudo para a prova?'] },
      work: { name: 'Trabalho', tracks: ['Tarefas e pendências', 'Projetos em andamento', 'Prioridades do dia'], asks: ['Me ajuda a organizar amanhã?', 'Quais pendências estão atrasadas?'] },
      gym: { name: 'Academia', tracks: ['Rotina de treinos', 'Dieta', 'Constância ao longo das semanas'], asks: ['Como foram meus treinos?', 'Estou seguindo a dieta?'] },
      money: { name: 'Financeiro', tracks: ['Gastos registrados', 'Orçamento do mês', 'Metas financeiras'], asks: ['Tô dentro do orçamento do mês?', 'Quanto falta para a minha meta?'] },
    } as Record<AreaId, { name: string; tracks: string[]; asks: string[] }>,
  },
  status: {
    eyebrow: '04 / STATUS',
    title: 'Em desenvolvimento.',
    intro: 'Onde o projeto está hoje. A ordem pode mudar conforme ele evolui.',
    labels: { done: 'CONECTADO', dev: 'EM DESENVOLVIMENTO', planned: 'PLANEJADO' } as Record<StatusId, string>,
    items: [
      { title: 'Conexão com o Obsidian', text: 'O Nube já lê as notas do meu cofre do Obsidian.', status: 'done' as StatusId },
      { title: 'Conversa com o modelo local', text: 'Chat com um LLM rodando pela API do Ollama.', status: 'dev' as StatusId },
      { title: 'Dashboard', text: 'Visão geral das áreas, metas e progresso.', status: 'dev' as StatusId },
      { title: 'Metas e acompanhamento', text: 'Definir metas a partir das notas e acompanhar a evolução.', status: 'dev' as StatusId },
      { title: 'Código open source', text: 'Liberar o projeto para quem quiser fazer algo parecido.', status: 'planned' as StatusId },
    ],
  },
  notes: {
    eyebrow: '05 / PRIVACIDADE E OPEN SOURCE',
    title: 'Pessoal de verdade.',
    items: [
      { title: 'Modelo local', text: 'O modelo roda pelo Ollama na minha máquina, então conversar sobre a minha vida não depende de um serviço externo.' },
      { title: 'Open source no futuro', text: 'Quando o projeto estiver mais maduro, vou liberar o código para quem quiser montar o próprio assistente.' },
      { title: 'Sem repositório público ainda', text: 'Por enquanto o código não está no GitHub. Os detalhes desta página podem mudar enquanto ele evolui.' },
      { title: 'Exemplos ilustrativos', text: 'As conversas mostradas aqui são exemplos do tipo de uso, não dados reais.' },
    ],
  },
  end: { eyebrow: 'FIM DO PROJETO / NUBE', title: 'Vamos explorar outros projetos?', button: 'Voltar ao portfólio' },
  footer: '© 2026 · Lucas Leuck de Oliveira',
  top: 'Voltar ao topo ↑',
}

type Copy = typeof PT

const EN: Copy = {
  nav: { how: 'How it works', areas: 'Areas', status: 'Status' },
  hero: {
    eyebrow: 'FEATURED PROJECT / PERSONAL ASSISTANT',
    title: 'Nube',
    lead:
      'My personal assistant for everything. Nube is already connected to my Obsidian, where I keep what I do in college, at work, at the gym (diet and training) and with my finances. With a language model running locally through the Ollama API and a dashboard, it talks with me about my life, builds goals and tracks progress.',
    tags: ['OBSIDIAN', 'OLLAMA', 'LOCAL LLM', 'DASHBOARD'],
    status: 'IN DEVELOPMENT',
    how: 'See how it works',
    chat: 'Chat with the site’s Nube',
    back: '← Back to projects',
    openSource: 'Open source soon',
    barLeft: 'NUBE · PERSONAL ASSISTANT',
    barRight: 'IN DEVELOPMENT',
    demoLabel: 'ILLUSTRATIVE CONVERSATION',
    demo: [
      { area: 'COLLEGE', q: 'Nube, what do I have to hand in this week?', a: 'I checked your college notes: there is an assignment due Friday and an exam next Tuesday. Want me to block some study time?' },
      { area: 'GYM', q: 'How did my workouts go?', a: 'From your training notes, you kept the routine for most of the week. Should I suggest a goal for the next one?' },
      { area: 'FINANCES', q: 'Am I within this month’s budget?', a: 'I added up the expenses you logged in Obsidian and compared them with this month’s goal. Want to see the summary on the dashboard?' },
      { area: 'WORK', q: 'Can you help me plan tomorrow?', a: 'I gathered the open items from your work notes and built a priority list for you to review.' },
    ],
  },
  stats: [
    { value: '4', label: 'areas of life' },
    { value: 'Obsidian', label: 'already connected' },
    { value: 'Ollama', label: 'local model' },
    { value: 'Open source', label: 'in the future' },
  ],
  overview: {
    eyebrow: '01 / OVERVIEW',
    title: 'An assistant that knows my routine.',
    p1: 'Almost everything I do becomes a note in Obsidian: college classes and exams, work tasks, gym workouts and diet, expenses and financial goals. The problem is that this information is spread across many files.',
    p2: 'Nube was born to bring it all together. It is already connected to my Obsidian and uses those notes as context to talk with me, help build goals and track progress in one place.',
    facts: [
      { title: 'College', text: 'Classes, exams, assignments and deadlines.' },
      { title: 'Work', text: 'Tasks, projects and the day’s priorities.' },
      { title: 'Gym', text: 'Workouts and diet, tracking the routine.' },
      { title: 'Finances', text: 'Expenses, budget and monthly goals.' },
    ],
  },
  how: {
    eyebrow: '02 / HOW IT WORKS',
    title: 'From notes to conversation.',
    intro: 'Each part has one job. Obsidian stores, Nube organizes and the local model talks.',
    flow: [
      { tag: 'SOURCE', title: 'Obsidian', text: 'Markdown notes about my life' },
      { tag: 'CONTEXT', title: 'Nube', text: 'Reads and organizes notes by area' },
      { tag: 'MODEL', title: 'Ollama', text: 'LLM running locally via API' },
      { tag: 'OUTPUT', title: 'Chat and goals', text: 'Chat, goals and dashboard' },
    ],
    cards: [
      { tag: '01 / SOURCE', title: 'Obsidian', text: 'The note vault where I log college, work, gym and finances. Nube is already connected to it.' },
      { tag: '02 / MODEL', title: 'Ollama', text: 'Runs the language model on my own machine and exposes an API for Nube to talk with me.' },
      { tag: '03 / VISUAL', title: 'Dashboard', text: 'An overview of every area of life, the goals and the progress, so it’s not only about the chat.' },
      { tag: '04 / GOAL', title: 'Goals', text: 'From conversations and notes, Nube helps set goals and track whether they are being met.' },
    ],
  },
  areas: {
    eyebrow: '03 / AREAS',
    title: 'One life, four fronts.',
    intro: 'Pick an area to see what Nube tracks and the kind of question you can ask.',
    tracks: 'What it tracks',
    asks: 'Example questions',
    items: {
      college: { name: 'College', tracks: ['Classes and lecture notes', 'Exams and assignments with deadlines', 'Study plan'], asks: ['What do I have to hand in this week?', 'Can you help me build a study plan for the exam?'] },
      work: { name: 'Work', tracks: ['Tasks and open items', 'Ongoing projects', 'The day’s priorities'], asks: ['Can you help me plan tomorrow?', 'Which items are overdue?'] },
      gym: { name: 'Gym', tracks: ['Workout routine', 'Diet', 'Consistency over the weeks'], asks: ['How did my workouts go?', 'Am I sticking to the diet?'] },
      money: { name: 'Finances', tracks: ['Logged expenses', 'Monthly budget', 'Financial goals'], asks: ['Am I within this month’s budget?', 'How far am I from my goal?'] },
    },
  },
  status: {
    eyebrow: '04 / STATUS',
    title: 'In development.',
    intro: 'Where the project stands today. The order may change as it evolves.',
    labels: { done: 'CONNECTED', dev: 'IN DEVELOPMENT', planned: 'PLANNED' },
    items: [
      { title: 'Obsidian connection', text: 'Nube already reads the notes in my Obsidian vault.', status: 'done' },
      { title: 'Chat with the local model', text: 'Conversation with an LLM running through the Ollama API.', status: 'dev' },
      { title: 'Dashboard', text: 'Overview of areas, goals and progress.', status: 'dev' },
      { title: 'Goals and tracking', text: 'Set goals from the notes and follow their progress.', status: 'dev' },
      { title: 'Open source code', text: 'Release the project for anyone who wants to build something similar.', status: 'planned' },
    ],
  },
  notes: {
    eyebrow: '05 / PRIVACY AND OPEN SOURCE',
    title: 'Truly personal.',
    items: [
      { title: 'Local model', text: 'The model runs through Ollama on my machine, so talking about my life does not depend on an external service.' },
      { title: 'Open source in the future', text: 'Once the project is more mature, I will release the code for anyone who wants to build their own assistant.' },
      { title: 'No public repository yet', text: 'For now the code is not on GitHub. The details on this page may change as it evolves.' },
      { title: 'Illustrative examples', text: 'The conversations shown here are examples of the kind of use, not real data.' },
    ],
  },
  end: { eyebrow: 'END OF PROJECT / NUBE', title: 'Shall we explore other projects?', button: 'Back to portfolio' },
  footer: '© 2026 · Lucas Leuck de Oliveira',
  top: 'Back to top ↑',
}

export const NUBE_COPY: Record<Language, Copy> = { pt: PT, en: EN }
export const AREA_IDS: AreaId[] = ['college', 'work', 'gym', 'money']
