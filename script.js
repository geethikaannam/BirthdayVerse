
/* =========================================
   BIRTHDAYVERSE - PART 8A
   IndexedDB + PWA + QR + Sharing
========================================= */


/* =========================================
   DATA
========================================= */

let birthdayData = {};

try {

    birthdayData =
        JSON.parse(
            localStorage.getItem("birthdayData")
        ) || {};

} catch {

    birthdayData = {};

}


let birthdayMedia = {};

try {

    birthdayMedia =
        JSON.parse(
            localStorage.getItem("birthdayMedia")
        ) || {};

} catch {

    birthdayMedia = {};

}


/* =========================================
   DOM READY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeBirthdayVerse
);


/* =========================================
   INITIALIZE
========================================= */

async function initializeBirthdayVerse() {

    setupPersonalization();

    setupThemes();

    createStars();

    startTyping();

    startCountdown();

    setupCandles();

    setupFireworks();

    setupBalloons();

    setupGallery();

    setupVideos();

    setupMemoryBook();

    setupMusic();

    setupLetter();

    setupGift();

    setupSharing();

    setupScrollReveal();

    setupPopups();

    setupBackButton();

    setupMusicTopButton();

    setupPWA();

    setupIndexedDB();

    setTimeout(
        () => createConfetti(25),
        1000
    );
}


/* =========================================
   PERSONALIZATION
========================================= */

function setupPersonalization() {

    const name =
        birthdayData.personName ||
        birthdayData.name ||
        "Birthday Star";

    const nickname =
        birthdayData.nickname ||
        name;

    const age =
        birthdayData.age ||
        "";

    const sender =
        birthdayData.senderName ||
        "Someone who loves you ❤️";

    const message =
        birthdayData.birthdayMessage ||
        "May your birthday be filled with happiness, love and unforgettable memories. ✨";


    const birthdayTitle =
        document.getElementById(
            "birthdayTitle"
        );

    const birthdaySubtitle =
        document.getElementById(
            "birthdaySubtitle"
        );

    const ageText =
        document.getElementById(
            "ageText"
        );

    const personalMessage =
        document.getElementById(
            "personalMessage"
        );

    const senderDisplay =
        document.getElementById(
            "senderDisplay"
        );

    const finalName =
        document.getElementById(
            "finalName"
        );

    const memoryBookText =
        document.getElementById(
            "memoryBookText"
        );

    const memoryBookName =
        document.getElementById(
            "memoryBookName"
        );

    const birthdayLetterText =
        document.getElementById(
            "birthdayLetterText"
        );


    if (birthdayTitle) {

        birthdayTitle.textContent =
            `Happy Birthday, ${name}! 🎂`;

    }


    if (birthdaySubtitle) {

        birthdaySubtitle.textContent =
            `Today is your special day, ${nickname}. ✨`;

    }


    if (ageText) {

        ageText.textContent =
            age
                ? `Celebrating ${age} amazing years! 🎉`
                : "";

    }


    if (personalMessage) {

        personalMessage.textContent =
            message;

    }


    if (senderDisplay) {

        senderDisplay.textContent =
            `With love, ${sender} ❤️`;

    }


    if (finalName) {

        finalName.textContent =
            name;

    }


    if (memoryBookName) {

        memoryBookName.textContent =
            name;

    }


    if (memoryBookText) {

        memoryBookText.textContent =
            `${message} Every moment with you is a memory worth keeping forever. 💖`;

    }


    if (birthdayLetterText) {

        birthdayLetterText.innerHTML = `

            <p>
                Today is not just another day.
                Today is a celebration of someone truly special.
            </p>

            <p>
                ${escapeHTML(message)}
            </p>

            <p>
                May every dream you have find its way to you,
                and may the coming year bring you countless
                reasons to smile.
            </p>

        `;

    }

}


/* =========================================
   SAFE HTML
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;
}


/* =========================================
   THEMES
========================================= */

