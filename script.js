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

// --- Audio Playback Logic ---
function playChapterAudio(chapterNum) {
    const audioEl = document.getElementById('bg-music');
    if (!audioEl) return;

    if (typeof chapterSongs !== 'undefined' && chapterSongs[chapterNum]) {
        audioEl.src = chapterSongs[chapterNum];
    }
    
    audioEl.play().catch(err => {
        console.log("Audio waiting for user interaction:", err);
    });
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
    if (countdownEl) {
        countdownEl.classList.remove('hidden');
        countdownEl.textContent = `Unlocking your note in ${count}...`;

        const timer = setInterval(() => {
            count--;
            if (count > 0) {
                countdownEl.textContent = `Unlocking your note in ${count}...`;
            } else {
                clearInterval(timer);
                
                const introBox = document.getElementById('interrogation-box');
                if (introBox) introBox.classList.add('hidden');
                countdownEl.classList.add('hidden');

                const notesContainer = document.getElementById('notes-container');
                if (notesContainer) notesContainer.classList.remove('hidden');

                if (type === 'yes') {
                    const noteYes = document.getElementById('note-yes');
                    if (noteYes) noteYes.classList.remove('hidden');
                } else if (type === 'bhot-jyaada') {
                    const noteBhot = document.getElementById('note-bhot-jyaada');
                    if (noteBhot) noteBhot.classList.remove('hidden');
                }
            }
        }, 1000);
    }
}

function goToChapters() {
    window.location.href = 'chapters.html';
}

// --- Chapter Data ---
let unlockedChapter = 1;

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
    if (chapterNum > unlockedChapter) {
        alert("This chapter is locked! Read the previous chapter first.");
        return;
    }

    const modal = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    if (!modal || !chapterStories[chapterNum]) return;

    playChapterAudio(chapterNum);

    modalTitle.textContent = chapterStories[chapterNum].title;
    modalBody.innerHTML = '';
    chapterStories[chapterNum].paragraphs.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        modalBody.appendChild(p);
    });

    modal.classList.remove('hidden');

    if (chapterNum === unlockedChapter && unlockedChapter < 3) {
        unlockedChapter++;
        unlockChapterCard(unlockedChapter);
    }
}

function unlockChapterCard(num) {
    const card = document.getElementById(`chapter-card-${num}`);
    const lockIcon = document.getElementById(`lock-${num}`);

    if (card) {
        card.classList.remove('locked');
        card.classList.add('unlocked-glow');
    }
    if (lockIcon) {
        lockIcon.remove();
    }
}

function closeModal() {
    const modal = document.getElementById('modal-overlay');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function revealMessageSection() {
    const msgSection = document.getElementById('message-section');
    const showBtn = document.getElementById('show-msg-btn');
    
    if (msgSection) {
        msgSection.classList.remove('hidden');
        msgSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (showBtn) {
        showBtn.classList.add('hidden');
    }
}

// Form Submission Listener
document.addEventListener('DOMContentLoaded', () => {
    const msgForm = document.getElementById('message-form');
    if (msgForm) {
        msgForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const feedback = document.getElementById('form-feedback');
            if (feedback) {
                feedback.classList.remove('hidden');
            }
            msgForm.reset();
        });
    }
});
