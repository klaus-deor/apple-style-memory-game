class MemoryGame {
  constructor() {
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.startTime = null;
    this.timerInterval = null;
    this.gameBoard = document.getElementById('gameBoard');
    this.timerElement = document.getElementById('timer');
    this.movesElement = document.getElementById('moves');
    this.pairsElement = document.getElementById('pairs');
    this.victoryModal = document.getElementById('victoryModal');
    this.newGameBtn = document.getElementById('newGameBtn');
    this.playAgainBtn = document.getElementById('playAgainBtn');
    
    // Símbolos para as cartas (usando emojis minimalistas)
    this.symbols = ['●', '■', '▲', '♦', '◆', '▼', '◐', '◑'];
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.createNewGame();
  }

  setupEventListeners() {
    if (this.newGameBtn) {
      this.newGameBtn.addEventListener('click', () => this.createNewGame());
    }
    
    if (this.playAgainBtn) {
      this.playAgainBtn.addEventListener('click', () => {
        this.hideVictoryModal();
        this.createNewGame();
      });
    }
  }

  createNewGame() {
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
  }

  generateCards() {
    // Criar pares de cartas
    const cardPairs = [];
    this.symbols.forEach(symbol => {
      cardPairs.push({ symbol, id: Math.random() });
      cardPairs.push({ symbol, id: Math.random() });
    });
    
    // Embaralhar cartas
    this.cards = this.shuffleArray(cardPairs);
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  renderCards() {
    if (!this.gameBoard) {
      console.error('Game board not found!');
      return;
    }
    
    this.gameBoard.innerHTML = '';
    
    this.cards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'memory-card';
      cardElement.dataset.index = index;
      
      const cardContent = document.createElement('div');
      cardContent.className = 'card-content';
      cardContent.textContent = card.symbol;
      
      cardElement.appendChild(cardContent);
      cardElement.addEventListener('click', (e) => this.handleCardClick(e));
      
      this.gameBoard.appendChild(cardElement);
      
      // Animação de entrada com classe específica
      setTimeout(() => {
        cardElement.classList.add('card-visible');
      }, index * 50);
    });
  }

  handleCardClick(event) {
    const cardElement = event.currentTarget;
    const cardIndex = parseInt(cardElement.dataset.index);
    
    // Verificar se a carta já está virada ou matched
    if (cardElement.classList.contains('flipped') || 
        cardElement.classList.contains('matched') ||
        this.flippedCards.length >= 2) {
      return;
    }
    
    // Iniciar timer no primeiro clique
    if (!this.startTime) {
      this.startTimer();
    }
    
    // Virar carta
    this.flipCard(cardElement, cardIndex);
  }

  flipCard(cardElement, cardIndex) {
    cardElement.classList.add('flipping');
    
    setTimeout(() => {
      cardElement.classList.remove('flipping');
      cardElement.classList.add('flipped');
      
      this.flippedCards.push({ element: cardElement, index: cardIndex });
      
      if (this.flippedCards.length === 2) {
        this.moves++;
        this.updateUI();
        this.checkForMatch();
      }
    }, 300);
  }

  checkForMatch() {
    const [card1, card2] = this.flippedCards;
    const symbol1 = this.cards[card1.index].symbol;
    const symbol2 = this.cards[card2.index].symbol;
    
    setTimeout(() => {
      if (symbol1 === symbol2) {
        // Match encontrado
        card1.element.classList.remove('flipped');
        card2.element.classList.remove('flipped');
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');
        
        this.matchedPairs++;
        this.updateUI();
        
        if (this.matchedPairs === this.symbols.length) {
          this.handleGameWin();
        }
      } else {
        // Não é match - virar cartas de volta
        card1.element.classList.remove('flipped');
        card2.element.classList.remove('flipped');
      }
      
      this.flippedCards = [];
    }, 1000);
  }

  handleGameWin() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    setTimeout(() => {
      this.showVictoryModal();
    }, 500);
  }

  showVictoryModal() {
    const finalTime = this.timerElement ? this.timerElement.textContent : '00:00';
    const finalMoves = this.moves;
    
    const finalTimeElement = document.getElementById('finalTime');
    const finalMovesElement = document.getElementById('finalMoves');
    
    if (finalTimeElement) finalTimeElement.textContent = finalTime;
    if (finalMovesElement) finalMovesElement.textContent = finalMoves;
    
    if (this.victoryModal) {
      this.victoryModal.classList.add('show');
    }
  }

  hideVictoryModal() {
    if (this.victoryModal) {
      this.victoryModal.classList.remove('show');
    }
  }

  startTimer() {
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      const elapsed = Date.now() - this.startTime;
      const minutes = Math.floor(elapsed / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      
      if (this.timerElement) {
        this.timerElement.textContent = 
          `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }, 1000);
  }

  updateUI() {
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
  try {
    new MemoryGame();
  } catch (error) {
    console.error('Error initializing game:', error);
  }
});

// Fallback para inicialização se DOMContentLoaded já passou
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new MemoryGame());
} else {
  new MemoryGame();
}