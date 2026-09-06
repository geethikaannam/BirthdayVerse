/* =========================================================
   BIRTHDAYVERSE
   Complete GitHub-ready script.js
   ========================================================= */


/* =========================================================
   1. GLOBAL DATA
   ========================================================= */

let birthdayData = JSON.parse(
    localStorage.getItem("birthdayData") || "{}"
);

let birthdayMedia = JSON.parse(
    localStorage.getItem("birthdayMedia") || "{}"
);

let selectedTheme =
    localStorage.getItem("birthdayTheme") || "love";


/* =========================================================
   2. INDEXEDDB
   ========================================================= */

const DB_NAME = "BirthdayVerseDB";
const DB_VERSION = 1;
const STORE_NAME = "media";

let db = null;


function openDatabase() {

    return new Promise((resolve, reject) => {

        const request =
            indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = event => {

            const database = event.target.result;

            if (!database.objectStoreNames.contains(STORE_NAME)) {

                database.createObjectStore(
                    STORE_NAME
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


function saveMedia(key, value) {

    if (!db) return Promise.resolve();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                STORE_NAME,
                "readwrite"
            );

        const store =
            transaction.objectStore(STORE_NAME);

        const request =
            store.put(value, key);

        request.onsuccess = () => resolve();

        request.onerror = () =>
            reject(request.error);

    });

}


function getMedia(key) {

    if (!db) return Promise.resolve(null);

    return new Promise((resolve, reject) => {

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

            resolve(request.result || null);

        };

        request.onerror = () =>
            reject(request.error);

    });

}


async function setupIndexedDB() {

    try {

        await openDatabase();

        await migrateLocalMedia();

        await loadStoredMedia();

    } catch (error) {

        console.log(
            "IndexedDB error:",
            error
        );

        setupGallery();
        setupVideos();

    }

}


async function migrateLocalMedia() {

    if (
        birthdayMedia &&
        Object.keys(birthdayMedia).length > 0
    ) {

        await saveMedia(
            "birthdayMedia",
            birthdayMedia
        );

    }

}


async function loadStoredMedia() {

    const stored =
        await getMedia("birthdayMedia");

    if (stored) {

        birthdayMedia = stored;

        localStorage.setItem(
            "birthdayMedia",
            JSON.stringify(birthdayMedia)
        );

    }

    setupGallery();
    setupVideos();

}


/* =========================================================
   3. PERSONALIZATION
   ========================================================= */

function setupPersonalization() {

    const name =
        birthdayData.name ||
        birthdayData.birthdayPerson ||
        "Birthday Star";

    const nickname =
        birthdayData.nickname ||
        name;

    const age =
        birthdayData.age || "";

    const sender =
        birthdayData.sender ||
        "Someone Special";

    const message =
        birthdayData.message ||
        `Wishing you a beautiful birthday filled with happiness,
        love, laughter and unforgettable memories.`;

    const title =
        document.getElementById("birthdayTitle");

    const subtitle =
        document.getElementById("birthdaySubtitle");

    const ageText =
        document.getElementById("ageText");

    const personalMessage =
        document.getElementById("personalMessage");

    const senderDisplay =
        document.getElementById("senderDisplay");

    const memoryBookName =
        document.getElementById("memoryBookName");

    if (title) {

        title.textContent =
            `Happy Birthday, ${name}!`;

    }

    if (subtitle) {

        subtitle.textContent =
            `Today is all about you, ${nickname} 💖`;

    }

    if (ageText) {

        ageText.textContent =
            age
                ? `✨ Celebrating ${age} amazing years ✨`
                : "";

    }

    if (personalMessage) {

        personalMessage.textContent =
            message;

    }

    if (senderDisplay) {

        senderDisplay.textContent =
            `With love, ${sender}`;

    }

    if (memoryBookName) {

        memoryBookName.textContent =
            name;

    }

}


/* =========================================================
   4. BIRTHDAY LETTER
   ========================================================= */

function setupBirthdayLetter() {

    const letter =
        document.getElementById(
            "birthdayLetterText"
        );

    if (!letter) return;

    const name =
        birthdayData.name ||
        birthdayData.birthdayPerson ||
        "Special One";

    const sender =
        birthdayData.sender ||
        "Someone Special";

    const customMessage =
        birthdayData.message ||
        "May your life always be filled with happiness, love and beautiful memories.";

    letter.innerHTML = `
        Dear ${name},<br><br>

        Today is a very special day because
        it celebrates someone truly wonderful —
        <strong>YOU! 💖</strong><br><br>

        ${customMessage}<br><br>

        May this new year of your life bring
        you countless reasons to smile,
        beautiful memories and dreams that
        slowly turn into reality. ✨<br><br>

        Keep shining, keep smiling and never
        stop being the amazing person you are. 🌸<br><br>

        Happy Birthday! 🎂🎉<br><br>

        With lots of love,<br>
        <strong>${sender}</strong>
    `;

}


/* =========================================================
   5. THEMES
   ========================================================= */

function setupThemes() {

    document.body.classList.remove(
        "theme-love",
        "theme-ocean",
        "theme-royal",
        "theme-midnight",
        "theme-sunset",
        "theme-galaxy"
    );

    document.body.classList.add(
        `theme-${selectedTheme}`
    );


    document
        .querySelectorAll(".theme-choice")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    selectedTheme =
                        button.dataset.theme;

                    localStorage.setItem(
                        "birthdayTheme",
                        selectedTheme
                    );

                    document.body.classList.remove(
                        "theme-love",
                        "theme-ocean",
                        "theme-royal",
                        "theme-midnight",
                        "theme-sunset",
                        "theme-galaxy"
                    );

                    document.body.classList.add(
                        `theme-${selectedTheme}`
                    );

                    document
                        .querySelectorAll(
                            ".theme-choice"
                        )
                        .forEach(btn =>
                            btn.classList.remove(
                                "active"
                            )
                        );

                    button.classList.add(
                        "active"
                    );

                }
            );

            if (
                button.dataset.theme ===
                selectedTheme
            ) {

                button.classList.add("active");

            }

        });

}