function setupThemes() {

    const buttons =
        document.querySelectorAll(
            ".theme-choice"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const theme =
                    button.dataset.theme;

                document.body.className =
                    `theme-${theme}`;

                buttons.forEach(
                    btn =>
                        btn.classList.remove(
                            "active"
                        )
                );

                button.classList.add(
                    "active"
                );


                localStorage.setItem(
                    "birthdayTheme",
                    theme
                );

            }
        );

    });


    const savedTheme =
        localStorage.getItem(
            "birthdayTheme"
        );


    if (savedTheme) {

        document.body.className =
            `theme-${savedTheme}`;


        buttons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.theme ===
                savedTheme
            );

        });

    }

}


/* =========================================
   STARS
========================================= */

function createStars() {

    const container =
        document.getElementById(
            "stars"
        );

    if (!container) return;

    container.innerHTML = "";


    for (
        let i = 0;
        i < 180;
        i++
    ) {

        const star =
            document.createElement(
                "div"
            );

        star.className =
            "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 3 + "s";

        container.appendChild(
            star
        );

    }

}


/* =========================================
   TYPING
========================================= */

function typeText(
    element,
    text,
    speed = 50
) {

    if (!element) return;

    element.textContent = "";

    let index = 0;


    const timer =
        setInterval(
            () => {

                element.textContent +=
                    text[index];

                index++;


                if (
                    index >=
                    text.length
                ) {

                    clearInterval(timer);

                }

            },
            speed
        );
}


function startTyping() {

    const greeting =
        document.getElementById(
            "typingGreeting"
        );

    const subtitle =
        document.getElementById(
            "typingSubtitle"
        );


    const name =
        birthdayData.personName ||
        birthdayData.name ||
        "Birthday Star";


    setTimeout(
        () => {

            typeText(
                greeting,
                `Welcome to your BirthdayVerse, ${name} ✨`,
                45
            );


            setTimeout(
                () => {

                    typeText(
                        subtitle,
                        "A little universe created especially for you... 💖",
                        35
                    );

                },
                2200
            );

        },
        500
    );

}


/* =========================================
   COUNTDOWN
========================================= */

function startCountdown() {

    const birthdayDate =
        birthdayData.birthdayDate;

    if (!birthdayDate) return;


    function update() {

        const now =
            new Date();

        let target =
            new Date(
                birthdayDate
            );


        if (
            isNaN(
                target.getTime()
            )
        ) return;


        target.setFullYear(
            now.getFullYear()
        );


        if (target <= now) {

            target.setFullYear(
                now.getFullYear() + 1
            );

        }


        const difference =
            target - now;


        const days =
            Math.floor(
                difference /
                86400000
            );


        const hours =
            Math.floor(
                difference /
                3600000
            ) % 24;


        const minutes =
            Math.floor(
                difference /
                60000
            ) % 60;


        const seconds =
            Math.floor(
                difference /
                1000
            ) % 60;


        setText(
            "countDays",
            String(days).padStart(2,"0")
        );

        setText(
            "countHours",
            String(hours).padStart(2,"0")
        );

        setText(
            "countMinutes",
            String(minutes).padStart(2,"0")
        );

        setText(
            "countSeconds",
            String(seconds).padStart(2,"0")
        );

    }


    update();

    setInterval(
        update,
        1000
    );

}


/* =========================================
   HELPER
========================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================
   CANDLES
========================================= */

