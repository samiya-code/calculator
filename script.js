class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetScreen = false;
        this.history = [];
        this.theme = localStorage.getItem('calculator-theme') || 'light';
        
        this.initElements();
        this.initEventListeners();
        this.applyTheme();
        this.loadHistory();
    }
    
    initElements() {
        this.primaryDisplay = document.getElementById('primary-display');
        this.secondaryDisplay = document.getElementById('secondary-display');
        this.historyPanel = document.getElementById('history-panel');
        this.historyList = document.getElementById('history-list');
        this.themeBtn = document.getElementById('theme-btn');
        this.clearHistoryBtn = document.getElementById('clear-history');
        
        this.numberButtons = document.querySelectorAll('[data-number]');
        this.operatorButtons = document.querySelectorAll('[data-operator]');
        this.actionButtons = document.querySelectorAll('[data-action]');
    }
    
    initEventListeners() {
        // Number buttons
        this.numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.dataset.number);
            });
        });
        
        // Operator buttons
        this.operatorButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.setOperation(button.dataset.operator);
            });
        });
        
        // Action buttons
        this.actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                switch(action) {
                    case 'clear':
                        this.clear();
                        break;
                    case 'toggle-sign':
                        this.toggleSign();
                        break;
                    case 'percent':
                        this.percent();
                        break;
                    case 'decimal':
                        this.appendDecimal();
                        break;
                    case 'equals':
                        this.equals();
                        break;
                }
            });
        });
        
        // Theme toggle
        this.themeBtn.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Clear history
        this.clearHistoryBtn.addEventListener('click', () => {
            this.clearHistory();
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
        
        // Toggle history panel on double click display
        this.primaryDisplay.addEventListener('dblclick', () => {
            this.toggleHistory();
        });
    }
    
    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentValue = '';
            this.shouldResetScreen = false;
        }
        
        if (this.currentValue === '0') {
            this.currentValue = number;
        } else {
            this.currentValue += number;
        }
        
        this.updateDisplay();
    }
    
    appendDecimal() {
        if (this.shouldResetScreen) {
            this.currentValue = '0';
            this.shouldResetScreen = false;
        }
        
        if (!this.currentValue.includes('.')) {
            this.currentValue += '.';
        }
        
        this.updateDisplay();
    }
    
    setOperation(operator) {
        if (this.operation !== null) this.equals();
        
        this.previousValue = this.currentValue;
        this.operation = operator;
        this.shouldResetScreen = true;
        
        this.updateDisplay();
    }
    
    equals() {
        if (this.operation === null || this.shouldResetScreen) return;
        
        let computation;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        
        switch(this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    this.showError('Cannot divide by zero');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        // Add to history
        const expression = `${this.previousValue} ${this.getOperatorSymbol(this.operation)} ${this.currentValue}`;
        this.addToHistory(expression, computation.toString());
        
        this.currentValue = this.formatResult(computation);
        this.operation = null;
        this.previousValue = '';
        this.shouldResetScreen = true;
        
        this.updateDisplay();
    }
    
    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetScreen = false;
        this.updateDisplay();
    }
    
    toggleSign() {
        this.currentValue = (parseFloat(this.currentValue) * -1).toString();
        this.updateDisplay();
    }
    
    percent() {
        this.currentValue = (parseFloat(this.currentValue) / 100).toString();
        this.updateDisplay();
    }
    
    formatResult(number) {
        // Handle very large or very small numbers
        if (Math.abs(number) > 999999999 || (Math.abs(number) < 0.000001 && number !== 0)) {
            return number.toExponential(6);
        }
        
        // Round to avoid floating point precision issues
        const rounded = Math.round(number * 100000000) / 100000000;
        
        // Convert to string and remove trailing zeros
        let result = rounded.toString();
        if (result.includes('.')) {
            result = result.replace(/\.?0+$/, '');
        }
        
        return result;
    }
    
    getOperatorSymbol(operator) {
        switch(operator) {
            case '+': return '+';
            case '-': return '-';
            case '*': return '×';
            case '/': return '÷';
            default: return operator;
        }
    }
    
    updateDisplay() {
        this.primaryDisplay.textContent = this.currentValue;
        
        if (this.operation !== null) {
            this.secondaryDisplay.textContent = `${this.previousValue} ${this.getOperatorSymbol(this.operation)}`;
        } else {
            this.secondaryDisplay.textContent = '';
        }
    }
    
    showError(message) {
        this.primaryDisplay.textContent = 'Error';
        this.secondaryDisplay.textContent = message;
        this.shouldResetScreen = true;
        
        setTimeout(() => {
            this.clear();
        }, 2000);
    }
    
    handleKeyboard(e) {
        e.preventDefault();
        
        // Numbers
        if (e.key >= '0' && e.key <= '9') {
            this.appendNumber(e.key);
        }
        
        // Decimal
        else if (e.key === '.') {
            this.appendDecimal();
        }
        
        // Operators
        else if (e.key === '+') {
            this.setOperation('+');
        } else if (e.key === '-') {
            this.setOperation('-');
        } else if (e.key === '*') {
            this.setOperation('*');
        } else if (e.key === '/') {
            this.setOperation('/');
        }
        
        // Equals
        else if (e.key === 'Enter' || e.key === '=') {
            this.equals();
        }
        
        // Clear
        else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
            this.clear();
        }
        
        // Backspace
        else if (e.key === 'Backspace') {
            if (this.currentValue.length > 1) {
                this.currentValue = this.currentValue.slice(0, -1);
            } else {
                this.currentValue = '0';
            }
            this.updateDisplay();
        }
        
        // Percent
        else if (e.key === '%') {
            this.percent();
        }
    }
    
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('calculator-theme', this.theme);
    }
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Update theme button icon
        if (this.theme === 'dark') {
            this.themeBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            `;
        } else {
            this.themeBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            `;
        }
    }
    
    toggleHistory() {
        this.historyPanel.classList.toggle('show');
    }
    
    addToHistory(expression, result) {
        const historyItem = {
            expression,
            result,
            timestamp: new Date().toISOString()
        };
        
        this.history.unshift(historyItem);
        
        // Keep only last 50 items
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        this.saveHistory();
        this.renderHistory();
    }
    
    renderHistory() {
        this.historyList.innerHTML = '';
        
        this.history.forEach((item, index) => {
            const historyElement = document.createElement('div');
            historyElement.className = 'history-item';
            historyElement.innerHTML = `
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">= ${item.result}</div>
            `;
            
            historyElement.addEventListener('click', () => {
                this.currentValue = item.result;
                this.updateDisplay();
                this.shouldResetScreen = true;
            });
            
            this.historyList.appendChild(historyElement);
        });
    }
    
    saveHistory() {
        localStorage.setItem('calculator-history', JSON.stringify(this.history));
    }
    
    loadHistory() {
        const savedHistory = localStorage.getItem('calculator-history');
        if (savedHistory) {
            this.history = JSON.parse(savedHistory);
            this.renderHistory();
        }
    }
    
    clearHistory() {
        this.history = [];
        this.saveHistory();
        this.renderHistory();
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Prevent zoom on double tap for mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});