/* =========================================================
   6. STARS
   ========================================================= */

function createStars() {

    const container =
        document.getElementById("stars");

    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < 180; i++) {

        const star =
            document.createElement("span");

        star.className = "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 5 + "s";

        star.style.animationDuration =
            2 + Math.random() * 4 + "s";

        container.appendChild(star);

    }

}


/* =========================================================
   7. TYPING EFFECT
   ========================================================= */

function typeText(element, text, speed = 60) {

    if (!element) return;

    element.textContent = "";

    let index = 0;

    function type() {

        if (index < text.length) {

            element.textContent +=
                text.charAt(index);

            index++;

            setTimeout(
                type,
                speed
            );

        }

    }

    type();

}


function setupTyping() {

    const name =
        birthdayData.name ||
        birthdayData.birthdayPerson ||
        "Birthday Star";

    const greeting =
        document.getElementById(
            "typingGreeting"
        );

    const subtitle =
        document.getElementById(
            "typingSubtitle"
        );

    setTimeout(() => {

        typeText(
            greeting,
            `Hey ${name} ✨`,
            80
        );

    }, 500);

    setTimeout(() => {

        typeText(
            subtitle,
            "A magical birthday experience is waiting for you...",
            45
        );

    }, 1700);

}


/* =========================================================
   8. COUNTDOWN
   ========================================================= */

function setupCountdown() {

    const days =
        document.getElementById(
            "countDays"
        );

    const hours =
        document.getElementById(
            "countHours"
        );

    const minutes =
        document.getElementById(
            "countMinutes"
        );

    const seconds =
        document.getElementById(
            "countSeconds"
        );

    if (
        !days ||
        !hours ||
        !minutes ||
        !seconds
    ) return;


    function updateCountdown() {

        let targetDate;

        if (birthdayData.date) {

            targetDate =
                new Date(
                    birthdayData.date
                );

        } else {

            const now =
                new Date();

            targetDate =
                new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                    23,
                    59,
                    59
                );

        }


        let difference =
            targetDate.getTime() -
            Date.now();


        if (difference < 0) {

            difference =
                0;

        }


        const totalSeconds =
            Math.floor(
                difference / 1000
            );

        const d =
            Math.floor(
                totalSeconds / 86400
            );

        const h =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );

        const m =
            Math.floor(
                (totalSeconds % 3600) / 60
            );

        const s =
            totalSeconds % 60;


        days.textContent =
            String(d).padStart(2, "0");

        hours.textContent =
            String(h).padStart(2, "0");

        minutes.textContent =
            String(m).padStart(2, "0");

        seconds.textContent =
            String(s).padStart(2, "0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );

}