function setupCandles() {

    const button =
        document.getElementById(
            "blowButton"
        );

    const candles =
        document.querySelectorAll(
            ".candle"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            candles.forEach(
                candle =>
                    candle.classList.add(
                        "blown"
                    )
            );


            setText(
                "wishMessage",
                "✨ Your wish has been sent into the universe! ✨"
            );


            createConfetti(100);

            launchFireworks();


            const popup =
                document.getElementById(
                    "celebrationPopup"
                );

            if (popup) {

                popup.classList.add(
                    "active"
                );

            }

        }
    );

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti(
    amount = 60
) {

    const container =
        document.getElementById(
            "confettiContainer"
        );

    if (!container) return;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );

        piece.className =
            "confetti";


        piece.style.left =
            Math.random() * 100 +
            "vw";


        piece.style.top =
            "-20px";


        piece.style.background =
            `hsl(${Math.random()*360},90%,65%)`;


        piece.style.animationDuration =
            2 +
            Math.random() * 3 +
            "s";


        piece.style.animationDelay =
            Math.random() +
            "s";


        container.appendChild(
            piece
        );


        setTimeout(
            () => piece.remove(),
            5000
        );

    }

}


/* =========================================
   FIREWORKS
========================================= */

let fireworks = [];


function setupFireworks() {

    const canvas =
        document.getElementById(
            "fireworksCanvas"
        );

    if (!canvas) return;


    const ctx =
        canvas.getContext(
            "2d"
        );


    function resize() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }


    resize();


    window.addEventListener(
        "resize",
        resize
    );


    function animate() {

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


        fireworks.forEach(
            particle => {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;

                particle.vy +=
                    .05;

                particle.life--;


                ctx.globalAlpha =
                    particle.life /
                    100;

                ctx.fillStyle =
                    particle.color;


                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    3,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }
        );


        ctx.globalAlpha = 1;


        requestAnimationFrame(
            animate
        );

    }


    animate();


    const button =
        document.getElementById(
            "fireworksButton"
        );


    if (button) {

        button.addEventListener(
            "click",
            () => {

                for (
                    let i = 0;
                    i < 5;
                    i++
                ) {

                    setTimeout(
                        launchFireworks,
                        i * 500
                    );

                }

            }
        );

    }

}


function createFirework(
    x,
    y
) {

    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI * 2;

        const speed =
            Math.random() * 6 + 2;


        fireworks.push({

            x,
            y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life: 100,

            color:
                `hsl(${Math.random()*360},100%,65%)`

        });

    }

}


function launchFireworks() {

    const canvas =
        document.getElementById(
            "fireworksCanvas"
        );

    if (!canvas) return;


    createFirework(
        Math.random() *
            canvas.width,

        150 +
            Math.random() *
            250
    );

}


/* =========================================
   BALLOONS
========================================= */

function setupBalloons() {

    let score = 0;

    const container =
        document.getElementById(
            "balloons"
        );


    if (!container) return;


    function createBalloon() {

        const balloon =
            document.createElement(
                "div"
            );


        balloon.className =
            "interactive-balloon";


        balloon.style.left =
            Math.random() *
            90 +
            "vw";


        balloon.style.background =
            `hsl(${Math.random()*360},80%,60%)`;


        balloon.addEventListener(
            "click",
            () => {

                balloon.classList.add(
                    "popped"
                );


                score++;


                setText(
                    "balloonScore",
                    score
                );


                createConfetti(10);


                setTimeout(
                    () =>
                        balloon.remove(),
                    250
                );

            }
        );


        container.appendChild(
            balloon
        );


        setTimeout(
            () =>
                balloon.remove(),
            6000
        );

    }


    setInterval(
        createBalloon,
        1800
    );

}


/* =========================================
   PHOTO GALLERY
========================================= */

let galleryImages = [];

let currentImage = 0;


function getPhotoSource(item) {

    if (!item) return "";


    if (
        typeof item ===
        "string"
    ) {

        if (
            item.startsWith(
                "data:image"
            ) ||
            item.startsWith(
                "blob:"
            ) ||
            item.startsWith(
                "http"
            )
        ) {

            return item;

        }


        return "";

    }


    return (
        item.preview ||
        item.dataUrl ||
        item.url ||
        item.src ||
        ""
    );

}


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

    galleryImages = [];


    let photos =
        birthdayMedia.photos ||
        birthdayMedia.photo ||
        [];


    if (!Array.isArray(photos)) {

        photos = [];

    }


    photos.forEach(
        item => {

            const source =
                getPhotoSource(item);


            if (!source) return;


            galleryImages.push(
                source
            );


            const wrapper =
                document.createElement(
                    "div"
                );

            wrapper.className =
                "photo-item";


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                source;

            image.alt =
                "Birthday memory";


            image.addEventListener(
                "click",
                () => {

                    currentImage =
                        galleryImages.indexOf(
                            source
                        );

                    openLightbox();

                }
            );


            wrapper.appendChild(
                image
            );

            gallery.appendChild(
                wrapper
            );

        }
    );


    if (empty) {

        empty.style.display =
            galleryImages.length
                ? "none"
                : "block";

    }


    updateMemoryPhoto();

}


