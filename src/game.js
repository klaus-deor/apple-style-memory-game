// Log inicial para confirmar que o script foi carregado
console.log('🎮 Memory Game: Script carregado com sucesso');

class MemoryGame {
  constructor() {
    console.log('🎮 Memory Game: Construtor iniciado');
    
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.startTime = null;
    this.timerInterval = null;
    
    // Verificar se os elementos existem no DOM
    this.gameBoard = document.getElementById('gameBoard');
    this.timerElement = document.getElementById('timer');
    this.movesElement = document.getElementById('moves');
    this.pairsElement = document.getElementById('pairs');
    this.victoryModal = document.getElementById('victoryModal');
    this.newGameBtn = document.getElementById('newGameBtn');
    this.playAgainBtn = document.getElementById('playAgainBtn');
    
    console.log('🎮 Memory Game: Elementos do DOM encontrados:', {
      gameBoard: !!this.gameBoard,
      timerElement: !!this.timerElement,
      movesElement: !!this.movesElement,
      pairsElement: !!this.pairsElement,
      victoryModal: !!this.victoryModal,
      newGameBtn: !!this.newGameBtn,
      playAgainBtn: !!this.playAgainBtn
    });
    
    // Símbolos para as cartas (usando emojis minimalistas)
    this.symbols = ['●', '■', '▲', '♦', '◆', '▼', '◐', '◑'];
    console.log('🎮 Memory Game: Símbolos definidos:', this.symbols);
    
    this.init();
  }

  init() {
    console.log('🎮 Memory Game: Inicialização começou');
    this.setupEventListeners();
    this.createNewGame();
    console.log('🎮 Memory Game: Inicialização concluída');
  }

  setupEventListeners() {
    console.log('🎮 Memory Game: Configurando event listeners');
    
    if (this.newGameBtn) {
      this.newGameBtn.addEventListener('click', () => this.createNewGame());
      console.log('🎮 Memory Game: Event listener do botão "Novo Jogo" adicionado');
    } else {
      console.error('❌ Memory Game: Botão "Novo Jogo" não encontrado!');
    }
    
    if (this.playAgainBtn) {
      this.playAgainBtn.addEventListener('click', () => {
        this.hideVictoryModal();
        this.createNewGame();
      });
      console.log('🎮 Memory Game: Event listener do botão "Jogar Novamente" adicionado');
    } else {
      console.error('❌ Memory Game: Botão "Jogar Novamente" não encontrado!');
    }
  }

  createNewGame() {
    console.log('🎮 Memory Game: Criando novo jogo');
    
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.startTime = null;
    
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    
    this.updateUI();
    this.generateCards();
    this.renderCards();
    
    console.log('🎮 Memory Game: Novo jogo criado com sucesso');
  }

  generateCards() {
    console.log('🎮 Memory Game: Gerando cartas');
    
    // Criar pares de cartas
    const cardPairs = [];
    this.symbols.forEach(symbol => {
      cardPairs.push({ symbol, id: Math.random() });
      cardPairs.push({ symbol, id: Math.random() });
    });
    
    console.log('🎮 Memory Game: Pares de cartas criados:', cardPairs.length, 'cartas');
    
    // Embaralhar cartas
    this.cards = this.shuffleArray(cardPairs);
    
    console.log('🎮 Memory Game: Cartas embaralhadas:', this.cards.length, 'cartas');
    console.log('🎮 Memory Game: Primeira carta:', this.cards[0]);
  }

  shuffleArray(array) {
    console.log('🎮 Memory Game: Embaralhando array de', array.length, 'elementos');
    
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    console.log('🎮 Memory Game: Array embaralhado com sucesso');
    return shuffled;
  }

  renderCards() {
    console.log('🎮 Memory Game: Iniciando renderização das cartas');
    
    if (!this.gameBoard) {
      console.error('❌ Memory Game: gameBoard não encontrado! Não é possível renderizar cartas.');
      return;
    }
    
    console.log('🎮 Memory Game: gameBoard encontrado, limpando conteúdo anterior');
    this.gameBoard.innerHTML = '';
    
    console.log('🎮 Memory Game: Renderizando', this.cards.length, 'cartas');
    
    this.cards.forEach((card, index) => {
      console.log(`🎮 Memory Game: Criando carta ${index + 1}/${this.cards.length} - Símbolo: ${card.symbol}`);
      
      const cardElement = document.createElement('div');
      cardElement.className = 'memory-card';
      cardElement.dataset.index = index;
      
      const cardContent = document.createElement('div');
      cardContent.className = 'card-content';
      cardContent.textContent = card.symbol;
      
      cardElement.appendChild(cardContent);
      cardElement.addEventListener('click', (e) => this.handleCardClick(e));
      
      this.gameBoard.appendChild(cardElement);
      
      console.log(`🎮 Memory Game: Carta ${index + 1} adicionada ao DOM`);
      
      // Animação de entrada
      setTimeout(() => {
        cardElement.style.opacity = '1';
        cardElement.style.transform = 'translateY(0)';
        console.log(`🎮 Memory Game: Animação de entrada aplicada à carta ${index + 1}`);
      }, index * 50);
    });
    
    console.log('🎮 Memory Game: Todas as cartas foram renderizadas');
    console.log('🎮 Memory Game: Número de elementos .memory-card no DOM:', document.querySelectorAll('.memory-card').length);
  }