/* =========================================================
   9. CANDLES
   ========================================================= */

let candlesBlown = false;


function setupCandles() {

    const button =
        document.getElementById(
            "blowButton"
        );

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            if (candlesBlown) return;

            candlesBlown = true;


            document
                .querySelectorAll(".flame")
                .forEach(flame => {

                    flame.classList.add(
                        "blown"
                    );

                });


            const wish =
                document.getElementById(
                    "wishMessage"
                );

            if (wish) {

                wish.textContent =
                    "✨ Wish made! May all your dreams come true! 💖";

            }


            createConfetti();

            setTimeout(
                launchFireworks,
                500
            );

            setTimeout(
                showCelebrationPopup,
                1200
            );

        }
    );

}


/* =========================================================
   10. CONFETTI
   ========================================================= */

function createConfetti() {

    const container =
        document.getElementById(
            "confettiContainer"
        );

    if (!container) return;


    for (let i = 0; i < 100; i++) {

        const piece =
            document.createElement("span");

        piece.className =
            "confetti";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.animationDelay =
            Math.random() * 2 + "s";

        piece.style.animationDuration =
            2 + Math.random() * 3 + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        container.appendChild(piece);


        setTimeout(() => {

            piece.remove();

        }, 6000);

    }

}


/* =========================================================
   11. FIREWORKS
   ========================================================= */

let fireworksCanvas;
let fireworksContext;
let fireworks = [];


function setupFireworks() {

    fireworksCanvas =
        document.getElementById(
            "fireworksCanvas"
        );

    if (!fireworksCanvas) return;

    fireworksContext =
        fireworksCanvas.getContext("2d");


    resizeFireworksCanvas();

    window.addEventListener(
        "resize",
        resizeFireworksCanvas
    );


    animateFireworks();


    const button =
        document.getElementById(
            "fireworksButton"
        );

    if (button) {

        button.addEventListener(
            "click",
            launchFireworks
        );

    }

}


function resizeFireworksCanvas() {

    if (!fireworksCanvas) return;

    fireworksCanvas.width =
        window.innerWidth;

    fireworksCanvas.height =
        window.innerHeight;

}


function launchFireworks() {

    if (!fireworksCanvas) return;


    for (let i = 0; i < 5; i++) {

        createFirework(
            Math.random() *
                fireworksCanvas.width,
            100 +
                Math.random() *
                (fireworksCanvas.height / 2)
        );

    }

}


function createFirework(x, y) {

    const particles = [];

    for (let i = 0; i < 45; i++) {

        const angle =
            Math.random() *
            Math.PI * 2;

        const speed =
            2 + Math.random() * 5;

        particles.push({

            x: x,
            y: y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life: 80 + Math.random() * 40

        });

    }

    fireworks.push(
        particles
    );

}


function animateFireworks() {

    if (
        !fireworksCanvas ||
        !fireworksContext
    ) return;


    fireworksContext.clearRect(
        0,
        0,
        fireworksCanvas.width,
        fireworksCanvas.height
    );


    fireworks.forEach(
        particles => {

            particles.forEach(
                particle => {

                    particle.x +=
                        particle.vx;

                    particle.y +=
                        particle.vy;

                    particle.vy +=
                        0.04;

                    particle.life--;


                    fireworksContext.beginPath();

                    fireworksContext.arc(
                        particle.x,
                        particle.y,
                        2,
                        0,
                        Math.PI * 2
                    );

                    fireworksContext.fillStyle =
                        `hsl(${Math.random() * 360}, 100%, 70%)`;

                    fireworksContext.fill();

                }
            );

        }
    );


    fireworks =
        fireworks.filter(
            particles =>
                particles.some(
                    particle =>
                        particle.life > 0
                )
        );


    requestAnimationFrame(
        animateFireworks
    );

}


/* =========================================================
   12. BALLOONS
   ========================================================= */

let balloonScore = 0;


function setupBalloons() {

    const container =
        document.getElementById(
            "balloons"
        );

    if (!container) return;


    for (let i = 0; i < 18; i++) {

        createBalloon(container);

    }

}


