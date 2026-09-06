/* =========================================================
   BIRTHDAYVERSE - SCRIPT.JS
   Part 8A - Complete Matching Version
   ========================================================= */

"use strict";

/* =========================================================
   BASIC DATA
   ========================================================= */

const DEFAULT_DATA = {
    name: "Birthday Star",
    nickname: "Special One",
    age: "",
    sender: "Someone Special",
    date: "",
    message:
        "May your birthday be filled with happiness, love, laughter and unforgettable memories."
};

let birthdayData = {};
let birthdayMedia = {};

try {
    birthdayData = JSON.parse(
        localStorage.getItem("birthdayData")
    ) || {};
} catch {
    birthdayData = {};
}

try {
    birthdayMedia = JSON.parse(
        localStorage.getItem("birthdayMedia")
    ) || {};
} catch {
    birthdayMedia = {};
}

birthdayData = {
    ...DEFAULT_DATA,
    ...birthdayData
};


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function $(id) {
    return document.getElementById(id);
}

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        String(secs).padStart(2, "0")
    );
}

function showElement(element) {
    if (element) {
        element.style.display = "";
    }
}

function hideElement(element) {
    if (element) {
        element.style.display = "none";
    }
}


/* =========================================================
   INDEXEDDB
   ========================================================= */

const DB_NAME = "BirthdayVerseDB";
const DB_VERSION = 1;
const STORE_NAME = "media";

let db = null;

function openDatabase() {
    return new Promise((resolve, reject) => {

        if (!window.indexedDB) {
            resolve(null);
            return;
        }

        const request = indexedDB.open(
            DB_NAME,
            DB_VERSION
        );

        request.onupgradeneeded = event => {

            const database = event.target.result;

            if (!database.objectStoreNames.contains(STORE_NAME)) {
                database.createObjectStore(
                    STORE_NAME,
                    {
                        keyPath: "id"
                    }
                );
            }
        };

        request.onsuccess = event => {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}


function saveMediaToDB(key, value) {

    if (!db) {
        return Promise.resolve();
    }

    return new Promise(resolve => {

        try {

            const transaction =
                db.transaction(
                    STORE_NAME,
                    "readwrite"
                );

            const store =
                transaction.objectStore(STORE_NAME);

            store.put({
                id: key,
                value: value
            });

            transaction.oncomplete = () => {
                resolve();
            };

            transaction.onerror = () => {
                resolve();
            };

        } catch {
            resolve();
        }
    });
}


function getMediaFromDB(key) {

    if (!db) {
        return Promise.resolve(null);
    }

    return new Promise(resolve => {

        try {

            const transaction =
                db.transaction(
                    STORE_NAME,
                    "readonly"
                );

            const store =
                transaction.objectStore(STORE_NAME);

            const request =
                store.get(key);

            request.onsuccess = () => {
                resolve(
                    request.result
                        ? request.result.value
                        : null
                );
            };

            request.onerror = () => {
                resolve(null);
            };

        } catch {
            resolve(null);
        }
    });
}


/* =========================================================
   PERSONALIZATION
   ========================================================= */

function loadPersonalization() {

    const name =
        birthdayData.name ||
        birthdayData.nickname ||
        DEFAULT_DATA.name;

    const nickname =
        birthdayData.nickname ||
        name;

    const age =
        birthdayData.age || "";

    const sender =
        birthdayData.sender ||
        DEFAULT_DATA.sender;

    const message =
        birthdayData.message ||
        DEFAULT_DATA.message;


    if ($("typingGreeting")) {
        $("typingGreeting").textContent =
            `Welcome, ${nickname} ✨`;
    }

    if ($("typingSubtitle")) {
        $("typingSubtitle").textContent =
            "Something magical is waiting for you...";
    }

    if ($("birthdayTitle")) {
        $("birthdayTitle").textContent =
            `Happy Birthday, ${name}! 🎂`;
    }

    if ($("birthdaySubtitle")) {
        $("birthdaySubtitle").textContent =
            "Wishing you a beautiful day filled with happiness 💖";
    }

    if ($("ageText")) {

        if (age) {
            $("ageText").textContent =
                `Celebrating ${age} wonderful years ✨`;
        } else {
            $("ageText").textContent = "";
        }
    }

    if ($("personalMessage")) {
        $("personalMessage").textContent =
            message;
    }

    if ($("senderDisplay")) {
        $("senderDisplay").textContent =
            `— With love, ${sender} 💖`;
    }

    if ($("memoryBookName")) {
        $("memoryBookName").textContent =
            name;
    }

    if ($("memoryBookText")) {
        $("memoryBookText").textContent =
            `Every beautiful moment with ${name} becomes a memory worth keeping. 💖`;
    }
}


/* =========================================================
   BIRTHDAY LETTER
   ========================================================= */

function createBirthdayLetter() {

    const name =
        birthdayData.name ||
        birthdayData.nickname ||
        "Birthday Star";

    const sender =
        birthdayData.sender ||
        "Someone Special";

    const message =
        birthdayData.message ||
        DEFAULT_DATA.message;


    const letter =
`Dear ${name},

Today is a beautiful reminder of how special you are.

I hope your birthday is filled with smiles, laughter, love and countless unforgettable moments.

${message}

May the coming year bring you closer to all your dreams.

Keep smiling, keep shining and always remember how special you are. ✨

With lots of love,
${sender} 💖`;


    if ($("birthdayLetterText")) {
        $("birthdayLetterText").textContent =
            letter;
    }
}


/* =========================================================
   THEMES
   ========================================================= */

function setupThemes() {

    const buttons =
        document.querySelectorAll(
            ".theme-choice"
        );

    let savedTheme =
        localStorage.getItem(
            "birthdayTheme"
        ) || "love";

    const validThemes = [
        "love",
        "ocean",
        "royal",
        "midnight",
        "sunset",
        "galaxy"
    ];

    if (!validThemes.includes(savedTheme)) {
        savedTheme = "love";
    }

    applyTheme(savedTheme);


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const theme =
                    button.dataset.theme;

                applyTheme(theme);

                localStorage.setItem(
                    "birthdayTheme",
                    theme
                );
            }
        );
    });
}


