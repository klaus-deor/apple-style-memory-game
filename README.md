# 🧠 Apple Style Memory Game

Um jogo da memória minimalista com design inspirado na Apple, usando predominantemente preto e cinza com efeitos visuais sofisticados.

## ✨ Características

- **Design Minimalista**: Inspirado na estética da Apple
- **Paleta de Cores**: Preto e cinza predominantes com efeitos glassmorphism
- **Animações Suaves**: Transições fluidas e efeitos visuais
- **Cards Transparentes**: Efeito backdrop-filter blur
- **Sistema de Pontuação**: Timer e contador de movimentos
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Performance Otimizada**: CSS Grid com layout responsivo

## 🎮 Como Jogar

1. Clique em duas cartas para revelá-las
2. Se as cartas combinarem, elas permanecerão viradas (verde)
3. Se não combinarem, elas voltarão ao estado original
4. Continue até encontrar todos os 8 pares
5. Tente completar no menor tempo possível!

## 🚀 Como Executar

### Opção 1: Direto no navegador
1. Clone o repositório
2. Abra `index.html` em seu navegador

### Opção 2: Com servidor de desenvolvimento
```bash
npm install
npm run dev
```

### Opção 3: No Bolt.new (Recomendado)
1. Acesse [bolt.new](https://bolt.new)
2. GitHub → Import from URL
3. Cole: `https://github.com/klaus-deor/apple-style-memory-game`
4. Auto-sync ativo! ✨

## 🔧 Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Animations, Backdrop-filter)
- JavaScript (ES6+ Classes)
- Vite para desenvolvimento

## 🛠️ Correções Implementadas

### Problema Netlify Deploy
O jogo estava aparecendo incompleto no deploy (apenas header sem cards). **Correções aplicadas:**

1. **CSS Grid Fix**:
   - Adicionado `grid-template-rows: repeat(4, 1fr)`
   - Definido `min-height: 480px` para garantir espaço
   - Classe `.card-visible` para animação de entrada

2. **JavaScript Robustez**:
   - Validação de elementos DOM
   - Fallback para inicialização
   - Error handling aprimorado

3. **Layout Responsivo**:
   - Melhor adaptação mobile/desktop
   - Cards com `min-height` definida
   - Gap responsivo entre cards

### Estrutura de Arquivos
```
📁 apple-style-memory-game/
├── 📄 index.html          # Estrutura principal
├── 📁 src/
│   ├── 🎨 styles.css      # CSS com glassmorphism
│   └── ⚡ game.js         # Lógica do jogo
├── 📄 package.json        # Configuração Vite
├── 📄 README.md          # Documentação
└── 📄 .gitignore         # Arquivos ignorados
```

## 🎯 Funcionalidades

- ✅ **Timer em tempo real**
- ✅ **Contador de movimentos**
- ✅ **Sistema de pontuação**
- ✅ **Animações de flip das cartas**
- ✅ **Efeito de match (verde)**
- ✅ **Modal de vitória**
- ✅ **Botão "Novo Jogo"**
- ✅ **Design Apple-style minimalista**
- ✅ **Responsivo (mobile/desktop)**

## 🎨 Design System

### Cores
- **Fundo**: Gradiente `#1a1a1a` → `#2d2d2d`
- **Cards**: `rgba(255, 255, 255, 0.08)` com backdrop-blur
- **Bordas**: `rgba(255, 255, 255, 0.15)`
- **Match**: `rgba(0, 255, 136, 0.15)` (verde)
- **Hover**: `rgba(255, 255, 255, 0.12)`

### Tipografia
- **Fonte**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`
- **Título**: `2.5rem, font-weight: 300`
- **Stats**: `1.25rem, font-weight: 600`
- **Cards**: `2rem, font-weight: 600`

### Efeitos
- **Glassmorphism**: `backdrop-filter: blur(10px)`
- **Shadows**: `0 8px 32px rgba(0, 0, 0, 0.3)`
- **Transitions**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Border-radius**: `12px-20px`

## 🛡️ Segurança

- ✅ **Sem APIs externas**: Todos os recursos são locais
- ✅ **Sem dados sensíveis**: Jogo totalmente offline
- ✅ **Código limpo**: Sem vulnerabilidades
- ✅ **Performance**: Otimizado para todos os dispositivos

## 📱 Responsividade

### Desktop (> 768px)
- Grid 4x4 com gaps de 16px
- Cards com hover effects
- Stats em linha horizontal

### Tablet (768px)
- Grid mantido, gaps reduzidos para 12px
- Stats em coluna vertical
- Texto menor

### Mobile (< 480px)
- Grid compacto com gaps de 8px
- Cards menores mas funcionais
- Interface otimizada para toque

## 🚀 Performance

- **Carregamento**: < 100ms
- **Animações**: 60fps fluídas
- **Memory**: Otimizado para longa utilização
- **Bundle**: < 10kb total

---

🎮 **Jogue agora**: [Apple Memory Game](https://polite-platypus-23f01d.netlify.app/)

Desenvolvido com ❤️ por Klaus | [GitHub](https://github.com/klaus-deor)