function createBalloon(container) {

    const balloon =
        document.createElement("div");

    balloon.className =
        "balloon";

    balloon.style.left =
        Math.random() * 95 + "%";

    balloon.style.animationDelay =
        Math.random() * 8 + "s";

    balloon.style.animationDuration =
        6 + Math.random() * 7 + "s";


    balloon.addEventListener(
        "click",
        () => {

            balloonScore++;

            const score =
                document.getElementById(
                    "balloonScore"
                );

            if (score) {

                score.textContent =
                    `Score: ${balloonScore}`;

            }

            createMiniConfetti(
                balloon
            );

            balloon.remove();

            setTimeout(() => {

                createBalloon(
                    container
                );

            }, 1000);

        }
    );


    container.appendChild(
        balloon
    );

}


function createMiniConfetti(element) {

    const rect =
        element.getBoundingClientRect();

    for (let i = 0; i < 10; i++) {

        const piece =
            document.createElement("span");

        piece.className =
            "mini-confetti";

        piece.style.left =
            rect.left + "px";

        piece.style.top =
            rect.top + "px";

        document.body.appendChild(
            piece
        );

        setTimeout(() => {

            piece.remove();

        }, 1000);

    }

}


/* =========================================================
   13. PHOTO GALLERY
   ========================================================= */

let galleryImages = [];
let currentImageIndex = 0;


function setupGallery() {

    const gallery =
        document.getElementById(
            "photoGallery"
        );

    const empty =
        document.getElementById(
            "emptyGallery"
        );

    if (!gallery) return;


    gallery.innerHTML = "";


    if (
        birthdayMedia.photos &&
        Array.isArray(
            birthdayMedia.photos
        )
    ) {

        galleryImages =
            birthdayMedia.photos;

    } else {

        galleryImages = [];

    }


    if (
        galleryImages.length === 0
    ) {

        if (empty)
            empty.style.display =
                "block";

        return;

    }


    if (empty)
        empty.style.display =
            "none";


    galleryImages.forEach(
        (source, index) => {

            const image =
                document.createElement("img");

            image.src = source;

            image.alt =
                `Birthday Memory ${index + 1}`;

            image.addEventListener(
                "click",
                () => {

                    openLightbox(index);

                }
            );

            gallery.appendChild(
                image
            );

        }
    );

}


/* =========================================================
   14. IMAGE LIGHTBOX
   ========================================================= */

function openLightbox(index) {

    const lightbox =
        document.getElementById(
            "imageLightbox"
        );

    const image =
        document.getElementById(
            "lightboxImage"
        );

    if (
        !lightbox ||
        !image ||
        galleryImages.length === 0
    ) return;


    currentImageIndex =
        index;

    image.src =
        galleryImages[
            currentImageIndex
        ];

    lightbox.classList.add(
        "show"
    );

}


function closeLightbox() {

    const lightbox =
        document.getElementById(
            "imageLightbox"
        );

    if (lightbox) {

        lightbox.classList.remove(
            "show"
        );

    }

}


function setupLightbox() {

    const previous =
        document.getElementById(
            "previousImage"
        );

    const next =
        document.getElementById(
            "nextImage"
        );

    const close =
        document.getElementById(
            "closeLightbox"
        );


    if (previous) {

        previous.addEventListener(
            "click",
            () => {

                if (
                    galleryImages.length === 0
                ) return;

                currentImageIndex--;

                if (
                    currentImageIndex < 0
                ) {

                    currentImageIndex =
                        galleryImages.length - 1;

                }

                document
                    .getElementById(
                        "lightboxImage"
                    )
                    .src =
                    galleryImages[
                        currentImageIndex
                    ];

            }
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            () => {

                if (
                    galleryImages.length === 0
                ) return;

                currentImageIndex++;

                if (
                    currentImageIndex >=
                    galleryImages.length
                ) {

                    currentImageIndex = 0;

                }

                document
                    .getElementById(
                        "lightboxImage"
                    )
                    .src =
                    galleryImages[
                        currentImageIndex
                    ];

            }
        );

    }


    if (close) {

        close.addEventListener(
            "click",
            closeLightbox
        );

    }

}


/* =========================================================
   15. VIDEO GALLERY
   ========================================================= */