function applyTheme(theme) {

    document.body.classList.remove(
        "theme-love",
        "theme-ocean",
        "theme-royal",
        "theme-midnight",
        "theme-sunset",
        "theme-galaxy"
    );

    document.body.classList.add(
        `theme-${theme}`
    );


    document
        .querySelectorAll(".theme-choice")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.theme === theme
            );
        });
}


/* =========================================================
   STARS
   ========================================================= */

function createStars() {

    const container = $("stars");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    for (let i = 0; i < 180; i++) {

        const star =
            document.createElement("div");

        star.className = "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        const size =
            Math.random() * 3 + 1;

        star.style.width =
            size + "px";

        star.style.height =
            size + "px";

        star.style.animationDelay =
            Math.random() * 3 + "s";

        container.appendChild(star);
    }
}


/* =========================================================
   TYPING EFFECT
   ========================================================= */

function typingEffect(
    element,
    text,
    speed = 60
) {

    if (!element) {
        return;
    }

    element.textContent = "";

    let index = 0;

    const timer =
        setInterval(() => {

            element.textContent +=
                text.charAt(index);

            index++;

            if (index >= text.length) {
                clearInterval(timer);
            }

        }, speed);
}


function startTyping() {

    const nickname =
        birthdayData.nickname ||
        birthdayData.name ||
        "Birthday Star";

    const greeting =
        `Welcome, ${nickname} ✨`;

    const subtitle =
        "Something magical is waiting for you...";


    if ($("typingGreeting")) {
        typingEffect(
            $("typingGreeting"),
            greeting,
            65
        );
    }

    setTimeout(() => {

        if ($("typingSubtitle")) {
            typingEffect(
                $("typingSubtitle"),
                subtitle,
                40
            );
        }

    }, greeting.length * 65 + 500);
}


/* =========================================================
   COUNTDOWN
   ========================================================= */

function getBirthdayTarget() {

    if (!birthdayData.date) {
        return null;
    }

    const original =
        new Date(birthdayData.date);

    if (isNaN(original.getTime())) {
        return null;
    }


    const now = new Date();

    let target =
        new Date(
            now.getFullYear(),
            original.getMonth(),
            original.getDate(),
            0,
            0,
            0
        );


    if (target <= now) {

        target =
            new Date(
                now.getFullYear() + 1,
                original.getMonth(),
                original.getDate(),
                0,
                0,
                0
            );
    }

    return target;
}


