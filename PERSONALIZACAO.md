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