  handleCardClick(event) {
    console.log('🎮 Memory Game: Carta clicada');
    
    const cardElement = event.currentTarget;
    const cardIndex = parseInt(cardElement.dataset.index);
    
    console.log('🎮 Memory Game: Índice da carta clicada:', cardIndex);
    
    // Verificar se a carta já está virada ou matched
    if (cardElement.classList.contains('flipped') || 
        cardElement.classList.contains('matched') ||
        this.flippedCards.length >= 2) {
      console.log('🎮 Memory Game: Clique ignorado - carta já virada, matched ou limite atingido');
      return;
    }
    
    // Iniciar timer no primeiro clique
    if (!this.startTime) {
      console.log('🎮 Memory Game: Iniciando timer');
      this.startTimer();
    }
    
    // Virar carta
    this.flipCard(cardElement, cardIndex);
  }

  flipCard(cardElement, cardIndex) {
    console.log('🎮 Memory Game: Virando carta', cardIndex);
    
    cardElement.classList.add('flipping');
    
    setTimeout(() => {
      cardElement.classList.remove('flipping');
      cardElement.classList.add('flipped');
      
      this.flippedCards.push({ element: cardElement, index: cardIndex });
      
      console.log('🎮 Memory Game: Carta virada. Total de cartas viradas:', this.flippedCards.length);
      
      if (this.flippedCards.length === 2) {
        this.moves++;
        this.updateUI();
        this.checkForMatch();
      }
    }, 300);
  }

  checkForMatch() {
    console.log('🎮 Memory Game: Verificando match');
    
    const [card1, card2] = this.flippedCards;
    const symbol1 = this.cards[card1.index].symbol;
    const symbol2 = this.cards[card2.index].symbol;
    
    console.log('🎮 Memory Game: Comparando símbolos:', symbol1, 'vs', symbol2);
    
    setTimeout(() => {
      if (symbol1 === symbol2) {
        console.log('🎮 Memory Game: Match encontrado!');
        
        // Match encontrado
        card1.element.classList.remove('flipped');
        card2.element.classList.remove('flipped');
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');
        
        this.matchedPairs++;
        this.updateUI();
        
        console.log('🎮 Memory Game: Pares encontrados:', this.matchedPairs, '/', this.symbols.length);
        
        if (this.matchedPairs === this.symbols.length) {
          console.log('🎮 Memory Game: Jogo ganho!');
          this.handleGameWin();
        }
      } else {
        console.log('🎮 Memory Game: Não é match - virando cartas de volta');
        
        // Não é match - virar cartas de volta
        card1.element.classList.remove('flipped');
        card2.element.classList.remove('flipped');
      }
      
      this.flippedCards = [];
    }, 1000);
  }

  handleGameWin() {
    console.log('🎮 Memory Game: Processando vitória');
    
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    setTimeout(() => {
      this.showVictoryModal();
    }, 500);
  }

  showVictoryModal() {
    console.log('🎮 Memory Game: Mostrando modal de vitória');
    
    const finalTime = this.timerElement.textContent;
    const finalMoves = this.moves;
    
    document.getElementById('finalTime').textContent = finalTime;
    document.getElementById('finalMoves').textContent = finalMoves;
    
    this.victoryModal.classList.add('show');
  }

  hideVictoryModal() {
    console.log('🎮 Memory Game: Escondendo modal de vitória');
    this.victoryModal.classList.remove('show');
  }

  startTimer() {
    console.log('🎮 Memory Game: Timer iniciado');
    
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      const elapsed = Date.now() - this.startTime;
      const minutes = Math.floor(elapsed / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      
      this.timerElement.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  }

  updateUI() {
    console.log('🎮 Memory Game: Atualizando UI - Movimentos:', this.moves, 'Pares:', this.matchedPairs);
    
    if (this.movesElement) {
      this.movesElement.textContent = this.moves;
    }
    
    if (this.pairsElement) {
      this.pairsElement.textContent = `${this.matchedPairs}/${this.symbols.length}`;
    }
  }
}

// Inicializar jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎮 Memory Game: DOM carregado, inicializando jogo');
  
  try {
    new MemoryGame();
    console.log('🎮 Memory Game: Jogo inicializado com sucesso');
  } catch (error) {
    console.error('❌ Memory Game: Erro ao inicializar jogo:', error);
  }
});

// Log adicional para verificar se o script chegou ao final
console.log('🎮 Memory Game: Script processado completamente');