function updateCountdown() {

    const target =
        getBirthdayTarget();

    if (!target) {
        return;
    }

    const now = new Date();

    let difference =
        target.getTime() -
        now.getTime();


    if (difference < 0) {
        difference = 0;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) %
                24
        );

    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) %
                60
        );

    const seconds =
        Math.floor(
            (difference / 1000) %
                60
        );


    if ($("countDays")) {
        $("countDays").textContent =
            String(days).padStart(2, "0");
    }

    if ($("countHours")) {
        $("countHours").textContent =
            String(hours).padStart(2, "0");
    }

    if ($("countMinutes")) {
        $("countMinutes").textContent =
            String(minutes).padStart(2, "0");
    }

    if ($("countSeconds")) {
        $("countSeconds").textContent =
            String(seconds).padStart(2, "0");
    }
}


/* =========================================================
   CANDLES
   ========================================================= */

let candlesBlown = false;

function setupCandles() {

    const button =
        $("blowButton");

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        blowCandles
    );
}


function blowCandles() {

    if (candlesBlown) {
        return;
    }

    candlesBlown = true;


    document
        .querySelectorAll(".flame")
        .forEach(flame => {
            flame.classList.add("off");
        });


    if ($("blowButton")) {
        $("blowButton").textContent =
            "✨ Wish Made!";
    }


    if ($("wishMessage")) {
        $("wishMessage").textContent =
            "Your wish has been sent into the stars! ✨💖";
    }


    createConfetti(120);

    setTimeout(() => {
        launchFireworks();
    }, 400);

    setTimeout(() => {

        if ($("celebrationPopup")) {
            $("celebrationPopup")
                .classList.add("show");
        }

    }, 1000);
}


/* =========================================================
   CONFETTI
   ========================================================= */

function createConfetti(amount = 80) {

    const container =
        $("confettiContainer");

    if (!container) {
        return;
    }


    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.animationDelay =
            Math.random() * 1.5 + "s";

        piece.style.animationDuration =
            2 + Math.random() * 2 + "s";

        piece.style.background =
            `hsl(${Math.random() * 360}, 90%, 65%)`;

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        container.appendChild(piece);


        setTimeout(() => {
            piece.remove();
        }, 5000);
    }
}


/* =========================================================
   FIREWORKS
   ========================================================= */

let fireworks = [];
let fireworksRunning = false;

function setupFireworks() {

    const button =
        $("fireworksButton");

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        () => launchFireworks()
    );
}


function launchFireworks() {

    const canvas =
        $("fireworksCanvas");

    if (!canvas) {
        return;
    }


    resizeFireworksCanvas();


    for (let i = 0; i < 8; i++) {

        setTimeout(() => {

            createFirework(
                Math.random() *
                    canvas.width,

                Math.random() *
                    canvas.height *
                    0.55 +
                    canvas.height * 0.1
            );

        }, i * 350);
    }


    if (!fireworksRunning) {
        fireworksRunning = true;
        animateFireworks();
    }
}


function createFirework(x, y) {

    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {

        const angle =
            (Math.PI * 2 * i) /
            particleCount;

        const speed =
            2 + Math.random() * 5;

        fireworks.push({

            x: x,
            y: y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life: 70 +
                Math.random() * 30,

            maxLife: 100,

            hue:
                Math.random() * 360
        });
    }
}


function resizeFireworksCanvas() {

    const canvas =
        $("fireworksCanvas");

    if (!canvas) {
        return;
    }

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}


function animateFireworks() {

    const canvas =
        $("fireworksCanvas");

    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    fireworks =
        fireworks.filter(
            particle =>
                particle.life > 0
        );


    fireworks.forEach(particle => {

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vy += 0.045;

        particle.vx *= 0.99;
        particle.vy *= 0.99;

        particle.life--;


        const alpha =
            particle.life /
            particle.maxLife;


        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            2,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `hsla(
                ${particle.hue},
                100%,
                65%,
                ${alpha}
            )`;

        ctx.fill();
    });


    if (fireworks.length > 0) {

        requestAnimationFrame(
            animateFireworks
        );

    } else {

        fireworksRunning = false;

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );
    }
}


/* =========================================================
   BALLOONS
   ========================================================= */

let balloonScore = 0;

function setupBalloons() {

    createBalloons();

    if ($("balloonScore")) {
        $("balloonScore").textContent =
            "Score: 0";
    }
}


function createBalloons() {

    const container =
        $("balloons");

    if (!container) {
        return;
    }

    container.innerHTML = "";


    for (let i = 0; i < 10; i++) {

        setTimeout(() => {

            const balloon =
                document.createElement("div");

            balloon.className = "balloon";

            balloon.style.left =
                Math.random() * 90 + 5 + "%";

            balloon.style.animationDuration =
                5 + Math.random() * 4 + "s";


            balloon.addEventListener(
                "click",
                () => {

                    balloon.remove();

                    balloonScore++;

                    if ($("balloonScore")) {
                        $("balloonScore").textContent =
                            `Score: ${balloonScore}`;
                    }

                    createConfetti(15);

                    setTimeout(() => {

                        createOneBalloon();

                    }, 500);
                }
            );


            container.appendChild(
                balloon
            );

        }, i * 900);
    }
}


