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
        audioEl.play().catch(err => console.log("Audio play blocked until interaction:", err));
    }
}

function stopChapterAudio() {
    const audioEl = document.getElementById('bg-music');
    if (audioEl) {
        audioEl.pause();
        audioEl.currentTime = 0; // Reset song to beginning
    }
}

// --- Floating Hearts Effect ---
function createFloatingHearts() {
    const hearts = ['💖', '✨', '🖤', '🌸', '💫'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 80 + 10 + 'vw';
            heart.style.top = Math.random() * 40 + 50 + 'vh';
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 1600);
        }, i * 100);
    }
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
            "Yaad hai jab hum pehli baar bus mein mile the? 🚌 Main apni us tyre wali unchi seat par baitha, apne doston ke sath baaton mein busy tha. Achanak bus tere ghar ke aage ruki. Meri height thodi lambi thi, toh maine bend hokar khidki se bahar jhaanka... pehle ek chhoti bacchi bus mein aayi, aur fir uske piche aayi ek short hairs wali ladki. :) Tum log aakar mere aage wali seat par baith gaye.",
            "Mujhe naye logon se milna hamesha accha lagta hai, aur us din chutti ke time jab maine tujhe pehli baar bulaya... you just smiled and gave your intro. ✨ Wahan se humari baatein shuru hui. Those funny jokes in the bus, wo chhote-chhote eye contacts, and those pure memories... sab wahin se start hua tha. 💫",
            "Mujhe aaj bhi yaad hai jab maine tujhe compliment diya tha ki, 'You look good in open hair.' Aur tune badi masoomiyat se bola tha, 'Papa dantenge, aur school mein allowed nahi.'... Main wo aaj tak nahi bhoola. 🥀",
            "Bus ka wo safar mere liye ek alag hi duniya thi. 🌍 Main har pal aise jeene ki koshish karta tha jaise aakhri ho, sabko time deta tha. Karan, Karman, Ujjwal, main... aur tu. Tum sab mere liye ek family ki tarah ban gaye the. Wo bus wali party yaad hai? Jab hum sab apne ghar se kuch na kuch khaane ke liye laaye the. 🍕🥳",
            "I really miss those days. Kabhi kabhi dil karta hai ki kaash school life kabhi khatam na hoti... kaash wo bus ka safar hamesha chalta rehta. Zindagi sach mein wahi hoti hai, jab hum un logon ke sath aise bonds aur memories bana lete hain jo kabhi bhulaye nahi jaa sakte. ❤️",
            "Aur mera sabse khoobsurat safar... usi unchi wali seat se shuru hua tha. 🖤✨"
        ]
    },
    2: {
        title: "Chapter II: The Chaos",
        paragraphs: [
            "Phir ek time aaya jab main bus se hat gaya... Life mein achanak se ek emptiness feel hone lagi thi, kyunki us bus ki baat hi kuch alag thi. 🍂 Par humari story ka sabse important twist tab aaya, jab main ek din wapas bus mein aaya—sirf tum sab se milne.",
            "Us din maine tujhe anime dekhne ko recommend kiya. Humesha corridor mein hone wale wo chhote-chhote eye contacts aur 'hello-hi' apni jagah the, par us din baaton baaton mein wo seed bo diya gaya tha, jo aage jaake kamaal karne wala tha. 🌱✨",
            "Mere baar-baar bolne par tera Instagram par aana was a next-level thing! Jab teri request aayi, I was literally shocked. 'Hain? Kya ye sach mein Yashvardhika hai?' 🤯 Maine turant request accept ki, aur jab pata chala ki haan tu hi hai, I was genuinely so happy.",
            "Ek aur family member ne join kar liya tha. Aur phir? Phir pichle 2-3 mahino mein shayad hi koi aisa din gaya ho jab humari baat na hui ho. Every day a new story, new drama, masti, late-night talks, aur humare wo dark jokes. 🌚💬",
            "Aur phir aaya Rakhi ka din... The Epic Chaos. 🌪️ Maine tujhse pucha ki kadaa dilayegi? Taki teri di hui cheez humesha mere paas rahe (aur main bhi tujhe ek dena chahta hoon). Tere haan karne ka decision epic tha! Lekin bina location, bina apni dress bataye... 'Main nikal rahi hoon bazaar' bol kar nikal gayi paagal aurat! Haha. 🤦‍♂️😂",
            "Itni kya excitement thi? Main poore raaste bas hansta hua aa raha tha. Darr bhi lag raha tha ki na tere paas phone hai, na kuch... agar nahi mili toh main phasunga ki maine bulaya tha! Par shayad sab kuch God ka hi racha hua khel tha. 🙏 Jaise hi main road par aaya, main left mudne wala tha, par meri gut feeling ne kaha 'right mudh'. Main thoda hi aage gaya... aur tu mil gayi. 🪄",
            "Sath mein Rakhi lena, wo aunty ka ajeeb sa bracelet dikhana aur tera uspe hansna... Agrasen Chowk tak risk leke jana... wo saare moments mere mind mein permanently save ho gaye hain. 💾 Tera last minute par ghar pohochna, hey bhagwaan! Uss din agar tera Sawan ka vrat nahi hota, toh hum pakka bahar khate, par agar late hote toh apni maut bhi pakki thi. 💀😂 Uss din ke baad humari voice calls, hansi mazaak, dukh-dard, pranks... literally mazaa aa gaya.",
            "Fast forward to today... Aaj jab main class mein tera wait kar raha tha, yahi soch raha tha ki 'Kab aayegi... kab aayegi?' Aur theek 10 second baad tu darwaze par thi. 🚪✨ Ye kya ho raha hai? Sab kuch itna perfect... pakka God ka hi khel hai. Tu thodi der aur wahan khadi rehti toh main kasam se blush maarke zor-zor se hansne lag jata. 🫣",
            "I am literally waiting ki kab hum agli baar face-to-face milein aur bahut saari baatein karein... kyunki ab tu sirf ek dost nahi, meri story ki sabse chaotic aur sabse favorite Protagonist ban chuki hai. 🥀🖤"
        ]
    },
    3: {
        title: "Chapter III: The Reveal",
        paragraphs: [
            "Aakhir mein... bas itna kehna tha. Sahi bataoon toh, aaj ke time par tu meri life ki sabse important aur best person hai. 💖 Tere paas hote hue mujhe kabhi sochna nahi padta—main bina kisi filter ke, bina kisi darr ke jo dimaag mein aata hai bol deta hoon.",
            "Aur tu bhi toh bilkul mere jaisi hi hai... 100% real, no filters. 🎭 Mujhe aaj tak teri koi bhi baat buri ya negative nahi lagi. You are simply the best. 🌟",
            "Main bas yahi chahta hoon ki hum aise hi hamesha baatein karte rahein, aise hi sath hanste-muskuraate rahein, aur life ki har problem ka mil kar saamna karein. Humara ye trust kabhi na toote... kyunki trust hi har ek khoobsurat rishte ki neev hoti hai. 🤝✨",
            "Mera guess hai ki yahan tak padhte-padhte tu thodi emotional ho gayi hogi, haina? 🥺 I know ye sab tere liye bohot unexpected hoga. Pata hai, main pichle do dino se sab kuch chhod kar bas raat-raat bhar is website ko banane mein laga hua tha... aur aaj jab ye complete hui hai, toh lag raha hai ki meri mehnat poori tarah safal ho gayi. 💻❤️‍🔥",
            "Ek baat boloon? Kehte hain har mard ke liye apni pasandida aurat ke sath bitaye hue moments hi duniya ke sabse khaas pal hote hain. Jab koi insaan is duniya se jata hai, toh uska brain aakhri 7 minutes ke liye active rehta hai... pata hai kyun? Kyunki uska dimaag uski poori zindagi ke sabse best moments aur sabse khaas logon ko yaad kar raha hota hai. 🧠⏳",
            "And Yashu... you are easily 2 minutes from those 7 minutes for me. 🥀🖤",
            "Happy Birthday to the most special girl in my world. Thank you for being the answer to my childhood prayer. Hug you yaar... I love you, bestie. 🫀✨",
            "Don't cry sweet heart... don't cry 🥺, main aanshu ponchne nahi aa paunga tere abhi... byeeeee... 👋🖤"
        ]
    }
};

// --- Modal & Unlocking Logic ---
function openModal(chapterNum) {
    if (chapterNum > unlockedChapter) {
        alert("🔒 Read the unlocked chapter first to open this one!");
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

    // Unlock the next chapter after viewing the current one
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
    createFloatingHearts();
}

function closeModal() {
    const modal = document.getElementById('modal-overlay');
    if (modal) {
        modal.classList.add('hidden');
    }
    // Stop playing music when modal is closed
    stopChapterAudio();
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

// --- Asynchronous Form Submission Listener ---
document.addEventListener('DOMContentLoaded', () => {
    const msgForm = document.getElementById('birthday-form');
    if (msgForm) {
        msgForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = msgForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending... 💖';
            submitBtn.disabled = true;

            const formData = new FormData(msgForm);

            fetch(msgForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    msgForm.innerHTML = '<p class="feedback-msg">Your message and audio have been sent successfully! 💖</p>';
                } else {
                    alert('Oops! Something went wrong. Please try again.');
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            })
            .catch(() => {
                alert('Oops! Something went wrong. Please try again.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});