/* =========================================
   LIGHTBOX
========================================= */

function openLightbox() {

    if (!galleryImages.length)
        return;


    const lightbox =
        document.getElementById(
            "imageLightbox"
        );

    const image =
        document.getElementById(
            "lightboxImage"
        );


    image.src =
        galleryImages[
            currentImage
        ];


    lightbox.classList.add(
        "active"
    );

}


function closeLightbox() {

    const lightbox =
        document.getElementById(
            "imageLightbox"
        );


    lightbox.classList.remove(
        "active"
    );

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const close =
            document.getElementById(
                "closeLightbox"
            );


        const previous =
            document.getElementById(
                "previousImage"
            );


        const next =
            document.getElementById(
                "nextImage"
            );


        if (close) {

            close.addEventListener(
                "click",
                closeLightbox
            );

        }


        if (previous) {

            previous.addEventListener(
                "click",
                () => {

                    if (
                        !galleryImages.length
                    )
                        return;


                    currentImage--;

                    if (
                        currentImage < 0
                    ) {

                        currentImage =
                            galleryImages.length -
                            1;

                    }


                    openLightbox();

                }
            );

        }


        if (next) {

            next.addEventListener(
                "click",
                () => {

                    if (
                        !galleryImages.length
                    )
                        return;


                    currentImage++;


                    if (
                        currentImage >=
                        galleryImages.length
                    ) {

                        currentImage = 0;

                    }


                    openLightbox();

                }
            );

        }

    }
);


/* =========================================
   VIDEOS
========================================= */

function getVideoSource(item) {

    if (!item) return "";


    if (
        typeof item ===
        "string"
    ) {

        if (
            item.startsWith("blob:") ||
            item.startsWith("data:video") ||
            item.startsWith("http")
        ) {

            return item;

        }


        return "";

    }


    return (
        item.preview ||
        item.dataUrl ||
        item.url ||
        item.src ||
        ""
    );

}


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


    let videos =
        birthdayMedia.videos ||
        birthdayMedia.video ||
        [];


    if (!Array.isArray(videos)) {

        videos = [];

    }


    let count = 0;


    videos.forEach(
        item => {

            const source =
                getVideoSource(item);


            if (!source) return;


            count++;


            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "video-item";


            const video =
                document.createElement(
                    "video"
                );


            video.src =
                source;

            video.controls =
                true;


            wrapper.appendChild(
                video
            );


            gallery.appendChild(
                wrapper
            );

        }
    );


    if (empty) {

        empty.style.display =
            count
                ? "none"
                : "block";

    }

}


/* =========================================
   MEMORY BOOK
========================================= */