function setupVideos() {

    const gallery =
        document.getElementById(
            "videoGallery"
        );

    const empty =
        document.getElementById(
            "emptyVideo"
        );

    if (!gallery) return;


    gallery.innerHTML = "";


    const videos =
        birthdayMedia.videos || [];


    if (
        videos.length === 0
    ) {

        if (empty)
            empty.style.display =
                "block";

        return;

    }


    if (empty)
        empty.style.display =
            "none";


    videos.forEach(
        source => {

            const video =
                document.createElement(
                    "video"
                );

            video.src =
                source;

            video.controls = true;

            video.preload =
                "metadata";

            gallery.appendChild(
                video
            );

        }
    );

}


/* =========================================================
   16. MEMORY BOOK
   ========================================================= */

let currentMemoryPage = 0;


function setupMemoryBook() {

    const book =
        document.getElementById(
            "memoryBook"
        );

    const open =
        document.getElementById(
            "openMemoryBook"
        );

    const close =
        document.getElementById(
            "closeMemoryBook"
        );

    const previous =
        document.getElementById(
            "memoryPrev"
        );

    const next =
        document.getElementById(
            "memoryNext"
        );


    if (open) {

        open.addEventListener(
            "click",
            () => {

                if (!book) return;

                book.classList.add(
                    "show"
                );

                currentMemoryPage = 0;

                updateMemoryPage();

            }
        );

    }


    if (close) {

        close.addEventListener(
            "click",
            () => {

                book.classList.remove(
                    "show"
                );

            }
        );

    }


    if (previous) {

        previous.addEventListener(
            "click",
            () => {

                currentMemoryPage--;

                if (
                    currentMemoryPage < 0
                ) {

                    currentMemoryPage = 3;

                }

                updateMemoryPage();

            }
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            () => {

                currentMemoryPage++;

                if (
                    currentMemoryPage > 3
                ) {

                    currentMemoryPage = 0;

                }

                updateMemoryPage();

            }
        );

    }

}


function updateMemoryPage() {

    const pages =
        document.querySelectorAll(
            ".memory-page"
        );

    pages.forEach(
        (page, index) => {

            page.classList.toggle(
                "active",
                index ===
                currentMemoryPage
            );

        }
    );


    const number =
        document.getElementById(
            "memoryPageNumber"
        );

    if (number) {

        number.textContent =
            `${currentMemoryPage + 1} / ${pages.length}`;

    }

}


/* =========================================================
   17. MUSIC PLAYLIST
   ========================================================= */

let songs = [];
let currentSongIndex = 0;


function setupMusic() {

    const audio =
        document.getElementById(
            "birthdayAudio"
        );

    if (!audio) return;


    if (
        birthdayMedia.music &&
        Array.isArray(
            birthdayMedia.music
        )
    ) {

        songs =
            birthdayMedia.music;

    } else {

        songs = [];

    }


    if (
        songs.length === 0
    ) {

        const title =
            document.getElementById(
                "musicTitle"
            );

        if (title) {

            title.textContent =
                "Add your birthday music 🎵";

        }

        return;

    }


    loadSong(
        currentSongIndex
    );


    const play =
        document.getElementById(
            "playMusicButton"
        );

    const previous =
        document.getElementById(
            "previousSong"
        );

    const next =
        document.getElementById(
            "nextSong"
        );


    if (play) {

        play.addEventListener(
            "click",
            toggleMusic
        );

    }


    if (previous) {

        previous.addEventListener(
            "click",
            previousSong
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            nextSong
        );

    }


    audio.addEventListener(
        "timeupdate",
        updateMusicProgress
    );

    audio.addEventListener(
        "loadedmetadata",
        updateDuration
    );

    audio.addEventListener(
        "ended",
        nextSong
    );


    const progress =
        document.getElementById(
            "musicProgress"
        );

    if (progress) {

        progress.addEventListener(
            "input",
            () => {

                if (
                    audio.duration
                ) {

                    audio.currentTime =
                        (
                            progress.value /
                            100
                        ) *
                        audio.duration;

                }

            }
        );

    }

}


