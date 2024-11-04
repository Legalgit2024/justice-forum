// Project Interface Module
const ProjectInterface = {
    init() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.participantInput = document.getElementById('participant-input');
        this.addParticipantButton = document.getElementById('add-participant');
        this.messageInput = document.getElementById('message-input');
        this.sendButton = document.getElementById('send-button');
        
        this.bindEvents();
        this.loadTheme();
        this.setupProjectCards();
        this.setupDropdowns();
    },

    bindEvents() {
        // Theme toggle
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());

        // Add participant
        this.addParticipantButton?.addEventListener('click', () => this.addParticipant());
        this.participantInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addParticipant();
            }
        });

        // Send message
        this.sendButton?.addEventListener('click', () => this.sendMessage());
        this.messageInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Submit comment
        const submitComment = document.getElementById('submit-comment');
        submitComment?.addEventListener('click', () => this.submitComment());
    },

    // Theme Management
    loadTheme() {
        const theme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon(theme);
    },

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    },

    updateThemeIcon(theme) {
        if (this.themeToggle) {
            this.themeToggle.textContent = theme === 'dark' ? '🌞' : '🌙';
        }
    },

    // Project Cards Management
    setupProjectCards() {
        document.querySelectorAll('.project-card').forEach(card => {
            const addButton = card.querySelector('[data-action="add"]');
            const closeButton = card.querySelector('[data-action="close"]');
            
            addButton?.addEventListener('click', () => this.addFile(card));
            closeButton?.addEventListener('click', () => this.closeProject(card));
        });
    },

    addFile(card) {
        const fileGrid = card.querySelector('.file-grid');
        if (fileGrid) {
            const fileBox = document.createElement('div');
            fileBox.className = 'file-box';
            fileBox.textContent = 'New File';
            fileGrid.appendChild(fileBox);
        }
    },

    closeProject(card) {
        card.style.display = 'none';
    },

    // Dropdowns Management
    setupDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.addEventListener('click', () => this.toggleDropdown(dropdown));
        });
    },

    toggleDropdown(dropdown) {
        dropdown.classList.toggle('active');
    },

    // Participant Management
    addParticipant() {
        if (!this.participantInput) return;
        
        const name = this.participantInput.value.trim();
        if (!name) return;

        const participants = this.getParticipants();
        if (!participants.includes(name)) {
            participants.push(name);
            localStorage.setItem('participants', JSON.stringify(participants));
            this.participantInput.value = '';
            this.participantInput.focus();
        }
    },

    getParticipants() {
        const stored = localStorage.getItem('participants');
        return stored ? JSON.parse(stored) : [];
    },

    // Comment Management
    submitComment() {
        const commentInput = document.getElementById('comment-input');
        if (!commentInput) return;

        const comment = commentInput.value.trim();
        if (!comment) return;

        const comments = this.getComments();
        comments.push({
            text: comment,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('comments', JSON.stringify(comments));
        commentInput.value = '';
        commentInput.focus();
    },

    getComments() {
        const stored = localStorage.getItem('comments');
        return stored ? JSON.parse(stored) : [];
    },

    // Message Handling
    sendMessage() {
        if (!this.messageInput) return;
        
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        const messages = this.getMessages();
        messages.push({
            text: message,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('messages', JSON.stringify(messages));
        this.messageInput.value = '';
        this.messageInput.focus();
    },

    getMessages() {
        const stored = localStorage.getItem('messages');
        return stored ? JSON.parse(stored) : [];
    }
};

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    ProjectInterface.init();
});