function setupMemoryBook() {

    const book =
        document.getElementById(
            "memoryBook"
        );


    const openButton =
        document.getElementById(
            "openMemoryBook"
        );


    const closeButton =
        document.getElementById(
            "closeMemoryBook"
        );


    const pages =
        document.querySelectorAll(
            ".memory-page"
        );


    let currentPage = 0;


    if (
        !book ||
        !openButton ||
        !closeButton
    )
        return;


    openButton.addEventListener(
        "click",
        () => {

            book.classList.add(
                "open"
            );

        }
    );


    closeButton.addEventListener(
        "click",
        () => {

            book.classList.remove(
                "open"
            );

        }
    );


    function showPage(index) {

        if (
            index < 0
        ) {

            index =
                pages.length - 1;

        }


        if (
            index >=
            pages.length
        ) {

            index = 0;

        }


        currentPage =
            index;


        pages.forEach(
            page =>
                page.classList.remove(
                    "active"
                )
        );


        pages[
            currentPage
        ].classList.add(
            "active"
        );

    }


    const pageArea =
        document.querySelector(
            ".memory-pages"
        );


    if (pageArea) {

        pageArea.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        "#closeMemoryBook"
                    )
                )
                    return;


                const rect =
                    pageArea.getBoundingClientRect();


                if (
                    event.clientX -
                    rect.left <
                    rect.width / 2
                ) {

                    showPage(
                        currentPage - 1
                    );

                } else {

                    showPage(
                        currentPage + 1
                    );

                }

            }
        );

    }

}


/* =========================================
   MEMORY PHOTO
========================================= */

function updateMemoryPhoto() {

    const image =
        document.getElementById(
            "memoryPhotoPreview"
        );


    if (!image) return;


    if (galleryImages.length) {

        image.src =
            galleryImages[0];

        image.style.display =
            "block";

    } else {

        image.style.display =
            "none";

    }

}


/* =========================================
   MUSIC
========================================= */

let playlist = [];

let currentSong = 0;

let audio;


function setupMusic() {

    audio =
        document.getElementById(
            "birthdayAudio"
        );


    if (!audio) return;


    const playButton =
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


    let musicFiles =
        birthdayMedia.music ||
        birthdayMedia.musics ||
        birthdayMedia.songs ||
        [];


    if (!Array.isArray(musicFiles)) {

        musicFiles = [];

    }


    musicFiles.forEach(
        (item,index) => {

            const source =
                getMusicSource(item);


            if (source) {

                playlist.push({

                    source,

                    name:
                        getMusicName(
                            item,
                            index
                        )

                });

            }

        }
    );


    if (
        playlist.length
    ) {

        loadSong(0);

    } else {

        setText(
            "musicTitle",
            "Add your birthday songs 🎵"
        );

        setText(
            "songCounter",
            "0 / 0"
        );

    }


    if (playButton) {

        playButton.addEventListener(
            "click",
            () => {

                if (!playlist.length) {

                    alert(
                        "Please add music from the customization page. 🎵"
                    );

                    return;

                }


                if (
                    audio.paused
                ) {

                    playSong();

                } else {

                    pauseSong();

                }

            }
        );

    }


    if (previous) {

        previous.addEventListener(
            "click",
            () => {

                if (
                    !playlist.length
                )
                    return;


                loadSong(
                    currentSong - 1
                );

                playSong();

            }
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            () => {

                if (
                    !playlist.length
                )
                    return;


                loadSong(
                    currentSong + 1
                );

                playSong();

            }
        );

    }


    audio.addEventListener(
        "ended",
        () => {

            loadSong(
                currentSong + 1
            );

            playSong();

        }
    );


    audio.addEventListener(
        "timeupdate",
        updateMusicUI
    );

}


function getMusicSource(item) {

    if (!item) return "";


    if (
        typeof item ===
        "string"
    ) {

        if (
            item.startsWith("blob:") ||
            item.startsWith("data:audio") ||
            item.startsWith("http")
        ) {

            return item;

        }


        return "";

    }


    return (
        item.preview ||
        item.dataUrl ||
        item.url ||
        item.src ||
        ""
    );

}


function getMusicName(
    item,
    index
) {

    if (
        typeof item ===
        "string"
    ) {

        return (
            `Birthday Song ${index + 1}`
        );

    }


    return (
        item.name ||
        `Birthday Song ${index + 1}`
    );

}