function loadSong(index) {

    const audio =
        document.getElementById(
            "birthdayAudio"
        );

    if (!audio) return;

    if (
        songs.length === 0
    ) return;


    currentSongIndex =
        index;


    audio.src =
        songs[
            currentSongIndex
        ];


    audio.load();


    const title =
        document.getElementById(
            "musicTitle"
        );

    const counter =
        document.getElementById(
            "songCounter"
        );


    if (title) {

        title.textContent =
            `Birthday Song ${currentSongIndex + 1}`;

    }


    if (counter) {

        counter.textContent =
            `${currentSongIndex + 1} / ${songs.length}`;

    }

}


function toggleMusic() {

    const audio =
        document.getElementById(
            "birthdayAudio"
        );

    const button =
        document.getElementById(
            "playMusicButton"
        );

    if (!audio) return;


    if (
        audio.paused
    ) {

        audio.play()
            .then(() => {

                if (button)
                    button.textContent =
                        "⏸";

            })
            .catch(() => {});

    } else {

        audio.pause();

        if (button)
            button.textContent =
                "▶";

    }

}


function previousSong() {

    if (
        songs.length === 0
    ) return;


    currentSongIndex--;

    if (
        currentSongIndex < 0
    ) {

        currentSongIndex =
            songs.length - 1;

    }


    loadSong(
        currentSongIndex
    );

}


function nextSong() {

    if (
        songs.length === 0
    ) return;


    currentSongIndex++;

    if (
        currentSongIndex >=
        songs.length
    ) {

        currentSongIndex = 0;

    }


    loadSong(
        currentSongIndex
    );


    const audio =
        document.getElementById(
            "birthdayAudio"
        );

    if (audio) {

        audio.play()
            .catch(() => {});

    }

}


function updateMusicProgress() {

    const audio =
        document.getElementById(
            "birthdayAudio"
        );

    const progress =
        document.getElementById(
            "musicProgress"
        );

    const current =
        document.getElementById(
            "currentTime"
        );


    if (
        !audio ||
        !progress
    ) return;


    if (audio.duration) {

        progress.value =
            (
                audio.currentTime /
                audio.duration
            ) *
            100;

    }


    if (current) {

        current.textContent =
            formatTime(
                audio.currentTime
            );

    }

}


function updateDuration() {

    const audio =
        document.getElementById(
            "birthdayAudio"
        );

    const duration =
        document.getElementById(
            "duration"
        );


    if (
        audio &&
        duration
    ) {

        duration.textContent =
            formatTime(
                audio.duration
            );

    }

}


function formatTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );

    const remaining =
        Math.floor(
            seconds % 60
        );


    return `${minutes}:${String(
        remaining
    ).padStart(2, "0")}`;

}


/* =========================================================
   18. BIRTHDAY LETTER
   ========================================================= */

function setupLetter() {

    const button =
        document.getElementById(
            "openLetter"
        );

    const content =
        document.getElementById(
            "letterContent"
        );

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            if (content) {

                content.classList.toggle(
                    "show"
                );

            }

            button.textContent =
                content &&
                content.classList.contains(
                    "show"
                )
                    ? "💖 Letter Opened"
                    : "💌 Open Letter";

        }
    );

}


/* =========================================================
   19. GIFT
   ========================================================= */

function setupGift() {

    const gift =
        document.getElementById(
            "giftBox"
        );

    const message =
        document.getElementById(
            "giftMessage"
        );

    const hint =
        document.getElementById(
            "giftHint"
        );

    if (!gift) return;


    gift.addEventListener(
        "click",
        () => {

            gift.classList.add(
                "opened"
            );


            if (message) {

                message.classList.add(
                    "show"
                );

            }


            if (hint) {

                hint.textContent =
                    "✨ Surprise unlocked!";

            }


            createConfetti();

            launchFireworks();

            setTimeout(
                showGiftPopup,
                500
            );

        }
    );

}


/* =========================================================
   20. SHARING
   ========================================================= */

const birthdayVerseURL =
    "https://geethikaannam.github.io/BirthdayVerse/";


function setupSharing() {

    const share =
        document.getElementById(
            "shareButton"
        );

    const whatsapp =
        document.getElementById(
            "whatsappButton"
        );

    const copy =
        document.getElementById(
            "copyLinkButton"
        );

    const qr =
        document.getElementById(
            "qrButton"
        );


    if (share) {

        share.addEventListener(
            "click",
            shareBirthdayVerse
        );

    }


    if (whatsapp) {

        whatsapp.addEventListener(
            "click",
            shareWhatsApp
        );

    }


    if (copy) {

        copy.addEventListener(
            "click",
            copyLink
        );

    }


    if (qr) {

        qr.addEventListener(
            "click",
            showQRCode
        );

    }

}