function createOneBalloon() {

    const container =
        $("balloons");

    if (!container) {
        return;
    }


    const balloon =
        document.createElement("div");

    balloon.className = "balloon";

    balloon.style.left =
        Math.random() * 90 + 5 + "%";

    balloon.style.animationDuration =
        5 + Math.random() * 4 + "s";


    balloon.addEventListener(
        "click",
        () => {

            balloon.remove();

            balloonScore++;

            if ($("balloonScore")) {
                $("balloonScore").textContent =
                    `Score: ${balloonScore}`;
            }

            createConfetti(15);

            setTimeout(
                createOneBalloon,
                500
            );
        }
    );


    container.appendChild(balloon);


    setTimeout(() => {

        if (balloon.parentNode) {
            balloon.remove();
        }

    }, 10000);
}


/* =========================================================
   MEDIA NORMALIZATION
   ========================================================= */

function getMediaArray(...keys) {

    for (const key of keys) {

        if (
            Array.isArray(
                birthdayMedia[key]
            )
        ) {
            return birthdayMedia[key];
        }
    }

    return [];
}


/* =========================================================
   PHOTO GALLERY
   ========================================================= */

let galleryImages = [];
let currentImageIndex = 0;

async function setupPhotoGallery() {

    let photos =
        getMediaArray(
            "photos",
            "photo",
            "images"
        );


    const storedPhotos =
        await getMediaFromDB("photos");


    if (
        Array.isArray(storedPhotos) &&
        storedPhotos.length > 0
    ) {
        photos = storedPhotos;
    }


    galleryImages = photos || [];

    renderPhotoGallery();
}


function renderPhotoGallery() {

    const gallery =
        $("photoGallery");

    const empty =
        $("emptyGallery");

    if (!gallery) {
        return;
    }

    gallery.innerHTML = "";


    if (
        !galleryImages ||
        galleryImages.length === 0
    ) {

        showElement(empty);

        return;
    }


    hideElement(empty);


    galleryImages.forEach(
        (source, index) => {

            const item =
                document.createElement("div");

            item.className =
                "photo-item";


            const img =
                document.createElement("img");

            img.src =
                typeof source === "string"
                    ? source
                    : source.url ||
                      source.src ||
                      source.data ||
                      "";

            img.alt =
                `Birthday Memory ${index + 1}`;

            img.loading = "lazy";


            item.appendChild(img);


            item.addEventListener(
                "click",
                () => {

                    openLightbox(index);

                }
            );


            gallery.appendChild(item);
        }
    );


    renderMemoryPhotos();
}


/* =========================================================
   LIGHTBOX
   ========================================================= */

function openLightbox(index) {

    if (
        !galleryImages.length
    ) {
        return;
    }


    currentImageIndex = index;

    updateLightbox();

    $("imageLightbox")
        ?.classList.add("show");
}


function updateLightbox() {

    if (
        !galleryImages.length ||
        !$("lightboxImage")
    ) {
        return;
    }


    const source =
        galleryImages[currentImageIndex];


    $("lightboxImage").src =
        typeof source === "string"
            ? source
            : source.url ||
              source.src ||
              source.data ||
              "";
}


function closeLightbox() {

    $("imageLightbox")
        ?.classList.remove("show");
}


function nextImage() {

    if (!galleryImages.length) {
        return;
    }

    currentImageIndex =
        (currentImageIndex + 1) %
        galleryImages.length;

    updateLightbox();
}


function previousImage() {

    if (!galleryImages.length) {
        return;
    }

    currentImageIndex =
        (currentImageIndex -
            1 +
            galleryImages.length) %
        galleryImages.length;

    updateLightbox();
}


function setupLightbox() {

    $("closeLightbox")
        ?.addEventListener(
            "click",
            closeLightbox
        );

    $("nextImage")
        ?.addEventListener(
            "click",
            nextImage
        );

    $("previousImage")
        ?.addEventListener(
            "click",
            previousImage
        );


    $("imageLightbox")
        ?.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    $("imageLightbox")
                ) {
                    closeLightbox();
                }
            }
        );
}


/* =========================================================
   VIDEO GALLERY
   ========================================================= */