function loadSong(index) {

    if (!playlist.length)
        return;


    currentSong =
        (
            index +
            playlist.length
        ) %
        playlist.length;


    const song =
        playlist[
            currentSong
        ];


    audio.src =
        song.source;


    setText(
        "musicTitle",
        song.name
    );


    setText(
        "songCounter",
        `${currentSong + 1} / ${playlist.length}`
    );


    audio.load();

}


function playSong() {

    audio.play()
        .then(
            () => {

                setText(
                    "playMusicButton",
                    "❚❚"
                );


                const disc =
                    document.getElementById(
                        "musicDisc"
                    );


                disc.classList.add(
                    "playing"
                );

            }
        )
        .catch(
            () => {

                alert(
                    "Please add music again from the customization page. 🎵"
                );

            }
        );

}


function pauseSong() {

    audio.pause();


    setText(
        "playMusicButton",
        "▶"
    );


    const disc =
        document.getElementById(
            "musicDisc"
        );


    disc.classList.remove(
        "playing"
    );

}


function updateMusicUI() {

    if (
        !audio ||
        !audio.duration
    )
        return;


    const percentage =
        (
            audio.currentTime /
            audio.duration
        ) * 100;


    const progress =
        document.getElementById(
            "musicProgress"
        );


    if (progress) {

        progress.style.width =
            percentage + "%";

    }


    setText(
        "currentTime",
        formatTime(
            audio.currentTime
        )
    );


    setText(
        "duration",
        formatTime(
            audio.duration
        )
    );

}


function formatTime(seconds) {

    if (
        isNaN(seconds)
    )
        return "0:00";


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secs =
        Math.floor(
            seconds % 60
        );


    return (
        `${minutes}:${String(secs).padStart(2,"0")}`
    );

}


/* =========================================
   LETTER
========================================= */

function setupLetter() {

    const button =
        document.getElementById(
            "openLetter"
        );


    const letter =
        document.querySelector(
            ".birthday-letter"
        );


    if (
        !button ||
        !letter
    )
        return;


    button.addEventListener(
        "click",
        () => {

            letter.classList.add(
                "opened"
            );

        }
    );

}


/* =========================================
   GIFT
========================================= */

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

            gift.classList.toggle(
                "open"
            );


            const opened =
                gift.classList.contains(
                    "open"
                );


            if (opened) {

                message.classList.add(
                    "show"
                );


                hint.textContent =
                    "🎉 Surprise unlocked!";


                document
                    .getElementById(
                        "giftPopup"
                    )
                    .classList.add(
                        "active"
                    );


                createConfetti(80);

                launchFireworks();

            } else {

                message.classList.remove(
                    "show"
                );


                hint.textContent =
                    "🎁 Tap the gift to open it";

            }

        }
    );

}


/* =========================================
   SHARING
========================================= */

function setupSharing() {

    const shareButton =
        document.getElementById(
            "shareButton"
        );


    const whatsappButton =
        document.getElementById(
            "whatsappButton"
        );


    const copyButton =
        document.getElementById(
            "copyLinkButton"
        );


    const qrButton =
        document.getElementById(
            "qrButton"
        );


    const name =
        birthdayData.personName ||
        birthdayData.name ||
        "Birthday Star";


    const shareText =
        `🎂 Check out this special BirthdayVerse celebration for ${name}! ✨`;


    if (shareButton) {

        shareButton.addEventListener(
            "click",
            async () => {

                if (
                    navigator.share
                ) {

                    try {

                        await navigator.share({

                            title:
                                `BirthdayVerse - ${name}`,

                            text:
                                shareText,

                            url:
                                window.location.href

                        });

                    } catch {

                        // User cancelled sharing.

                    }

                } else {

                    copyLink();

                }

            }
        );

    }


    if (whatsappButton) {

        whatsappButton.addEventListener(
            "click",
            () => {

                const url =
                    `https://wa.me/?text=${encodeURIComponent(
                        shareText +
                        "\n" +
                        window.location.href
                    )}`;


                window.open(
                    url,
                    "_blank"
                );

            }
        );

    }


    if (copyButton) {

        copyButton.addEventListener(
            "click",
            copyLink
        );

    }


    if (qrButton) {

        qrButton.addEventListener(
            "click",
            generateQRCode
        );

    }

}


