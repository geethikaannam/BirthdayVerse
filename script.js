/* =========================================
   BIRTHDAYVERSE SCRIPT.JS
========================================= */

let birthdayData = {
    name: "Birthday Star",
    nickname: "Special One",
    age: "",
    sender: "Someone Special",
    date: "",
    message:
        "May your birthday be filled with happiness, love, laughter and unforgettable memories."
};

let birthdayMedia = {
    photos: [],
    videos: [],
    music: [],
    voice: null
};

let currentSong = 0;
let isPlaying = false;
let galleryImages = [];
let galleryIndex = 0;


/* =========================================
   LOAD DATA
========================================= */

function loadBirthdayData() {

    const savedData =
        localStorage.getItem("birthdayData");

    if (savedData) {

        try {

            birthdayData = {
                ...birthdayData,
                ...JSON.parse(savedData)
            };

        } catch (error) {

            console.error(
                "Birthday data error:",
                error
            );
        }
    }


    const savedMedia =
        localStorage.getItem("birthdayMedia");

    if (savedMedia) {

        try {

            birthdayMedia = {
                ...birthdayMedia,
                ...JSON.parse(savedMedia)
            };

        } catch (error) {

            console.error(
                "Media error:",
                error
            );
        }
    }
}


/* =========================================
   DISPLAY DATA
========================================= */

function displayBirthdayData() {

    const title =
        document.getElementById("birthdayTitle");

    const finalName =
        document.getElementById("finalName");

    const message =
        document.getElementById("personalMessage");

    const sender =
        document.getElementById("senderDisplay");

    const age =
        document.getElementById("ageText");

    const letterName =
        document.getElementById("letterName");

    const letterSender =
        document.getElementById("letterSender");


    if (title) {
        title.textContent =
            birthdayData.name ||
            "Birthday Star";
    }


    if (finalName) {
        finalName.textContent =
            birthdayData.name ||
            "Birthday Star";
    }


    if (message) {
        message.textContent =
            birthdayData.message ||
            "Wishing you a beautiful birthday!";
    }


    if (sender) {
        sender.textContent =
            "— " +
            (birthdayData.sender ||
                "Someone Special");
    }


    if (age) {

        if (birthdayData.age) {

            age.textContent =
                "Celebrating " +
                birthdayData.age +
                " wonderful years! 🎉";

        } else {

            age.textContent = "";
        }
    }


    if (letterName) {

        letterName.textContent =
            birthdayData.name ||
            "Birthday Star";
    }


    if (letterSender) {

        letterSender.textContent =
            birthdayData.sender ||
            "Someone Special";
    }


    const letterText =
        document.getElementById("letterText");

    if (letterText) {

        letterText.textContent =
            birthdayData.message ||
            "Wishing you the happiest birthday!";
    }
}


/* =========================================
   THEME
========================================= */

function loadTheme() {

    const theme =
        localStorage.getItem("birthdayTheme") ||
        "love";

    document.body.className =
        "theme-" + theme;
}


function setupThemes() {

    const buttons =
        document.querySelectorAll(
            ".theme-choice"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const theme =
                    button.dataset.theme;

                document.body.className =
                    "theme-" + theme;

                localStorage.setItem(
                    "birthdayTheme",
                    theme
                );

            }
        );

    });
}


/* =========================================
   COUNTDOWN
========================================= */

function startCountdown() {

    const date =
        birthdayData.date;

    if (!date) return;


    function updateCountdown() {

        const now =
            new Date();

        let birthday =
            new Date(date + "T00:00:00");


        if (birthday <= now) {

            birthday =
                new Date(
                    now.getFullYear() + 1,
                    birthday.getMonth(),
                    birthday.getDate()
                );
        }


        const difference =
            birthday.getTime() -
            now.getTime();


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


        setText(
            "days",
            String(days).padStart(2, "0")
        );

        setText(
            "hours",
            String(hours).padStart(2, "0")
        );

        setText(
            "minutes",
            String(minutes).padStart(2, "0")
        );

        setText(
            "seconds",
            String(seconds).padStart(2, "0")
        );
    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );
}


/* =========================================
   HELPER
========================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}


/* =========================================
   PHOTOS
========================================= */

function displayPhotos() {

    const gallery =
        document.getElementById(
            "photoGallery"
        );

    if (!gallery) return;

    gallery.innerHTML = "";

    galleryImages = [];


    if (
        !birthdayMedia.photos ||
        birthdayMedia.photos.length === 0
    ) {

        gallery.innerHTML =
            '<div class="empty-gallery">' +
            '📸 No photos added yet.' +
            '</div>';

        return;
    }


    birthdayMedia.photos.forEach(
        function (photo, index) {

            galleryImages.push(
                photo.src
            );


            const item =
                document.createElement("div");

            item.className =
                "photo-item";


            const img =
                document.createElement("img");

            img.src =
                photo.src;

            img.alt =
                "Memory " + (index + 1);


            img.addEventListener(
                "click",
                function () {

                    openLightbox(index);

                }
            );


            item.appendChild(img);

            gallery.appendChild(item);

        }
    );
}