async function setupVideoGallery() {

    let videos =
        getMediaArray(
            "videos",
            "video"
        );


    const storedVideos =
        await getMediaFromDB("videos");


    if (
        Array.isArray(storedVideos) &&
        storedVideos.length > 0
    ) {
        videos = storedVideos;
    }


    renderVideoGallery(
        videos
    );
}


function renderVideoGallery(videos) {

    const gallery =
        $("videoGallery");

    const empty =
        $("emptyVideo");

    if (!gallery) {
        return;
    }

    gallery.innerHTML = "";


    if (
        !videos ||
        videos.length === 0
    ) {

        showElement(empty);

        return;
    }


    hideElement(empty);


    videos.forEach(
        (source, index) => {

            const item =
                document.createElement("div");

            item.className =
                "video-item";


            const video =
                document.createElement("video");

            video.controls = true;

            video.playsInline = true;

            video.preload = "metadata";

            video.src =
                typeof source === "string"
                    ? source
                    : source.url ||
                      source.src ||
                      source.data ||
                      "";


            item.appendChild(video);

            gallery.appendChild(item);
        }
    );
}


/* =========================================================
   MEMORY BOOK
   ========================================================= */

let memoryPage = 0;

function setupMemoryBook() {

    $("openMemoryBook")
        ?.addEventListener(
            "click",
            () => {

                $("memoryBook")
                    ?.classList.add("show");

                showMemoryPage(0);
            }
        );


    $("closeMemoryBook")
        ?.addEventListener(
            "click",
            () => {

                $("memoryBook")
                    ?.classList.remove("show");
            }
        );


    $("memoryPrev")
        ?.addEventListener(
            "click",
            () => {

                const pages =
                    document.querySelectorAll(
                        ".memory-page"
                    );

                if (!pages.length) {
                    return;
                }

                memoryPage =
                    (memoryPage -
                        1 +
                        pages.length) %
                    pages.length;

                showMemoryPage(
                    memoryPage
                );
            }
        );


    $("memoryNext")
        ?.addEventListener(
            "click",
            () => {

                const pages =
                    document.querySelectorAll(
                        ".memory-page"
                    );

                if (!pages.length) {
                    return;
                }

                memoryPage =
                    (memoryPage + 1) %
                    pages.length;

                showMemoryPage(
                    memoryPage
                );
            }
        );


    $("memoryBook")
        ?.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    $("memoryBook")
                ) {

                    $("memoryBook")
                        .classList.remove(
                            "show"
                        );
                }
            }
        );
}


function showMemoryPage(index) {

    const pages =
        document.querySelectorAll(
            ".memory-page"
        );

    if (!pages.length) {
        return;
    }


    pages.forEach(
        (page, pageIndex) => {

            page.classList.toggle(
                "active",
                pageIndex === index
            );
        }
    );


    if ($("memoryPageNumber")) {

        $("memoryPageNumber")
            .textContent =
            `${index + 1} / ${pages.length}`;
    }
}


function renderMemoryPhotos() {

    const container =
        $("memoryPhotoPreview");

    if (!container) {
        return;
    }

    container.innerHTML = "";


    if (!galleryImages.length) {

        container.innerHTML =
            `<p>No photos added yet. 💖</p>`;

        return;
    }


    galleryImages
        .slice(0, 6)
        .forEach(source => {

            const img =
                document.createElement("img");

            img.src =
                typeof source === "string"
                    ? source
                    : source.url ||
                      source.src ||
                      source.data ||
                      "";

            img.alt =
                "Memory";

            container.appendChild(img);
        });
}


/* =========================================================
   MUSIC
   ========================================================= */

let musicPlaylist = [];
let currentSongIndex = 0;

function getMusicList() {

    return getMediaArray(
        "music",
        "songs",
        "audio"
    );
}


async function setupMusic() {

    let songs =
        getMusicList();


    const storedSongs =
        await getMediaFromDB("music");


    if (
        Array.isArray(storedSongs) &&
        storedSongs.length > 0
    ) {
        songs = storedSongs;
    }


    musicPlaylist =
        songs || [];


    const audio =
        $("birthdayAudio");

    if (!audio) {
        return;
    }


    if (!musicPlaylist.length) {

        if ($("musicTitle")) {
            $("musicTitle").textContent =
                "Birthday Music";
        }

        if ($("songCounter")) {
            $("songCounter").textContent =
                "No songs added";
        }

        return;
    }


    loadSong(0);


    audio.addEventListener(
        "timeupdate",
        updateMusicProgress
    );

    audio.addEventListener(
        "loadedmetadata",
        updateMusicDuration
    );

    audio.addEventListener(
        "ended",
        nextSong
    );


    $("playMusicButton")
        ?.addEventListener(
            "click",
            toggleMusic
        );


    $("nextSong")
        ?.addEventListener(
            "click",
            nextSong
        );


    $("previousSong")
        ?.addEventListener(
            "click",
            previousSong
        );


    $("musicProgress")
        ?.addEventListener(
            "input",
            seekMusic
        );


    $("musicButton")
        ?.addEventListener(
            "click",
            toggleMusic
        );
}