async function copyLink() {

    const status =
        document.getElementById(
            "shareStatus"
        );


    try {

        await navigator.clipboard.writeText(
            window.location.href
        );


        status.textContent =
            "✅ Birthday link copied!";

    } catch {

        status.textContent =
            "Please copy the page URL manually.";

    }


    setTimeout(
        () => {

            status.textContent =
                "";

        },
        3000
    );

}


/* =========================================
   QR CODE
========================================= */

function generateQRCode() {

    const container =
        document.getElementById(
            "qrContainer"
        );


    const image =
        document.getElementById(
            "qrImage"
        );


    if (!container || !image)
        return;


    const encoded =
        encodeURIComponent(
            window.location.href
        );


    image.src =
        `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encoded}`;


    container.classList.add(
        "show"
    );

}


/* =========================================
   SCROLL REVEAL
========================================= */

function setupScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        !("IntersectionObserver"
            in window)
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

                            entry.target
                                .classList
                                .add(
                                    "visible"
                                );

                        }

                    }
                );

            },
            {
                threshold:
                    0.12
            }
        );


    elements.forEach(
        element =>
            observer.observe(
                element
            )
    );

}


/* =========================================
   POPUPS
========================================= */

function setupPopups() {

    const popupClose =
        document.getElementById(
            "popupClose"
        );


    const giftClose =
        document.getElementById(
            "giftPopupClose"
        );


    if (popupClose) {

        popupClose.addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "celebrationPopup"
                    )
                    .classList.remove(
                        "active"
                    );

            }
        );

    }


    if (giftClose) {

        giftClose.addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "giftPopup"
                    )
                    .classList.remove(
                        "active"
                    );

            }
        );

    }

}


/* =========================================
   BACK BUTTON
========================================= */

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
                window.history.length > 1
            ) {

                window.history.back();

            } else {

                window.location.href =
                    "index.html";

            }

        }
    );

}


/* =========================================
   MUSIC TOP BUTTON
========================================= */

function setupMusicTopButton() {

    const button =
        document.getElementById(
            "musicButton"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            const section =
                document.querySelector(
                    ".music-section"
                );


            if (section) {

                section.scrollIntoView({
                    behavior:
                        "smooth"
                });

            }

        }
    );

}


/* =========================================
   ESCAPE
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        )
            return;


        document
            .querySelectorAll(
                ".celebration-popup.active"
            )
            .forEach(
                popup =>
                    popup.classList.remove(
                        "active"
                    )
            );


        const lightbox =
            document.getElementById(
                "imageLightbox"
            );


        if (lightbox) {

            lightbox.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================
   INDEXEDDB
========================================= */

const DB_NAME =
    "BirthdayVerseDB";

const DB_VERSION =
    1;

const STORE_NAME =
    "media";


function openDatabase() {

    return new Promise(
        (resolve,reject) => {

            const request =
                indexedDB.open(
                    DB_NAME,
                    DB_VERSION
                );


            request.onupgradeneeded =
                event => {

                    const db =
                        event.target.result;


                    if (
                        !db.objectStoreNames
                            .contains(
                                STORE_NAME
                            )
                    ) {

                        db.createObjectStore(
                            STORE_NAME
                        );

                    }

                };


            request.onsuccess =
                () => {

                    resolve(
                        request.result
                    );

                };


            request.onerror =
                () => {

                    reject(
                        request.error
                    );

                };

        }
    );

}


/* =========================================
   SAVE MEDIA
========================================= */

async function saveMedia(
    key,
    value
) {

    try {

        const db =
            await openDatabase();


        return new Promise(
            (resolve,reject) => {

                const transaction =
                    db.transaction(
                        STORE_NAME,
                        "readwrite"
                    );


                const store =
                    transaction.objectStore(
                        STORE_NAME
                    );


                const request =
                    store.put(
                        value,
                        key
                    );


                request.onsuccess =
                    () =>
                        resolve(true);


                request.onerror =
                    () =>
                        reject(
                            request.error
                        );

            }
        );

    } catch {

        return false;

    }

}


