// --- Elements ---
const heroSection = document.getElementById('hero-section');
const startBtn = document.getElementById('start-btn');
const chaptersSection = document.getElementById('chapters-section');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const bgMusic = document.getElementById('bg-music');

// --- Chapter Content ---
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

// --- Fade from Hero to Chapters ---
startBtn.addEventListener('click', () => {
    // Fade out hero
    heroSection.style.opacity = '0';
    
    setTimeout(() => {
        heroSection.classList.add('hidden');
        chaptersSection.classList.remove('hidden');
        
        // Trigger reflow to ensure the fade-in works
        void chaptersSection.offsetWidth;
        chaptersSection.style.opacity = '1';
    }, 1500); // Wait for CSS transition to finish
});

// --- Modal Functions ---
function openModal(chapterNum) {
    // Populate Modal Content
    modalTitle.textContent = chapterContent[chapterNum].title;
    modalText.textContent = chapterContent[chapterNum].text;
    
    // Show Modal
    modalOverlay.classList.add('active');

    // Handle Audio Trigger on Chapter 3
    if (chapterNum === 3) {
        playAudio();
    }
}

function closeModal() {
    modalOverlay.classList.remove('active');
}

// --- Audio Handling ---
function playAudio() {
    // Play only if it's currently paused (prevents restarting every click)
    if (bgMusic.paused) {
        bgMusic.volume = 0.5; // Set to 50% volume for background vibe
        bgMusic.play().catch(error => {
            console.log("Browser autoplay policy prevented audio from playing automatically.", error);
        });
    }
}

// Close modal when clicking outside the glass box
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});