/* =========================================
   VIDEO
========================================= */

function displayVideos() {

    const gallery =
        document.getElementById(
            "videoGallery"
        );

    if (!gallery) return;

    gallery.innerHTML = "";


    if (
        !birthdayMedia.videos ||
        birthdayMedia.videos.length === 0
    ) {

        gallery.innerHTML =
            '<div class="empty-gallery">' +
            '🎥 No video added yet.' +
            '</div>';

        return;
    }


    birthdayMedia.videos.forEach(
        function (video) {

            const item =
                document.createElement("div");

            item.className =
                "video-item";


            const player =
                document.createElement("video");

            player.src =
                video.src;

            player.controls = true;

            player.playsInline = true;


            item.appendChild(player);

            gallery.appendChild(item);

        }
    );
}


/* =========================================
   MUSIC
========================================= */

function displayMusic() {

    if (
        !birthdayMedia.music ||
        birthdayMedia.music.length === 0
    ) {

        return;
    }


    const title =
        document.getElementById(
            "songTitle"
        );

    if (title) {

        title.textContent =
            birthdayMedia.music[0].name;
    }
}


function toggleMusic() {

    const audio =
        document.getElementById(
            "birthdayAudio"
        );

    if (
        !birthdayMedia.music ||
        birthdayMedia.music.length === 0
    ) {

        setShareStatus(
            "🎵 Add music from Customize first."
        );

        return;
    }


    const song =
        birthdayMedia.music[currentSong];


    if (
        audio.src !==
        new URL(
            song.src,
            window.location.href
        ).href
    ) {

        audio.src =
            song.src;
    }


    if (audio.paused) {

        audio.play()
            .then(function () {

                isPlaying = true;

                updateMusicUI();

            })
            .catch(function (error) {

                console.error(
                    "Music playback error:",
                    error
                );

            });

    } else {

        audio.pause();

        isPlaying = false;

        updateMusicUI();
    }
}


function updateMusicUI() {

    const disc =
        document.getElementById(
            "musicDisc"
        );

    if (!disc) return;


    if (isPlaying) {

        disc.classList.add(
            "playing"
        );

    } else {

        disc.classList.remove(
            "playing"
        );
    }
}


function nextSong() {

    if (
        !birthdayMedia.music ||
        birthdayMedia.music.length === 0
    ) return;


    currentSong++;

    if (
        currentSong >=
        birthdayMedia.music.length
    ) {

        currentSong = 0;
    }


    playCurrentSong();
}


function previousSong() {

    if (
        !birthdayMedia.music ||
        birthdayMedia.music.length === 0
    ) return;


    currentSong--;

    if (currentSong < 0) {

        currentSong =
            birthdayMedia.music.length - 1;
    }


    playCurrentSong();
}


function playCurrentSong() {

    const audio =
        document.getElementById(
            "birthdayAudio"
        );

    const title =
        document.getElementById(
            "songTitle"
        );


    const song =
        birthdayMedia.music[currentSong];


    audio.src =
        song.src;


    if (title) {

        title.textContent =
            song.name;
    }


    audio.play()
        .then(function () {

            isPlaying = true;

            updateMusicUI();

        })
        .catch(function () {});
}


/* =========================================
   VOICE
========================================= */

function displayVoice() {

    if (!birthdayMedia.voice) return;

    const section =
        document.querySelector(
            ".music-player"
        );

    if (!section) return;

    const existing =
        document.getElementById(
            "voiceWishPlayer"
        );

    if (existing) return;


    const audio =
        document.createElement("audio");

    audio.id =
        "voiceWishPlayer";

    audio.src =
        birthdayMedia.voice.src;

    audio.controls = true;

    audio.style.width =
        "100%";


    section.parentNode.appendChild(
        audio
    );
}


/* =========================================
   CANDLES
========================================= */

function blowCandles() {

    const candles =
        document.querySelectorAll(
            ".candle"
        );


    candles.forEach(
        function (candle) {

            candle.classList.add(
                "blown"
            );

        }
    );


    const wish =
        document.getElementById(
            "wishResult"
        );


    if (wish) {

        wish.textContent =
            "✨ Wish made! May it come true! 💖";

    }


    createConfetti();
}


/* =========================================
   FIREWORKS
========================================= */