/* =========================================
   GET MEDIA
========================================= */

async function getMedia(
    key
) {

    try {

        const db =
            await openDatabase();


        return new Promise(
            (resolve,reject) => {

                const transaction =
                    db.transaction(
                        STORE_NAME,
                        "readonly"
                    );


                const store =
                    transaction.objectStore(
                        STORE_NAME
                    );


                const request =
                    store.get(
                        key
                    );


                request.onsuccess =
                    () =>
                        resolve(
                            request.result
                        );


                request.onerror =
                    () =>
                        reject(
                            request.error
                        );

            }
        );

    } catch {

        return null;

    }

}


/* =========================================
   INDEXEDDB SETUP
========================================= */

async function setupIndexedDB() {

    if (
        !("indexedDB" in window)
    ) {

        console.warn(
            "IndexedDB is not supported."
        );

        return;

    }


    try {

        await openDatabase();

        await migrateLocalMedia();

        await loadStoredMedia();

    } catch(error) {

        console.warn(
            "IndexedDB setup failed:",
            error
        );

    }

}


/* =========================================
   MIGRATE LOCAL STORAGE MEDIA
========================================= */

async function migrateLocalMedia() {

    const existing =
        await getMedia(
            "birthdayMedia"
        );


    if (existing) {

        return;

    }


    if (
        birthdayMedia &&
        typeof birthdayMedia ===
        "object"
    ) {

        await saveMedia(
            "birthdayMedia",
            birthdayMedia
        );

    }

}


/* =========================================
   LOAD INDEXEDDB MEDIA
========================================= */

async function loadStoredMedia() {

    const stored =
        await getMedia(
            "birthdayMedia"
        );


    if (!stored) return;


    birthdayMedia =
        stored;


    setupGallery();

    setupVideos();

}


/* =========================================
   PWA
========================================= */

let deferredInstallPrompt =
    null;


function setupPWA() {

    const installButton =
        document.getElementById(
            "installButton"
        );


    const installPopup =
        document.getElementById(
            "installPopup"
        );


    const closeButton =
        document.getElementById(
            "installPopupClose"
        );


    const confirmButton =
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
                    "block";

            }

        }
    );


    if (installButton) {

        installButton.addEventListener(
            "click",
            () => {

                if (
                    deferredInstallPrompt
                ) {

                    installPopup.classList.add(
                        "active"
                    );

                } else {

                    alert(
                        "If the Install button is not available, open BirthdayVerse in Chrome using Live Server or HTTPS."
                    );

                }

            }
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => {

                installPopup.classList.remove(
                    "active"
                );

            }
        );

    }


    if (confirmButton) {

        confirmButton.addEventListener(
            "click",
            async () => {

                if (
                    !deferredInstallPrompt
                )
                    return;


                deferredInstallPrompt.prompt();


                const result =
                    await deferredInstallPrompt.userChoice;


                console.log(
                    "Install result:",
                    result.outcome
                );


                deferredInstallPrompt =
                    null;


                installPopup.classList.remove(
                    "active"
                );

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

        }
    );


    registerServiceWorker();

}


/* =========================================
   SERVICE WORKER
========================================= */

function registerServiceWorker() {

    if (
        "serviceWorker" in navigator
    ) {

        window.addEventListener(
            "load",
            () => {

                navigator.serviceWorker
                    .register(
                        "sw.js"
                    )
                    .then(
                        registration => {

                            console.log(
                                "BirthdayVerse Service Worker registered:",
                                registration.scope
                            );

                        }
                    )
                    .catch(
                        error => {

                            console.warn(
                                "Service Worker registration failed:",
                                error
                            );

                        }
                    );

            }
        );

    }

}