function getSongSource(song) {

    if (typeof song === "string") {
        return song;
    }

    return (
        song.url ||
        song.src ||
        song.data ||
        ""
    );
}


function getSongName(song, index) {

    if (typeof song === "object") {

        return (
            song.name ||
            song.title ||
            `Birthday Song ${index + 1}`
        );
    }

    return `Birthday Song ${index + 1}`;
}


function loadSong(index) {

    const audio =
        $("birthdayAudio");

    if (
        !audio ||
        !musicPlaylist.length
    ) {
        return;
    }


    currentSongIndex =
        (index + musicPlaylist.length) %
        musicPlaylist.length;


    const song =
        musicPlaylist[currentSongIndex];


    audio.src =
        getSongSource(song);


    if ($("musicTitle")) {
        $("musicTitle").textContent =
            getSongName(
                song,
                currentSongIndex
            );
    }


    if ($("songCounter")) {
        $("songCounter").textContent =
            `${currentSongIndex + 1} / ${musicPlaylist.length}`;
    }


    audio.load();

    updateMusicButton();
}


function toggleMusic() {

    const audio =
        $("birthdayAudio");

    if (!audio || !audio.src) {
        return;
    }


    if (audio.paused) {

        audio.play()
            .then(() => {

                updateMusicButton();

            })
            .catch(() => {

                if ($("shareStatus")) {
                    $("shareStatus").textContent =
                        "Tap the play button to start music.";
                }
            });

    } else {

        audio.pause();

        updateMusicButton();
    }
}


function updateMusicButton() {

    const audio =
        $("birthdayAudio");

    const playButton =
        $("playMusicButton");

    const disc =
        $("musicDisc");


    if (!audio) {
        return;
    }


    if (audio.paused) {

        if (playButton) {
            playButton.textContent = "▶";
        }

        disc?.classList.remove(
            "playing"
        );

    } else {

        if (playButton) {
            playButton.textContent = "⏸";
        }

        disc?.classList.add(
            "playing"
        );
    }
}


function nextSong() {

    if (!musicPlaylist.length) {
        return;
    }


    const wasPlaying =
        !$("birthdayAudio").paused;


    loadSong(
        currentSongIndex + 1
    );


    if (wasPlaying) {

        $("birthdayAudio")
            .play()
            .catch(() => {});
    }
}


function previousSong() {

    if (!musicPlaylist.length) {
        return;
    }


    loadSong(
        currentSongIndex - 1
    );
}


function updateMusicProgress() {

    const audio =
        $("birthdayAudio");

    if (!audio) {
        return;
    }


    if ($("currentTime")) {
        $("currentTime").textContent =
            formatTime(audio.currentTime);
    }


    if (
        $("musicProgress") &&
        audio.duration
    ) {

        $("musicProgress").value =
            (
                audio.currentTime /
                audio.duration
            ) * 100;
    }
}


function updateMusicDuration() {

    const audio =
        $("birthdayAudio");

    if (!audio) {
        return;
    }


    if ($("duration")) {
        $("duration").textContent =
            formatTime(audio.duration);
    }
}


function seekMusic() {

    const audio =
        $("birthdayAudio");

    const slider =
        $("musicProgress");


    if (
        !audio ||
        !audio.duration ||
        !slider
    ) {
        return;
    }


    audio.currentTime =
        (
            Number(slider.value) /
            100
        ) * audio.duration;
}


/* =========================================================
   BIRTHDAY LETTER
   ========================================================= */

function setupLetter() {

    $("openLetter")
        ?.addEventListener(
            "click",
            () => {

                $("letterEnvelope")
                    ?.classList.add("open");

                $("letterContent")
                    ?.classList.add("show");
            }
        );
}


/* =========================================================
   GIFT
   ========================================================= */

