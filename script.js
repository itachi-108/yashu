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
    playChapterAudio(1);

    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
    });

    btnElement.classList.add('selected-btn');

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
            
            document.getElementById('interrogation-box').classList.add('hidden');
            countdownEl.classList.add('hidden');

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

// --- Chapter Locking & Multi-Paragraph Content ---
let unlockedChapter = 1;
let currentActiveChapter = null;

const chapterStories = {
    1: {
        title: "Chapter I: The Bond",
        paragraphs: [
            "You're genuinely the best person in my life. Having you around feels like having the best sister and friend all rolled into one.",
            "I cherish our bond more than you know, Yashu. From random talks to deep late-night conversations, every moment spent talking to you feels special.",
            "Write your story paragraph here..."
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

// --- Modal & Unlocking Logic ---
function openModal(chapterNum) {
    if (chapterNum > unlockedChapter) return; // Prevent opening locked chapters

    currentActiveChapter = chapterNum;
    playChapterAudio(chapterNum);

    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.textContent = chapterStories[chapterNum].title;
    
    modalBody.innerHTML = chapterStories[chapterNum].paragraphs
        .map(para => `<p>${para}</p>`)
        .join('');

    modalOverlay.classList.remove('hidden');
}

function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) modalOverlay.classList.add('hidden');

    // Unlock next chapter on closing modal
    if (currentActiveChapter === unlockedChapter && unlockedChapter < 3) {
        unlockedChapter++;
        unlockNextChapterCard(unlockedChapter);
    }
}

function unlockNextChapterCard(nextChapterNum) {
    const card = document.getElementById(`chapter-card-${nextChapterNum}`);
    const lockIcon = document.getElementById(`lock-${nextChapterNum}`);

    if (card) {
        card.classList.remove('locked');
        if (lockIcon) lockIcon.remove();

        // Trigger Glow & Heart Explosion Effect
        card.classList.add('unlock-glow');
        triggerHeartBurst(card);

        setTimeout(() => {
            card.classList.remove('unlock-glow');
        }, 1500);
    }
}

// --- Heart Particles Celebration Effect ---
function triggerHeartBurst(targetElement) {
    const rect = targetElement.getBoundingClientRect();
    const heartSymbols = ['💖', '🖤', '✨', '🌸', '💕'];

    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        const randomX = rect.left + (Math.random() * rect.width);
        const randomY = rect.top + (Math.random() * rect.height);
        
        heart.style.left = `${randomX}px`;
        heart.style.top = `${randomY}px`;

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1600);
    }
}

// --- Reveal Message Section Function ---
function revealMessageSection() {
    const msgSection = document.getElementById('message-section');
    const showMsgBtn = document.getElementById('show-msg-btn');

    if (msgSection) {
        msgSection.classList.remove('hidden');
        if (showMsgBtn) showMsgBtn.classList.add('hidden');
        msgSection.scrollIntoView({ behavior: 'smooth' });
    }
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

// --- Audio Switcher Logic (Uses songs.js) ---
function playChapterAudio(chapterNum) {
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic && typeof chapterSongs !== 'undefined' && chapterSongs[chapterNum]) {
        bgMusic.src = chapterSongs[chapterNum];
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio play gesture required:", e));
    }
}

// Global click listener to initialize audio
document.addEventListener('click', () => {
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic && bgMusic.paused && bgMusic.src) {
        bgMusic.play().catch(e => console.log(e));
    }
}, { once: true });

const modalOverlay = document.getElementById('modal-overlay');
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}
