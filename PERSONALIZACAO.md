# Guia de Personalização - Portfólio Lucas Leuck

## 🎨 Personalização Rápida

### 1. Foto de Perfil
**Localização**: `app/page.tsx` - Linha 58

```typescript
// Substitua a URL da imagem
<img
  src="/profile-photo.jpg" // ← COLOQUE A URL DA SUA FOTO AQUI
  alt="Lucas Leuck"
  className="w-full h-full object-cover"
/>
```

**Opções para adicionar sua foto:**
1. **Arquivo local**: Coloque sua foto na pasta `public/` e use `/nome-da-foto.jpg`
2. **URL externa**: Use uma URL completa como `https://exemplo.com/sua-foto.jpg`
3. **Fallback**: Se a imagem não carregar, aparecerá um placeholder com suas iniciais

### 2. Informações Pessoais
Edite o arquivo `lib/i18n.ts`:

```typescript
// Português
pt: {
  home: {
    title: 'Lucas Leuck de Oliveira',  // ← Seu nome
    subtitle: 'Data Science & AI Student | Python | Power BI | Automation Enthusiast',  // ← Sua descrição
  },
  about: {
    description: 'Sou estudante de Ciência de Dados...',  // ← Sua bio
  },
}

// Inglês
en: {
  home: {
    title: 'Lucas Leuck de Oliveira',  // ← Seu nome
    subtitle: 'Data Science & AI Student | Python | Power BI | Automation Enthusiast',  // ← Sua descrição
  },
  about: {
    description: 'I am a Data Science student...',  // ← Sua bio
  },
}
```

### 3. Projetos
Modifique o array `projects` em `app/page.tsx` (linhas 15-35):

```typescript
const projects = [
  {
    title: "Nome do Projeto",           // ← Título do projeto
    description: "Descrição detalhada", // ← Descrição
    technologies: ["Tech1", "Tech2"],   // ← Tecnologias usadas
    githubUrl: "https://github.com/seu-usuario/projeto", // ← Link GitHub
    liveUrl: "https://demo.vercel.app"  // ← Link demo (opcional)
  },
  // Adicione mais projetos aqui...
]
```

### 4. Links de Contato
Atualize os links na seção de contato (linhas 200-230):

```typescript
// LinkedIn
href="https://www.linkedin.com/in/lucas-leuck-a58332353/"  // ← Seu LinkedIn
<span className="text-sm text-secondary">lucasleuck</span>  // ← Seu username

// GitHub
href="https://github.com/lucasnk1"  // ← Seu GitHub
<span className="text-sm text-secondary">lucasnk1</span>  // ← Seu username

// Email
href="mailto:lucas.oliveria014@edu.pucrs.br"  // ← Seu email
<span className="text-sm text-secondary">lucas.oliveria014@edu.pucrs.br</span>  // ← Seu email
```

### 5. Habilidades (Skills)
Edite o arquivo `lib/skills.ts` para personalizar suas habilidades:

```typescript
export const skillsData: SkillCategory[] = [
  {
    title: 'Data Science',
    skills: [
      {
        name: 'Python',
        icon: Code,  // ← Ícone do Lucide React
        description: 'A general-purpose programming language...'  // ← Descrição
      },
      // Adicione mais habilidades...
    ]
  },
  // Adicione mais categorias...
]
```

### 6. Cores e Tema
Edite `tailwind.config.js`:

```javascript
colors: {
  background: '#0a0a0a',    // ← Cor de fundo
  foreground: '#ffffff',    // ← Cor do texto
  primary: '#3b82f6',       // ← Cor primária (azul)
  secondary: '#64748b',     // ← Cor secundária (cinza)
  accent: '#06b6d4',        // ← Cor de destaque (ciano)
}
```

### 7. Currículo PDF
1. Adicione seu arquivo PDF na pasta `public/`
2. Renomeie para `resume-lucas-leuck.pdf`
3. O botão de download funcionará automaticamente

## 🌍 Internacionalização

O site agora suporta português e inglês! Para adicionar novos idiomas:

1. **Adicione o novo idioma** em `lib/i18n.ts`:
```typescript
export type Language = 'pt' | 'en' | 'es'  // ← Adicione o novo código

export const translations: Record<Language, Translations> = {
  pt: { /* português */ },
  en: { /* inglês */ },
  es: { /* espanhol */ },  // ← Adicione as traduções
}
```

2. **Atualize o toggle** em `components/LanguageToggle.tsx`

## 🚀 Deploy na Vercel

### Passo a Passo:

1. **Crie uma conta na Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub

2. **Conecte o repositório**
   - Clique em "New Project"
   - Importe seu repositório do GitHub
   - Selecione o repositório do portfólio

3. **Configure o projeto**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build (2-3 minutos)
   - Seu site estará disponível em `https://seu-projeto.vercel.app`

## 📱 Teste de Responsividade

Após o deploy, teste em diferentes dispositivos:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Teste local de produção
npm run start

# Verificação de código
npm run lint
```

## 📝 Checklist de Personalização

- [ ] Foto de perfil adicionada
- [ ] Nome e descrição atualizados (PT/EN)
- [ ] Bio personalizada (PT/EN)
- [ ] Projetos reais adicionados
- [ ] Links de contato corretos
- [ ] Habilidades personalizadas
- [ ] Currículo PDF adicionado
- [ ] Cores personalizadas (se desejar)
- [ ] Teste em diferentes dispositivos
- [ ] Deploy na Vercel

## 🎯 Próximos Passos

1. **Personalize o conteúdo** seguindo este guia
2. **Adicione sua foto** na pasta `public/`
3. **Teste localmente** com `npm run dev`
4. **Faça o deploy** na Vercel
5. **Compartilhe** seu portfólio!

## 🆕 Novas Funcionalidades

### ✅ Implementadas:
- 🌍 **Internacionalização** (PT/EN)
- 📸 **Foto de perfil** circular
- 🎯 **Botão de contato** mais chamativo
- 📄 **Download CV** mais discreto
- 🛠️ **Seção Skills** com modal interativo
- 📱 **Design responsivo** aprimorado

### 🎨 Características do Design:
- **Tema escuro** elegante e moderno
- **Animações suaves** com Framer Motion
- **Modal interativo** para descrições das habilidades
- **Toggle de idioma** no header
- **Scrollspy** com destaque da seção ativa
- **Hover effects** em todos os elementos interativos

---

**Dica**: Mantenha o design limpo e foque no conteúdo. Menos é mais! 🎨 