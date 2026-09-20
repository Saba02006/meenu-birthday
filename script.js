document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // MUSIC
    // =========================================

    const happyBirthdayMusic = document.getElementById("happyBirthdayMusic");
    const specialSong = document.getElementById("specialSong");
    const song3 = document.getElementById("song3");

    let specialSongStarted = false;
    let song3Started = false;

    // =========================================
    // GET ELEMENTS
    // =========================================

    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");

    const welcome = document.getElementById("welcome");
    const birthdayScreen = document.getElementById("birthdayScreen");
    const letsGoBtn = document.getElementById("letsGoBtn");

    const memoryScreen = document.getElementById("memoryScreen");
    const memoryNextBtn = document.getElementById("memoryNextBtn");

    const letterScreen = document.getElementById("letterScreen");
    const envelopeArea = document.getElementById("envelopeArea");
    const letterPaper = document.getElementById("letterPaper");
    const letterNextBtn = document.getElementById("letterNextBtn");

    const reasonsScreen = document.getElementById("reasonsScreen");
    const lastSurpriseBtn = document.getElementById("lastSurpriseBtn");
    const finalScreen = document.getElementById("finalScreen");

    // =========================================
    // NO BUTTON
    // =========================================

    const noMessages = [
        "NO 😭",
        "Are you sure? 👀",
        "Nice try 😂",
        "NOPE! 🏃‍♀️",
        "Catch me! 😭",
        "JUST CLICK YESS 💗"
    ];

    let noCount = 0;

    function moveNoButton() {

        noCount++;

        noBtn.textContent =
            noMessages[Math.min(noCount, noMessages.length - 1)];

        noBtn.style.position = "fixed";

        const buttonWidth = noBtn.offsetWidth;
        const buttonHeight = noBtn.offsetHeight;

        const padding = 30;

        const maxX = window.innerWidth - buttonWidth - padding;
        const maxY = window.innerHeight - buttonHeight - padding;

        const randomX =
            Math.random() * (maxX - padding) + padding;

        const randomY =
            Math.random() * (maxY - padding) + padding;

        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";
    }

    noBtn.addEventListener("mouseenter", moveNoButton);

    noBtn.addEventListener(
        "touchstart",
        function (event) {
            event.preventDefault();
            moveNoButton();
        },
        { passive: false }
    );

    noBtn.addEventListener("click", function (event) {
        event.preventDefault();
        moveNoButton();
    });

    // =========================================
    // SCREEN 1 → SCREEN 2
    // =========================================

    yesBtn.addEventListener("click", function () {

        // Play Happy Birthday
        happyBirthdayMusic.currentTime = 0;
        happyBirthdayMusic.play().catch(console.log);

        welcome.style.opacity = "0";
        welcome.style.transform = "scale(0.95)";

        setTimeout(function () {

            welcome.style.display = "none";
            birthdayScreen.classList.add("active");

        }, 700);

    });

    // =========================================
    // SCREEN 2 → SCREEN 3
    // =========================================

    letsGoBtn.addEventListener("click", function () {

        // Stop Happy Birthday
        happyBirthdayMusic.pause();
        happyBirthdayMusic.currentTime = 0;

        // Start Special Song (1:11)
        if (!specialSongStarted) {

            specialSongStarted = true;

            specialSong.currentTime = 71;
            specialSong.play().catch(console.log);

        }

        birthdayScreen.style.opacity = "0";
        birthdayScreen.style.transform = "scale(0.95)";

        setTimeout(function () {

            birthdayScreen.style.display = "none";
            memoryScreen.classList.add("active");

        }, 700);

    });

    // Loop only 1:11 → 1:26
    specialSong.addEventListener("timeupdate", function () {

        if (specialSong.currentTime >= 86) {

            specialSong.currentTime = 71;

        }

    });

    // =========================================
    // SCREEN 3 → SCREEN 4
    // =========================================

    memoryNextBtn.addEventListener("click", function () {

        // Stop Song 2
        specialSong.pause();
        specialSong.currentTime = 71;

        // Start Song 3
        if (!song3Started) {

            song3Started = true;

            song3.loop = true;
            song3.currentTime = 0;

            song3.play().catch(console.log);

        }

        memoryScreen.style.opacity = "0";
        memoryScreen.style.transform = "scale(0.95)";

        setTimeout(function () {

            memoryScreen.style.display = "none";
            letterScreen.classList.add("active");

        }, 700);

    });

    // =========================================
    // ENVELOPE
    // =========================================

    envelopeArea.addEventListener("click", function () {

        if (envelopeArea.classList.contains("open")) return;

        envelopeArea.classList.add("open");

        const rect = envelopeArea.getBoundingClientRect();
        heartBurst(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
        );

        setTimeout(function () {

            letterPaper.classList.add("show");

            const paragraphs = letterPaper.querySelectorAll("p");

            paragraphs.forEach(function (p, index) {

                setTimeout(function () {

                    p.style.opacity = 1;
                    p.style.transform = "translateY(0)";

                }, index * 500);

            });

        }, 800);

        setTimeout(function () {

            letterNextBtn.classList.add("show");

        }, 2300);

    });

    // =========================================
    // SCREEN 4 → SCREEN 5
    // =========================================

    letterNextBtn.addEventListener("click", function () {

        letterScreen.style.opacity = "0";
        letterScreen.style.transform = "scale(0.95)";

        setTimeout(function () {

            letterScreen.style.display = "none";
            reasonsScreen.classList.add("active");

        }, 700);

    });

    // =========================================
    // SCREEN 5 → SCREEN 6
    // =========================================

    lastSurpriseBtn.addEventListener("click", function () {

        reasonsScreen.style.opacity = "0";
        reasonsScreen.style.transform = "scale(0.95)";

        setTimeout(function () {

            reasonsScreen.style.display = "none";
            finalScreen.classList.add("active");

            // Start falling petals
            startPetals();

        }, 800);

    });

    // =========================================
    // HEART BURST
    // =========================================

    function heartBurst(x, y) {

        for (let i = 0; i < 18; i++) {

            const heart = document.createElement("div");

            heart.className = "heart-pop";
            heart.innerHTML = Math.random() > 0.5 ? "💖" : "💕";

            heart.style.left = x + "px";
            heart.style.top = y + "px";

            heart.style.setProperty(
                "--x",
                (Math.random() * 220 - 110) + "px"
            );

            heart.style.setProperty(
                "--y",
                (Math.random() * 220 - 110) + "px"
            );

            document.body.appendChild(heart);

            setTimeout(function () {
                heart.remove();
            }, 1500);
        }
    }

    // =========================================
    // ROSE PETALS
    // =========================================

    let petalsStarted = false;

    function startPetals() {

        if (petalsStarted) return;

        petalsStarted = true;

        setInterval(function () {

            const petal = document.createElement("div");

            petal.className = "petal";
            petal.innerHTML = "🌸";

            petal.style.left = Math.random() * 100 + "vw";
            petal.style.animationDuration =
                (4 + Math.random() * 4) + "s";

            document.body.appendChild(petal);

            setTimeout(function () {
                petal.remove();
            }, 8000);

        }, 350);

    }

    // =========================================
    // FLOATING STARS
    // =========================================

    const backgroundEffects =
        document.getElementById("backgroundEffects");

    const magicalSymbols = [
        "♡", "✦", "✧", "♥", "✨", "♡", "✦", "⋆"
    ];

    for (let i = 0; i < 18; i++) {

        const particle = document.createElement("span");

        particle.textContent =
            magicalSymbols[
                Math.floor(Math.random() * magicalSymbols.length)
            ];

        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.animationDuration =
            (7 + Math.random() * 8) + "s";
        particle.style.animationDelay =
            Math.random() * 6 + "s";
        particle.style.fontSize =
            (12 + Math.random() * 14) + "px";

        backgroundEffects.appendChild(particle);

    }

});