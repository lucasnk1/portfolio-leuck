import type { Language } from './i18n'

/**
 * Conteúdo da página do projeto Nube (assistente pessoal).
 * Baseado no código do NUBE (repositório privado).
 */

export const NUBE_IMAGE = '/projetos/nube/nube.webp'
export const NUBE_APP_SHOT = '/projetos/nube/app.webp'

export type AreaId = 'college' | 'gym' | 'work' | 'hub' | 'family'
export type StatusId = 'done' | 'dev' | 'planned'

const PT = {
  nav: { how: 'Como funciona', areas: 'Áreas', status: 'Status' },
  hero: {
    eyebrow: 'PROJETO EM DESTAQUE / ASSISTENTE PESSOAL',
    title: 'Nube',
    lead:
      'Meu assistente pessoal para tudo. O NUBE mora no "Mega Cérebro", meu cofre do Obsidian, e lê as notas da faculdade, da academia, do trabalho e da agenda para conversar comigo pelo Gemini. Ele calcula quanto falta para eu passar, busca prazos no Moodle, anota ideias e cuida da minha agenda. E a minha família também fala com ele: pergunta onde eu provavelmente estou, me avisa no celular e marca encontros que eu confirmo.',
    tags: ['OBSIDIAN', 'GEMINI', 'DROPBOX', 'PWA', 'MOODLE', 'VOZ NO APARELHO'],
    status: 'EM DESENVOLVIMENTO',
    how: 'Ver como funciona',
    chat: 'Falar com o Nube do site',
    back: '← Voltar aos projetos',
    openSource: 'Já em uso',
    barLeft: 'NUBE · ASSISTENTE PESSOAL',
    barRight: 'EM DESENVOLVIMENTO',
    demoLabel: 'CONVERSA ILUSTRATIVA',
    demo: [
      { area: 'FACULDADE', q: 'Quanto eu preciso tirar na G2 de Multivariada?', a: 'Peguei a fórmula da disciplina e a sua nota da G1 no cofre e já calculei o que falta. Suave na nave: te passo o número e um plano de estudo pra farmar esse XP. ☁️' },
      { area: 'ACADEMIA', q: 'Faltei muito no treino essa semana?', a: 'Mano, tem "faltei" seguido no seu registro de treino... a build tá levando nerf. Bora de patch: treino curto amanhã e volta pra rotina de segunda a sexta.' },
      { area: 'AGENDA', q: 'Tô em reunião até as 10h.', a: 'Anotado! Deixei seu status como "em reunião" até 10:00. Se a família perguntar de você, ela vê esse aviso. ☁️' },
      { area: 'FAMÍLIA', q: 'Oi, NUBE! Onde o Lucas tá agora?', a: 'Oi! Pela rotina dele, agora ele provavelmente está na aula. É uma estimativa, tá? Quer que eu avise ele no celular? ☁️' },
    ],
  },
  stats: [
    { value: 'Obsidian', label: 'cofre "Mega Cérebro"' },
    { value: 'Gemini', label: 'modelo 2.5 Flash' },
    { value: '5', label: 'áreas do cofre' },
    { value: 'PWA', label: 'instala no celular' },
  ],
  shot: {
    eyebrow: 'O APP HOJE',
    title: 'Assim está o NUBE agora.',
    intro: 'A tela inicial do app no computador: atalhos para o plano do dia, entregas, Moodle, notas, treino e calendário, e o medidor de tokens do Gemini.',
    alt: 'Tela inicial do app NUBE com a saudação "Bom dia, Lucas.", atalhos e o campo para perguntar ao NUBE',
  },
  overview: {
    eyebrow: '01 / VISÃO GERAL',
    title: 'Um assistente que mora no meu cofre.',
    p1: 'Quase tudo o que eu faço vira nota no Obsidian: disciplinas, notas e entregas da PUCRS, treinos e dieta, reuniões do trabalho, rotina, metas e ideias soltas. O problema é que essa informação fica espalhada em muitos arquivos.',
    p2: 'O NUBE junta tudo isso. Ele lê o cofre pelo Dropbox, escolhe só as notas da área da pergunta e responde com o jeito "Noob Analítico": cara de bichinho fofo, cabeça de analista sênior que acha o bug no meu plano e já propõe o patch.',
    facts: [
      { title: 'Faculdade', text: 'Disciplinas, notas e entregas, com o cálculo do que falta para passar e os prazos do Moodle.' },
      { title: 'Academia', text: 'Treinos, fichas e dieta, contando as faltas da rotina de segunda a sexta.' },
      { title: 'Agenda', text: 'Rotina, status ("em reunião até as 10h"), compromissos e metas.' },
      { title: 'Família', text: 'Quem tem acesso pergunta onde eu provavelmente estou e me avisa no celular.' },
    ],
  },
  how: {
    eyebrow: '02 / COMO FUNCIONA',
    title: 'Das notas à conversa.',
    intro: 'Cada parte tem uma responsabilidade: o Obsidian guarda, o Dropbox leva, o NUBE escolhe o contexto e o Gemini conversa.',
    flow: [
      { tag: 'FONTE', title: 'Obsidian', text: 'Cofre "Mega Cérebro" em Markdown' },
      { tag: 'PONTE', title: 'Dropbox', text: 'Leva o cofre até o app' },
      { tag: 'CONTEXTO', title: 'NUBE', text: 'Escolhe só as notas da área da pergunta' },
      { tag: 'MODELO', title: 'Gemini', text: '2.5 Flash, com ferramentas' },
    ],
    cards: [
      { tag: '01 / CONTEXTO', title: 'Notas certas', text: 'Cada pergunta vai para a área certa: faculdade, saúde, trabalho, agenda ou inbox. Conversa solta nem abre o cofre, e um medidor mostra os tokens gastos no dia.' },
      { tag: '02 / AÇÕES', title: 'Ferramentas', text: 'O Gemini pode buscar prazos ao vivo no Moodle, registrar meu status, marcar compromissos e salvar ideias no Inbox. São as únicas coisas que o modelo pode gravar, e ele não apaga nada.' },
      { tag: '03 / APP', title: 'PWA com voz', text: 'Instala no celular como app, entende fotos (print, quadro, prova, comida) e tem microfone. A voz em português (Piper) é gerada no próprio aparelho.' },
      { tag: '04 / FAMÍLIA', title: 'Acessos com login', text: 'Família e amigos falam com um NUBE limitado: ele diz onde eu provavelmente estou, manda notificação no meu celular e marca encontros que eu aprovo no calendário.' },
    ],
  },
  areas: {
    eyebrow: '03 / ÁREAS',
    title: 'Uma vida, cinco frentes.',
    intro: 'Escolha uma área para ver o que o NUBE acompanha e o tipo de pergunta que dá para fazer.',
    tracks: 'O que ele acompanha',
    asks: 'Exemplos de pergunta',
    items: {
      college: { name: 'Faculdade', tracks: ['Disciplinas, fórmula da média e notas lançadas', 'Entregas com prazo e status', 'Prazos do Moodle, ao vivo e num resumo toda semana'], asks: ['Quanto falta pra eu passar em Multivariada?', 'Tem prazo novo no Moodle?'] },
      gym: { name: 'Academia', tracks: ['Treinos registrados e faltas', 'Fichas de treino', 'Dieta e refeições'], asks: ['Faltei muito no treino essa semana?', 'O que eu comi hoje bate com a dieta?'] },
      work: { name: 'Trabalho', tracks: ['Notas de reuniões e tarefas', 'Pendências do estágio', 'Dados corporativos usados só quando o assunto é trabalho'], asks: ['O que ficou pendente da reunião de ontem?', 'Me ajuda a organizar meu dia no trabalho?'] },
      hub: { name: 'Agenda e metas', tracks: ['Rotina da semana e status atual', 'Compromissos no calendário', 'Metas e ideias salvas no Inbox'], asks: ['Tô em reunião até as 10h.', 'Monta meu plano da semana?', 'Anota essa ideia pra mim.'] },
      family: { name: 'Família e amigos', tracks: ['Onde eu provavelmente estou, pela rotina e pelo status', 'Aviso no meu celular, com confirmação de entrega', 'Pedidos de encontro que eu aceito ou recuso'], asks: ['Onde o Lucas tá agora?', 'Avisa ele que é urgente.', 'Marca um bar com ele no sábado às 20h.'] },
    } as Record<AreaId, { name: string; tracks: string[]; asks: string[] }>,
  },
  status: {
    eyebrow: '04 / STATUS',
    title: 'Em desenvolvimento, já em uso.',
    intro: 'Onde o projeto está hoje, pelo que já está no código.',
    labels: { done: 'FUNCIONANDO', dev: 'EM DESENVOLVIMENTO', planned: 'PLANEJADO' } as Record<StatusId, string>,
    items: [
      { title: 'Conexão com o Obsidian', text: 'O NUBE lê o cofre "Mega Cérebro" pelo Dropbox.', status: 'done' as StatusId },
      { title: 'Chat com personalidade', text: 'Gemini 2.5 Flash com o jeito "Noob Analítico", análise de fotos e medidor de tokens.', status: 'done' as StatusId },
      { title: 'Moodle da PUCRS', text: 'Prazos buscados ao vivo e um resumo da semana gravado no cofre todo domingo.', status: 'done' as StatusId },
      { title: 'App, voz e microfone', text: 'Instala no celular, responde com voz em português gerada no aparelho e ouve pelo microfone.', status: 'done' as StatusId },
      { title: 'Família e amigos', text: 'Login próprio, avisos no meu celular com confirmação de entrega e pedidos de encontro no calendário.', status: 'done' as StatusId },
      { title: 'Dashboard e metas', text: 'Painel visual das áreas, das metas e do progresso.', status: 'dev' as StatusId },
    ],
  },
  notes: {
    eyebrow: '05 / PRIVACIDADE E SEGURANÇA',
    title: 'Pessoal de verdade.',
    items: [
      { title: 'A família vê só o essencial', text: 'Para quem tem acesso, o NUBE só conta onde eu provavelmente estou. Outros assuntos "só o Lucas pode contar", e compromissos de outras pessoas aparecem como "Ocupado".' },
      { title: 'Só o contexto necessário', text: 'O Gemini recebe apenas as notas da área da pergunta, nunca o cofre inteiro. Notas do trabalho só entram quando o assunto é trabalho.' },
      { title: 'Mexe pouco no cofre', text: 'Ele só grava o essencial (inbox, status, agenda, o resumo do Moodle e o histórico de conversa de cada pessoa) e nunca apaga notas.' },
      { title: 'Contas protegidas', text: 'Senhas com scrypt, sessão em cookie assinado e a lista de acessos guardada criptografada (AES-256-GCM).' },
      { title: 'Voz no aparelho', text: 'A voz em português (Piper) é baixada uma vez e gerada no próprio celular ou computador.' },
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
      'My personal assistant for everything. NUBE lives in the "Mega Cérebro" (Mega Brain), my Obsidian vault, and reads my college, gym, work and schedule notes to talk with me through Gemini. It works out what I still need to pass, checks deadlines on Moodle, saves ideas and handles my schedule. My family talks to it too: they ask where I probably am, ping my phone and set up meetings that I confirm.',
    tags: ['OBSIDIAN', 'GEMINI', 'DROPBOX', 'PWA', 'MOODLE', 'ON-DEVICE VOICE'],
    status: 'IN DEVELOPMENT',
    how: 'See how it works',
    chat: 'Chat with the site’s Nube',
    back: '← Back to projects',
    openSource: 'Already in use',
    barLeft: 'NUBE · PERSONAL ASSISTANT',
    barRight: 'IN DEVELOPMENT',
    demoLabel: 'ILLUSTRATIVE CONVERSATION',
    demo: [
      { area: 'COLLEGE', q: 'What do I need on the G2 exam for Multivariate Analysis?', a: 'I grabbed the course formula and your G1 grade from the vault and worked out what’s left. Easy does it: here’s the number and a study plan to farm that XP. ☁️' },
      { area: 'GYM', q: 'Did I skip the gym a lot this week?', a: 'Bro, there are back-to-back "skipped" entries in your training log... your build is getting nerfed. Here’s the patch: a short workout tomorrow and back to the Monday-to-Friday routine.' },
      { area: 'SCHEDULE', q: 'I’m in a meeting until 10am.', a: 'Got it! I set your status to "in a meeting" until 10:00. If your family asks about you, they’ll see that note. ☁️' },
      { area: 'FAMILY', q: 'Hi, NUBE! Where is Lucas right now?', a: 'Hi! Going by his routine, he’s probably in class right now. It’s an estimate, okay? Want me to ping his phone? ☁️' },
    ],
  },
  stats: [
    { value: 'Obsidian', label: '"Mega Cérebro" vault' },
    { value: 'Gemini', label: '2.5 Flash model' },
    { value: '5', label: 'vault areas' },
    { value: 'PWA', label: 'installs on the phone' },
  ],
  shot: {
    eyebrow: 'THE APP TODAY',
    title: 'This is NUBE right now.',
    intro: 'The app’s home screen on desktop: shortcuts to the day plan, assignments, Moodle, grades, workouts and calendar, plus the Gemini token meter.',
    alt: 'NUBE app home screen with the greeting "Bom dia, Lucas.", shortcuts and the box to ask NUBE',
  },
  overview: {
    eyebrow: '01 / OVERVIEW',
    title: 'An assistant that lives in my vault.',
    p1: 'Almost everything I do becomes a note in Obsidian: PUCRS courses, grades and assignments, workouts and diet, work meetings, my routine, goals and loose ideas. The problem is that this information is spread across many files.',
    p2: 'NUBE brings it all together. It reads the vault through Dropbox, picks only the notes for the area of the question and answers as the "Analytical Noob": a cute little creature on the outside, a senior analyst inside who finds the bug in my plan and suggests the patch.',
    facts: [
      { title: 'College', text: 'Courses, grades and assignments, with what I still need to pass and Moodle deadlines.' },
      { title: 'Gym', text: 'Workouts, training plans and diet, counting skipped days in the Monday-to-Friday routine.' },
      { title: 'Schedule', text: 'Routine, status ("in a meeting until 10am"), appointments and goals.' },
      { title: 'Family', text: 'People with access ask where I probably am and ping my phone.' },
    ],
  },
  how: {
    eyebrow: '02 / HOW IT WORKS',
    title: 'From notes to conversation.',
    intro: 'Each part has one job: Obsidian stores, Dropbox carries, NUBE picks the context and Gemini talks.',
    flow: [
      { tag: 'SOURCE', title: 'Obsidian', text: '"Mega Cérebro" vault in Markdown' },
      { tag: 'BRIDGE', title: 'Dropbox', text: 'Brings the vault to the app' },
      { tag: 'CONTEXT', title: 'NUBE', text: 'Picks only the notes for the question’s area' },
      { tag: 'MODEL', title: 'Gemini', text: '2.5 Flash, with tools' },
    ],
    cards: [
      { tag: '01 / CONTEXT', title: 'The right notes', text: 'Each question goes to the right area: college, health, work, schedule or inbox. Small talk doesn’t even open the vault, and a meter shows the tokens used that day.' },
      { tag: '02 / ACTIONS', title: 'Tools', text: 'Gemini can fetch live deadlines from Moodle, record my status, schedule appointments and save ideas to the Inbox. Those are the only things the model can write, and it never deletes anything.' },
      { tag: '03 / APP', title: 'PWA with voice', text: 'Installs on the phone as an app, understands photos (screenshots, whiteboards, exams, food) and has a microphone. The Portuguese voice (Piper) is generated on the device itself.' },
      { tag: '04 / FAMILY', title: 'Logins for family', text: 'Family and friends talk to a limited NUBE: it says where I probably am, sends a notification to my phone and sets up meetings that I approve in the calendar.' },
    ],
  },
  areas: {
    eyebrow: '03 / AREAS',
    title: 'One life, five fronts.',
    intro: 'Pick an area to see what NUBE tracks and the kind of question you can ask.',
    tracks: 'What it tracks',
    asks: 'Example questions',
    items: {
      college: { name: 'College', tracks: ['Courses, grading formula and posted grades', 'Assignments with deadlines and status', 'Moodle deadlines, live and in a weekly summary'], asks: ['How much do I still need to pass Multivariate Analysis?', 'Any new deadline on Moodle?'] },
      gym: { name: 'Gym', tracks: ['Logged workouts and skipped days', 'Training plans', 'Diet and meals'], asks: ['Did I skip the gym a lot this week?', 'Does what I ate today match the diet?'] },
      work: { name: 'Work', tracks: ['Meeting notes and tasks', 'Open internship items', 'Company data used only when the topic is work'], asks: ['What was left open from yesterday’s meeting?', 'Can you help me plan my work day?'] },
      hub: { name: 'Schedule and goals', tracks: ['Weekly routine and current status', 'Appointments on the calendar', 'Goals and ideas saved to the Inbox'], asks: ['I’m in a meeting until 10am.', 'Can you build my plan for the week?', 'Save this idea for me.'] },
      family: { name: 'Family and friends', tracks: ['Where I probably am, from my routine and status', 'A ping to my phone, with delivery confirmation', 'Meeting requests that I accept or decline'], asks: ['Where is Lucas right now?', 'Tell him it’s urgent.', 'Book a bar with him on Saturday at 8pm.'] },
    },
  },
  status: {
    eyebrow: '04 / STATUS',
    title: 'In development, already in use.',
    intro: 'Where the project stands today, based on what is already in the code.',
    labels: { done: 'WORKING', dev: 'IN DEVELOPMENT', planned: 'PLANNED' },
    items: [
      { title: 'Obsidian connection', text: 'NUBE reads the "Mega Cérebro" vault through Dropbox.', status: 'done' },
      { title: 'Chat with personality', text: 'Gemini 2.5 Flash with the "Analytical Noob" style, photo analysis and a token meter.', status: 'done' },
      { title: 'PUCRS Moodle', text: 'Deadlines fetched live, plus a weekly summary saved to the vault every Sunday.', status: 'done' },
      { title: 'App, voice and microphone', text: 'Installs on the phone, answers with a Portuguese voice generated on the device and listens through the microphone.', status: 'done' },
      { title: 'Family and friends', text: 'Their own login, pings to my phone with delivery confirmation and meeting requests on the calendar.', status: 'done' },
      { title: 'Dashboard and goals', text: 'A visual panel of the areas, goals and progress.', status: 'dev' },
    ],
  },
  notes: {
    eyebrow: '05 / PRIVACY AND SECURITY',
    title: 'Truly personal.',
    items: [
      { title: 'Family sees only the essentials', text: 'For people with access, NUBE only tells where I probably am. Anything else is something "only Lucas can tell", and other people’s appointments show up as "Busy".' },
      { title: 'Only the context it needs', text: 'Gemini only gets the notes for the question’s area, never the whole vault. Work notes only come in when the topic is work.' },
      { title: 'Light touch on the vault', text: 'It only writes the essentials (inbox, status, schedule, the Moodle summary and each person’s chat history) and never deletes notes.' },
      { title: 'Protected accounts', text: 'Passwords hashed with scrypt, a signed session cookie and the list of logins stored encrypted (AES-256-GCM).' },
      { title: 'Voice on the device', text: 'The Portuguese voice (Piper) is downloaded once and generated on the phone or computer itself.' },
      { title: 'Illustrative examples', text: 'The conversations shown here are examples of the kind of use, not real data.' },
    ],
  },
  end: { eyebrow: 'END OF PROJECT / NUBE', title: 'Shall we explore other projects?', button: 'Back to portfolio' },
  footer: '© 2026 · Lucas Leuck de Oliveira',
  top: 'Back to top ↑',
}

export const NUBE_COPY: Record<Language, Copy> = { pt: PT, en: EN }
export const AREA_IDS: AreaId[] = ['college', 'gym', 'work', 'hub', 'family']