async function shareBirthdayVerse() {

    const name =
        birthdayData.name ||
        birthdayData.birthdayPerson ||
        "someone special";


    const shareData = {

        title:
            "BirthdayVerse 🎂",

        text:
            `A magical birthday celebration for ${name} ✨`,

        url:
            birthdayVerseURL

    };


    if (
        navigator.share
    ) {

        try {

            await navigator.share(
                shareData
            );

        } catch (error) {

            console.log(
                "Share cancelled."
            );

        }

    } else {

        copyLink();

    }

}


function shareWhatsApp() {

    const name =
        birthdayData.name ||
        birthdayData.birthdayPerson ||
        "someone special";


    const message =
        `🎂 Check out this magical BirthdayVerse celebration for ${name}! ✨\n\n${birthdayVerseURL}`;


    const url =
        "https://wa.me/?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        url,
        "_blank"
    );

}


async function copyLink() {

    try {

        await navigator.clipboard.writeText(
            birthdayVerseURL
        );


        showShareStatus(
            "✨ BirthdayVerse link copied!"
        );

    } catch (error) {

        showShareStatus(
            "Please copy this link manually: " +
            birthdayVerseURL
        );

    }

}


function showShareStatus(message) {

    const status =
        document.getElementById(
            "shareStatus"
        );

    if (!status) return;


    status.textContent =
        message;


    setTimeout(() => {

        status.textContent =
            "";

    }, 4000);

}


/* =========================================================
   21. QR CODE
   ========================================================= */

function showQRCode() {

    const container =
        document.getElementById(
            "qrContainer"
        );

    const image =
        document.getElementById(
            "qrImage"
        );

    if (
        !container ||
        !image
    ) return;


    image.src =
        "https://api.qrserver.com/v1/create-qr-code/" +
        "?size=250x250&data=" +
        encodeURIComponent(
            birthdayVerseURL
        );


    container.classList.toggle(
        "show"
    );

}


/* =========================================================
   22. POPUPS
   ========================================================= */

function showCelebrationPopup() {

    const popup =
        document.getElementById(
            "celebrationPopup"
        );

    if (popup) {

        popup.classList.add(
            "show"
        );

    }

}


function showGiftPopup() {

    const popup =
        document.getElementById(
            "giftPopup"
        );

    if (popup) {

        popup.classList.add(
            "show"
        );

    }

}


