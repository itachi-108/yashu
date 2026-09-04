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
    if (chapterNum > unlockedChapter) returnGot you, bro. We can definitely upgrade that UI to match the second image. 

To get that stacked look (Roman numeral on top, title on the bottom) and ensure the unlocked chapters have a permanent, constant glow, we just need to use CSS Flexbox and a specific glowing `box-shadow` for the unlocked state. 

Here is the 100% complete code. I've put the HTML, CSS, and JavaScript all in one file so you can easily copy, paste, and test it.

### Part 1: The Structure and Glow Code

Create an `index.html` file and paste this in:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Story of Us</title>
    <style>
        /* Base Page Styling */
        body {
            background-color: #0b0612; /* Dark background matching the image */
            color: #ffffff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
        }

        h1 {
            font-family: 'Georgia', serif;
            color: #f4aebf; /* Rose gold text */
            font-size: 2.5rem;
            margin-bottom: 40px;
            text-shadow: 0 0 15px rgba(244, 174, 191, 0.4); /* Slight text glow */
        }

        /* Container for the Chapters */
        .chapter-container {
            display: flex;
            gap: 20px;
            margin-bottom: 40px;
        }

        /* Base Chapter Card Styling */
        .chapter-card {
            background-color: #170d1c;
            border-radius: 15px;
            padding: 30px 40px;
            width: 160px;
            display: flex;
            flex-direction: column; /* This stacks the Roman numeral ABOVE the text */
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.4s ease; /* Smooth transition for unlocking */
            border: 1px solid #2a1b38;
        }

        .chapter-card .roman {
            font-family: 'Georgia', serif;
            font-size: 2.5rem;
            margin-bottom: 10px;
            color: #f4aebf;
        }

        .chapter-card .title {
            font-size: 0.85rem;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #f4aebf;
            text-align: center;
        }

        /* 🌟 The Constant Glow for Unlocked Chapters 🌟 */
        .chapter-card.unlocked {
            border: 1px solid rgba(244, 174, 191, 0.6);
            /* This box-shadow creates the permanent glow around the box */
            box-shadow: 0 0 25px rgba(244, 174, 191, 0.3), 
                        inset 0 0 10px rgba(244, 174, 191, 0.1); 
        }

        /* Styling for Locked Chapters */
        .chapter-card.locked {
            opacity: 0.4;
            cursor: not-allowed;
            box-shadow: none; /* No glow while locked */
            border: 1px solid #2a1b38;
        }

        .chapter-card.locked .roman, 
        .chapter-card.locked .title {
            color: #888888; /* Dim text for locked state */
        }

        /* Just a quick button to test the unlock feature */
        .test-btn {
            padding: 10px 20px;
            background: linear-gradient(45deg, #c96b86, #8a4875);
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            margin-top: 50px;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <h1>The Story of Us</h1>

    <div class="chapter-container">
        <!-- Chapter 1: Already Unlocked -->
        <div class="chapter-card unlocked" id="chap1">
            <span class="roman">I</span>
            <span class="title">The Bond</span>
        </div>

        <!-- Chapter 2: Already Unlocked -->
        <div class="chapter-card unlocked" id="chap2">
            <span class="roman">II</span>
            <span class="title">The Protagonist</span>
        </div>

        <!-- Chapter 3: Locked (Will glow once unlocked) -->
        <div class="chapter-card locked" id="chap3">
            <span class="roman">III</span>
            <span class="title">The Reveal</span>
        </div>
    </div>

    <!-- Click this to see the glow activate on Chapter 3 -->
    <button class="test-btn" onclick="unlockNewChapter()">Unlock Chapter III</button>

    <script>
        // Function to unlock a new chapter
        function unlockNewChapter() {
            let chapter3 = document.getElementById("chap3");
            
            // Remove the 'locked' class and add the 'unlocked' class
            chapter3.classList.remove("locked");
            chapter3.classList.add("unlocked");
            
            // Because CSS handles the visual change, adding the "unlocked" class 
            // automatically applies the permanent pink glow immediately!
        }
    </script>
</body>
</html>
