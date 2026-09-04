// --- Dodging "No" Button Logic ---
const noBtn = document.getElementById('no-btn');

if (noBtn) {
    const dodgeButton = () => {
        const padding = 50;
        const maxX = window.innerWidth - noBtn.offsetWidth - padding;
        const maxY = window.innerHeight - noBtn.offsetHeight - padding;

        const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
        const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    };

    noBtn.addEventListener('mouseover', dodgeButton);
    noBtn.addEventListener('touchstart', dodgeButton);
}

// --- Interrogation Choice & Countdown Logic ---
function handleChoice(type, btnElement) {
    playAudio();

    // Disable all choice buttons
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
    });

    // Pop out selected button
    btnElement.classList.add('selected-btn');

    // Countdown logic
    let count = 5;
    const countdownEl = document.getElementById('countdown-timer');
    countdownEl.classList.remove('hidden');
    countdownEl.textContent = `Unlocking your note in ${count}...`;

    const timer = setInterval(() => {
        count--;
        if (count > 0) {
            countdownEl.textContent = `Unlocking your note in ${count}...`;
        } else {
            clearInterval(timer);
            
            // Hide interrogation card & countdown
            document.getElementById('interrogation-box').classList.add('hidden');
            countdownEl.classList.add('hidden');

            // Show notes container
            const notesContainer = document.getElementById('notes-container');
            notesContainer.classList.remove('hidden');

            if (type === 'yes') {
                document.getElementById('note-yes').classList.remove('hidden');
            } else if (type === 'bhot-jyaada') {
                document.getElementById('note-bhot-jyaada').classList.remove('hidden');
            }
        }
    }, 1000);
}

function goToChapters() {
    window.location.href = 'chapters.html';
}

// --- Chapter Content (Supports Multiple Paragraphs) ---
const chapterStories = {
    1: {
        title: "Chapter I: The Bond",
        paragraphs: [
            "You're genuinely the best person in my life. Having you around feels like having the best sister and friend all rolled into one.",
            "I cherish our bond more than you know, Yashu. From random talks to deep late-night conversations, every moment spent talking to you feels special.",
            "Write your longer story paragraph here..."
        ]
    },
    2: {
        title: "Chapter II: The Protagonist",
        paragraphs: [
            "I know you're usually lost in Webtoons or a dark romance on Wattpad, but today, you're the main character of this story.",
            "No tragic plot twists, no drama—just pure good vibes and someone who appreciates you endlessly.",
            "Write another story paragraph here..."
        ]
    },
    3: {
        title: "Chapter III: The Reveal",
        paragraphs: [
            "Happy Birthday, my Yashu! 🖤",
            "May this year bring you as much happiness, drama, and magic as the stories you love to read.",
            "I am always right here with you through everything."
        ]
    }
};

// --- Modal Functions ---
function openModal(chapterNum) {
    playAudio();
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.textContent = chapterStories[chapterNum].title;
    
    // Inject multiple paragraphs cleanly
    modalBody.innerHTML = chapterStories[chapterNum].paragraphs
        .map(para => `<p>${para}</p>`)
        .join('');

    modalOverlay.classList.remove('hidden');
}

function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) modalOverlay.classList.add('hidden');
}

// Close modal when clicking outside glass area
const modalOverlay = document.getElementById('modal-overlay');
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

// --- Leave a Message Form Handling ---
const messageForm = document.getElementById('message-form');
if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const textarea = document.getElementById('user-message');
        const feedback = document.getElementById('form-feedback');

        if (textarea.value.trim() !== '') {
            feedback.classList.remove('hidden');
            textarea.value = '';
            setTimeout(() => feedback.classList.add('hidden'), 4000);
        }
    });
}

// --- Music Autoplay Support ---
function playAudio() {
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic && bgMusic.paused) {
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio waiting for user gesture:", e));
    }
}

// Global click trigger to start music if autoplay is blocked
document.addEventListener('click', playAudio, { once: true });