function setupGift() {

    $("giftBox")
        ?.addEventListener(
            "click",
            () => {

                const box =
                    $("giftBox");

                box?.classList.add(
                    "open"
                );

                $("giftMessage")
                    ?.classList.add(
                        "show"
                    );

                if ($("giftHint")) {
                    $("giftHint").textContent =
                        "🎉 Surprise unlocked!";
                }

                createConfetti(80);

                setTimeout(() => {
                    launchFireworks();
                }, 300);

                setTimeout(() => {

                    $("giftPopup")
                        ?.classList.add(
                            "show"
                        );

                }, 700);
            }
        );
}


/* =========================================================
   SHARING
   ========================================================= */

const birthdayVerseURL =
    "https://geethikaannam.github.io/BirthdayVerse/";


function getShareText() {

    const name =
        birthdayData.name ||
        birthdayData.nickname ||
        "Birthday Star";


    return (
        `🎂 Happy Birthday, ${name}! ✨\n\n` +
        `I created a magical BirthdayVerse celebration for you! 💖\n\n` +
        birthdayVerseURL
    );
}


function setupSharing() {

    $("shareButton")
        ?.addEventListener(
            "click",
            shareBirthday
        );


    $("whatsappButton")
        ?.addEventListener(
            "click",
            shareWhatsApp
        );


    $("copyLinkButton")
        ?.addEventListener(
            "click",
            copyBirthdayLink
        );


    $("qrButton")
        ?.addEventListener(
            "click",
            toggleQR
        );
}


async function shareBirthday() {

    const shareData = {

        title: "BirthdayVerse 🎂",

        text: getShareText(),

        url: birthdayVerseURL
    };


    if (
        navigator.share
    ) {

        try {

            await navigator.share(
                shareData
            );

            setShareStatus(
                "Shared successfully! 💖"
            );

        } catch {
            // User cancelled sharing.
        }

        return;
    }


    copyBirthdayLink();
}


function shareWhatsApp() {

    const text =
        encodeURIComponent(
            getShareText()
        );


    const url =
        `https://wa.me/?text=${text}`;


    window.open(
        url,
        "_blank",
        "noopener"
    );
}


async function copyBirthdayLink() {

    try {

        await navigator.clipboard.writeText(
            birthdayVerseURL
        );

        setShareStatus(
            "BirthdayVerse link copied! 🔗✨"
        );

    } catch {

        setShareStatus(
            "Copy failed. Please copy the link manually."
        );
    }
}


function setShareStatus(message) {

    if ($("shareStatus")) {
        $("shareStatus").textContent =
            message;
    }
}


/* =========================================================
   QR CODE
   ========================================================= */

function toggleQR() {

    const container =
        $("qrContainer");

    const image =
        $("qrImage");


    if (!container || !image) {
        return;
    }


    if (
        container.classList.contains(
            "show"
        )
    ) {

        container.classList.remove(
            "show"
        );

        return;
    }


    image.src =
        "https://api.qrserver.com/v1/create-qr-code/" +
        "?size=250x250&data=" +
        encodeURIComponent(
            birthdayVerseURL
        );


    container.classList.add(
        "show"
    );


    setShareStatus(
        "Scan this QR code with another phone 📱"
    );
}


/* =========================================================
   POPUPS
   ========================================================= */

function setupPopups() {

    $("closeCelebration")
        ?.addEventListener(
            "click",
            () => {

                $("celebrationPopup")
                    ?.classList.remove(
                        "show"
                    );
            }
        );


    $("closeGiftPopup")
        ?.addEventListener(
            "click",
            () => {

                $("giftPopup")
                    ?.classList.remove(
                        "show"
                    );
            }
        );


    $("installPopupClose")
        ?.addEventListener(
            "click",
            () => {

                $("installPopup")
                    ?.classList.remove(
                        "show"
                    );
            }
        );


    document
        .querySelectorAll(".popup-overlay")
        .forEach(overlay => {

            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        overlay
                    ) {

                        overlay.classList.remove(
                            "show"
                        );
                    }
                }
            );
        });
}


/* =========================================================
   PWA INSTALL
   ========================================================= */

let deferredInstallPrompt = null;


function setupPWAInstall() {

    const installButton =
        $("installButton");


    window.addEventListener(
        "beforeinstallprompt",
        event => {

            event.preventDefault();

            deferredInstallPrompt =
                event;


            if (installButton) {
                installButton.style.display =
                    "flex";
            }
        }
    );


    installButton
        ?.addEventListener(
            "click",
            () => {

                $("installPopup")
                    ?.classList.add(
                        "show"
                    );
            }
        );


    $("confirmInstall")
        ?.addEventListener(
            "click",
            installApp
        );


    window.addEventListener(
        "appinstalled",
        () => {

            deferredInstallPrompt = null;

            $("installPopup")
                ?.classList.remove(
                    "show"
                );

            setShareStatus(
                "BirthdayVerse installed successfully! 📱✨"
            );
        }
    );
}