function setupPopups() {

    const celebration =
        document.getElementById(
            "celebrationPopup"
        );

    const gift =
        document.getElementById(
            "giftPopup"
        );


    const closeCelebration =
        document.getElementById(
            "closeCelebration"
        );

    const closeGift =
        document.getElementById(
            "closeGiftPopup"
        );


    if (closeCelebration) {

        closeCelebration.addEventListener(
            "click",
            () => {

                celebration.classList.remove(
                    "show"
                );

            }
        );

    }


    if (closeGift) {

        closeGift.addEventListener(
            "click",
            () => {

                gift.classList.remove(
                    "show"
                );

            }
        );

    }


    [celebration, gift].forEach(
        popup => {

            if (!popup) return;

            popup.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        popup
                    ) {

                        popup.classList.remove(
                            "show"
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   23. PWA INSTALL
   ========================================================= */

let deferredInstallPrompt = null;


function setupPWA() {

    const installButton =
        document.getElementById(
            "installButton"
        );

    const popup =
        document.getElementById(
            "installPopup"
        );

    const close =
        document.getElementById(
            "installPopupClose"
        );

    const confirm =
        document.getElementById(
            "confirmInstall"
        );


    window.addEventListener(
        "beforeinstallprompt",
        event => {

            event.preventDefault();

            deferredInstallPrompt =
                event;


            if (installButton) {

                installButton.style.display =
                    "inline-flex";

            }

        }
    );


    if (installButton) {

        installButton.addEventListener(
            "click",
            () => {

                if (!deferredInstallPrompt) {

                    if (popup) {

                        popup.classList.add(
                            "show"
                        );

                    }

                    return;

                }

                installApp();

            }
        );

    }


    if (confirm) {

        confirm.addEventListener(
            "click",
            installApp
        );

    }


    if (close) {

        close.addEventListener(
            "click",
            () => {

                if (popup) {

                    popup.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "appinstalled",
        () => {

            deferredInstallPrompt =
                null;

            if (installButton) {

                installButton.style.display =
                    "none";

            }

            if (popup) {

                popup.classList.remove(
                    "show"
                );

            }

        }
    );

}


async function installApp() {

    if (!deferredInstallPrompt) {

        showShareStatus(
            "Use your browser menu to install BirthdayVerse 📱"
        );

        return;

    }


    deferredInstallPrompt.prompt();


    const result =
        await deferredInstallPrompt.userChoice;


    console.log(
        "Install result:",
        result.outcome
    );


    deferredInstallPrompt =
        null;

}


/* =========================================================
   24. SERVICE WORKER
   ========================================================= */

function registerServiceWorker() {

    if (
        "serviceWorker" in navigator
    ) {

        window.addEventListener(
            "load",
            () => {

                navigator.serviceWorker
                    .register("sw.js")
                    .then(
                        registration => {

                            console.log(
                                "Service Worker registered:",
                                registration.scope
                            );

                        }
                    )
                    .catch(
                        error => {

                            console.log(
                                "Service Worker error:",
                                error
                            );

                        }
                    );

            }
        );

    }

}


/* =========================================================
   25. SCROLL REVEAL
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
            element =>
                element.classList.add(
                    "visible"
                )
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

                            entry.target.classList.add(
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
        element =>
            observer.observe(
                element
            )
    );

}


/* =========================================================
   26. TOP MUSIC BUTTON
   ========================================================= */

function setupMusicTopButton() {

    const button =
        document.getElementById(
            "musicButton"
        );

    const audio =
        document.getElementById(
            "birthdayAudio"
        );

    if (
        !button ||
        !audio
    ) return;


    button.addEventListener(
        "click",
        () => {

            toggleMusic();

        }
    );

}


/* =========================================================
   27. BACK BUTTON
   ========================================================= */

function setupBackButton() {

    const button =
        document.getElementById(
            "backButton"
        );

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            if (
                document.referrer
            ) {

                history.back();

            } else {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        }
    );

}


/* =========================================================
   28. KEYBOARD CONTROLS
   ========================================================= */

function setupKeyboardControls() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeLightbox();


                document
                    .querySelectorAll(
                        ".popup-overlay.show"
                    )
                    .forEach(
                        popup =>
                            popup.classList.remove(
                                "show"
                            )
                    );

            }


            if (
                event.key === "ArrowLeft"
            ) {

                if (
                    galleryImages.length > 0
                ) {

                    currentImageIndex--;

                    if (
                        currentImageIndex < 0
                    ) {

                        currentImageIndex =
                            galleryImages.length - 1;

                    }

                    const image =
                        document.getElementById(
                            "lightboxImage"
                        );

                    if (image) {

                        image.src =
                            galleryImages[
                                currentImageIndex
                            ];

                    }

                }

            }


            if (
                event.key === "ArrowRight"
            ) {

                if (
                    galleryImages.length > 0
                ) {

                    currentImageIndex++;

                    if (
                        currentImageIndex >=
                        galleryImages.length
                    ) {

                        currentImageIndex = 0;

                    }

                    const image =
                        document.getElementById(
                            "lightboxImage"
                        );

                    if (image) {

                        image.src =
                            galleryImages[
                                currentImageIndex
                            ];

                    }

                }

            }

        }
    );

}


/* =========================================================
   29. INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        console.log(
            "🎂 BirthdayVerse starting..."
        );


        setupPersonalization();

        setupBirthdayLetter();

        setupThemes();

        createStars();

        setupTyping();

        setupCountdown();

        setupCandles();

        setupFireworks();

        setupBalloons();

        setupLightbox();

        setupMemoryBook();

        setupMusic();

        setupLetter();

        setupGift();

        setupSharing();

        setupPopups();

        setupPWA();

        setupScrollReveal();

        setupMusicTopButton();

        setupBackButton();

        setupKeyboardControls();


        await setupIndexedDB();

        registerServiceWorker();


        console.log(
            "✨ BirthdayVerse ready!"
        );

    }
);