function startFireworks() {

    const canvas =
        document.getElementById(
            "fireworksCanvas"
        );

    if (!canvas) return;


    const ctx =
        canvas.getContext("2d");


    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    const particles = [];


    for (
        let i = 0;
        i < 160;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;

        const speed =
            Math.random() * 7 + 2;


        particles.push({

            x:
                canvas.width / 2,

            y:
                canvas.height / 2,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life:
                80 +
                Math.random() * 40
        });
    }


    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        particles.forEach(
            function (particle) {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;

                particle.vy +=
                    0.04;

                particle.life--;


                ctx.globalAlpha =
                    particle.life / 120;

                ctx.fillStyle =
                    "white";

                ctx.fillRect(
                    particle.x,
                    particle.y,
                    4,
                    4
                );

            }
        );


        if (
            particles.some(
                p => p.life > 0
            )
        ) {

            requestAnimationFrame(
                animate
            );

        } else {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );
        }
    }


    animate();

    createConfetti();
}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );

        piece.className =
            "confetti";


        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top =
            "-20px";


        piece.style.transform =
            "rotate(" +
            Math.random() * 360 +
            "deg)";


        piece.style.animationDelay =
            Math.random() * 1.5 +
            "s";


        document.body.appendChild(
            piece
        );


        setTimeout(
            function () {

                piece.remove();

            },
            4500
        );
    }
}


/* =========================================
   BALLOON
========================================= */

function createBalloon() {

    const balloon =
        document.createElement(
            "div"
        );

    balloon.className =
        "interactive-balloon";


    balloon.style.left =
        Math.random() * 90 +
        "vw";


    balloon.style.background =
        "hsl(" +
        Math.random() * 360 +
        ", 80%, 60%)";


    balloon.addEventListener(
        "click",
        function () {

            balloon.classList.add(
                "popped"
            );

            createConfetti();

            setTimeout(
                function () {

                    balloon.remove();

                },
                300
            );

        }
    );


    document.body.appendChild(
        balloon
    );


    setTimeout(
        function () {

            balloon.remove();

        },
        6500
    );
}


/* =========================================
   MEMORY BOOK
========================================= */

function openMemoryBook() {

    const book =
        document.querySelector(
            ".memory-book"
        );

    if (book) {

        book.classList.add(
            "open"
        );
    }
}


function closeMemoryBook() {

    const book =
        document.querySelector(
            ".memory-book"
        );

    if (book) {

        book.classList.remove(
            "open"
        );
    }
}


/* =========================================
   LETTER
========================================= */

function openLetter() {

    const letter =
        document.querySelector(
            ".birthday-letter"
        );

    if (letter) {

        letter.classList.add(
            "opened"
        );
    }
}


/* =========================================
   GIFT
========================================= */

function openGift() {

    const box =
        document.getElementById(
            "giftBox"
        );

    const message =
        document.getElementById(
            "giftMessage"
        );


    if (box) {

        box.classList.toggle(
            "open"
        );
    }


    if (message) {

        message.classList.add(
            "show"
        );
    }


    createConfetti();
}


/* =========================================
   LIGHTBOX
========================================= */

function openLightbox(index) {

    if (!galleryImages.length)
        return;


    galleryIndex =
        index;


    const lightbox =
        document.getElementById(
            "imageLightbox"
        );

    const image =
        document.getElementById(
            "lightboxImage"
        );


    image.src =
        galleryImages[galleryIndex];


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


function nextImage() {

    if (!galleryImages.length)
        return;


    galleryIndex =
        (galleryIndex + 1) %
        galleryImages.length;


    document.getElementById(
        "lightboxImage"
    ).src =
        galleryImages[galleryIndex];
}


function previousImage() {

    if (!galleryImages.length)
        return;


    galleryIndex--;

    if (galleryIndex < 0) {

        galleryIndex =
            galleryImages.length - 1;
    }


    document.getElementById(
        "lightboxImage"
    ).src =
        galleryImages[galleryIndex];
}


/* =========================================
   SHARE
========================================= */

function copyLink() {

    navigator.clipboard.writeText(
        window.location.href
    )
    .then(function () {

        setShareStatus(
            "✅ Link copied!"
        );

    })
    .catch(function () {

        setShareStatus(
            "Copy the link from your browser."
        );
    });
}


function showQR() {

    const container =
        document.getElementById(
            "qrContainer"
        );

    const image =
        document.getElementById(
            "qrImage"
        );


    const url =
        encodeURIComponent(
            window.location.href
        );


    image.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
        url;


    container.classList.add(
        "show"
    );
}


function nativeShare() {

    if (
        navigator.share
    ) {

        navigator.share({

            title:
                "BirthdayVerse 🎂",

            text:
                "A special birthday celebration!",

            url:
                window.location.href

        });

    } else {

        copyLink();
    }
}


function setShareStatus(message) {

    const status =
        document.getElementById(
            "shareStatus"
        );

    if (!status) return;

    status.textContent =
        message;


    setTimeout(
        function () {

            status.textContent = "";

        },
        3000
    );
}


/* =========================================
   BACK
========================================= */

function goBack() {

    window.location.href =
        "customize.html";
}


/* =========================================
   REVEAL ANIMATION
========================================= */

function setupReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
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
            observer.observe(element)
    );
}


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadBirthdayData();

        loadTheme();

        displayBirthdayData();

        displayPhotos();

        displayVideos();

        displayMusic();

        displayVoice();

        setupThemes();

        setupReveal();

        startCountdown();


        /* Create occasional balloons */

        setInterval(
            createBalloon,
            8000
        );

    }
);
