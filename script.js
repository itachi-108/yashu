const heroSection = document.getElementById('hero-section');
const startBtn = document.getElementById('start-btn');
const chaptersSection = document.getElementById('chapters-section');
const backHeroBtn = document.getElementById('back-hero-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const bgMusic = document.getElementById('bg-music');

const chapterContent = {
    1: {
        title: "Chapter I: The Bond",
        text: "You're genuinely the best person in my life. Having you around feels like having the best sister and friend all rolled into one. I cherish our bond more than you know, Yashu..."
    },
    2: {
        title: "Chapter II: The Protagonist",
        text: "I know you're usually lost in Webtoons or a dark romance on Wattpad, but today, you're the main character. No tragic plot twists, just good vibes."
    },
    3: {
        title: "Chapter III: The Reveal",
        text: "Happy Birthday, my Yashu! 🖤 May this year be as epic as the stories you read."
    }
};

// Navigation logic
startBtn.addEventListener('click', () => {
    heroSection.classList.add('hidden');
    chaptersSection.classList.remove('hidden');
});

backHeroBtn.addEventListener('click', () => {
    chaptersSection.classList.add('hidden');
    heroSection.classList.remove('hidden');
});

// Modal Logic
function openModal(chapterNum) {
    modalTitle.textContent = chapterContent[chapterNum].title;
    modalText.textContent = chapterContent[chapterNum].text;
    modalOverlay.classList.remove('hidden');

    if (chapterNum === 3 && bgMusic.paused) {
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio playback blocked:", e));
    }
}

function closeModal() {
    modalOverlay.classList.add('hidden');
}

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});