async function installApp() {

    if (!deferredInstallPrompt) {

        setShareStatus(
            "Use your browser's 'Add to Home Screen' option to install BirthdayVerse. 📱"
        );

        $("installPopup")
            ?.classList.remove(
                "show"
            );

        return;
    }


    deferredInstallPrompt.prompt();


    try {

        await deferredInstallPrompt.userChoice;

    } catch {
        // Installation cancelled.
    }


    deferredInstallPrompt = null;

    $("installPopup")
        ?.classList.remove(
            "show"
        );
}


/* =========================================================
   SERVICE WORKER
   ========================================================= */

function registerServiceWorker() {

    if (
        "serviceWorker" in navigator
    ) {

        window.addEventListener(
            "load",
            () => {

                navigator.serviceWorker
                    .register("./sw.js")
                    .then(() => {

                        console.log(
                            "BirthdayVerse Service Worker registered."
                        );

                    })
                    .catch(error => {

                        console.log(
                            "Service Worker registration failed:",
                            error
                        );
                    });
            }
        );
    }
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function setupScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {
                element.classList.add(
                    "visible"
                );
            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList.add(
                                    "visible"
                                );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        element => {
            observer.observe(element);
        }
    );
}


/* =========================================================
   BACK BUTTON
   ========================================================= */

function setupBackButton() {

    $("backButton")
        ?.addEventListener(
            "click",
            () => {

                if (
                    window.history.length >
                    1
                ) {

                    window.history.back();

                } else {

                    window.location.href =
                        "./index.html";
                }
            }
        );
}


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

function setupKeyboard() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                document
                    .querySelectorAll(
                        ".popup-overlay.show"
                    )
                    .forEach(
                        popup => {
                            popup.classList.remove(
                                "show"
                            );
                        }
                    );

                closeLightbox();
            }


            if (
                event.key === "ArrowRight"
            ) {

                const lightbox =
                    $("imageLightbox");

                if (
                    lightbox?.classList.contains(
                        "show"
                    )
                ) {
                    nextImage();
                }
            }


            if (
                event.key === "ArrowLeft"
            ) {

                const lightbox =
                    $("imageLightbox");

                if (
                    lightbox?.classList.contains(
                        "show"
                    )
                ) {
                    previousImage();
                }
            }
        }
    );
}


/* =========================================================
   WINDOW RESIZE
   ========================================================= */

function setupResize() {

    window.addEventListener(
        "resize",
        resizeFireworksCanvas
    );

    resizeFireworksCanvas();
}


/* =========================================================
   SAVE EXISTING MEDIA TO INDEXEDDB
   ========================================================= */

async function migrateMediaToIndexedDB() {

    if (!birthdayMedia) {
        return;
    }


    const photos =
        getMediaArray(
            "photos",
            "photo",
            "images"
        );

    const videos =
        getMediaArray(
            "videos",
            "video"
        );

    const music =
        getMediaArray(
            "music",
            "songs",
            "audio"
        );


    if (photos.length) {
        await saveMediaToDB(
            "photos",
            photos
        );
    }

    if (videos.length) {
        await saveMediaToDB(
            "videos",
            videos
        );
    }

    if (music.length) {
        await saveMediaToDB(
            "music",
            music
        );
    }
}


/* =========================================================
   MAIN INITIALIZATION
   ========================================================= */

async function initializeBirthdayVerse() {

    loadPersonalization();

    createBirthdayLetter();

    setupThemes();

    createStars();

    startTyping();

    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    setupCandles();

    setupFireworks();

    setupBalloons();

    setupLightbox();

    setupMemoryBook();

    setupLetter();

    setupGift();

    setupSharing();

    setupPopups();

    setupPWAInstall();

    setupScrollReveal();

    setupBackButton();

    setupKeyboard();

    setupResize();


    await setupPhotoGallery();

    await setupVideoGallery();

    await setupMusic();


    migrateMediaToIndexedDB();

    registerServiceWorker();


    console.log(
        "🎂 BirthdayVerse loaded successfully!"
    );
}


/* =========================================================
   START
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeBirthdayVerse
    );

} else {

    initializeBirthdayVerse();
}
