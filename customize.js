const defaultData = {
    name: "Birthday Star",
    nickname: "Special One",
    age: "",
    sender: "Someone Special",
    date: "",
    message:
        "May your birthday be filled with happiness, love, laughter and unforgettable memories."
};

let birthdayData = {
    ...defaultData,
    ...(JSON.parse(localStorage.getItem("birthdayData")) || {})
};

let birthdayMedia = {
    photos: [],
    videos: [],
    music: [],
    voice: null,
    ...(JSON.parse(localStorage.getItem("birthdayMedia")) || {})
};


/* =========================
   ELEMENTS
========================= */

const nameInput = document.getElementById("name");
const nicknameInput = document.getElementById("nickname");
const ageInput = document.getElementById("age");
const senderInput = document.getElementById("sender");
const dateInput = document.getElementById("birthdayDate");
const messageInput = document.getElementById("message");

const previewName = document.getElementById("previewName");
const previewMessage = document.getElementById("previewMessage");
const previewSender = document.getElementById("previewSender");

const messageCounter = document.getElementById("messageCounter");
const saveStatus = document.getElementById("saveStatus");

const photoInput = document.getElementById("photoInput");
const videoInput = document.getElementById("videoInput");
const musicInput = document.getElementById("musicInput");
const voiceInput = document.getElementById("voiceInput");

const photoPreview = document.getElementById("photoPreview");
const videoPreview = document.getElementById("videoPreview");
const musicPreview = document.getElementById("musicPreview");
const voicePreview = document.getElementById("voicePreview");

const saveButton = document.getElementById("saveButton");
const celebrateButton = document.getElementById("celebrateButton");


/* =========================
   LOAD SAVED DATA
========================= */

function loadData() {

    nameInput.value = birthdayData.name || "";
    nicknameInput.value = birthdayData.nickname || "";
    ageInput.value = birthdayData.age || "";
    senderInput.value = birthdayData.sender || "";
    dateInput.value = birthdayData.date || "";
    messageInput.value = birthdayData.message || "";

    updatePreview();
}


/* =========================
   LIVE PREVIEW
========================= */

function updatePreview() {

    const name =
        nameInput.value.trim() ||
        "Birthday Star";

    const message =
        messageInput.value.trim() ||
        "Your birthday message will appear here...";

    const sender =
        senderInput.value.trim() ||
        "Someone Special";

    previewName.textContent = name;
    previewMessage.textContent = message;
    previewSender.textContent = "— " + sender;

    messageCounter.textContent =
        messageInput.value.length;
}


/* =========================
   INPUT LISTENERS
========================= */

[
    nameInput,
    nicknameInput,
    ageInput,
    senderInput,
    dateInput,
    messageInput
].forEach(input => {

    input.addEventListener(
        "input",
        updatePreview
    );

});


/* =========================
   THEME SELECTION
========================= */

const themeButtons =
    document.querySelectorAll(".theme-option");

themeButtons.forEach(button => {

    button.addEventListener("click", () => {

        themeButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const theme =
            button.dataset.theme;

        document.body.className =
            "theme-" + theme + " customize-page";

        localStorage.setItem(
            "birthdayTheme",
            theme
        );
    });

});


/* Load saved theme */

function loadTheme() {

    const savedTheme =
        localStorage.getItem("birthdayTheme") ||
        "love";

    document.body.className =
        "theme-" + savedTheme + " customize-page";

    themeButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.theme === savedTheme
        );

    });
}


/* =========================
   FILE → DATA URL
========================= */

function fileToDataURL(file) {

    return new Promise((resolve, reject) => {

        const reader =
            new FileReader();

        reader.onload = () =>
            resolve(reader.result);

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}


/* =========================
   PHOTO UPLOAD
========================= */

photoInput.addEventListener(
    "change",
    async () => {

        birthdayMedia.photos = [];

        for (const file of photoInput.files) {

            try {

                const dataURL =
                    await fileToDataURL(file);

                birthdayMedia.photos.push({
                    name: file.name,
                    src: dataURL
                });

            } catch (error) {

                console.error(
                    "Photo error:",
                    error
                );
            }
        }

        displayPhotos();
    }
);


function displayPhotos() {

    photoPreview.innerHTML = "";

    if (!birthdayMedia.photos.length) {

        photoPreview.innerHTML =
            "<p>No photos selected.</p>";

        return;
    }

    birthdayMedia.photos.forEach(
        (photo, index) => {

            const card =
                document.createElement("div");

            card.className =
                "upload-preview-item";

            card.innerHTML = `
                <img src="${photo.src}" alt="Photo ${index + 1}">
                <span>${photo.name}</span>
            `;

            photoPreview.appendChild(card);
        }
    );
}


/* =========================
   VIDEO UPLOAD
========================= */

videoInput.addEventListener(
    "change",
    async () => {

        birthdayMedia.videos = [];

        for (const file of videoInput.files) {

            try {

                const dataURL =
                    await fileToDataURL(file);

                birthdayMedia.videos.push({
                    name: file.name,
                    src: dataURL
                });

            } catch (error) {

                console.error(
                    "Video error:",
                    error
                );
            }
        }

        displayVideos();
    }
);


function displayVideos() {

    videoPreview.innerHTML = "";

    if (!birthdayMedia.videos.length) {

        videoPreview.innerHTML =
            "<p>No video selected.</p>";

        return;
    }

    birthdayMedia.videos.forEach(
        video => {

            const card =
                document.createElement("div");

            card.className =
                "upload-preview-item";

            card.innerHTML = `
                <video
                    src="${video.src}"
                    controls>
                </video>

                <span>
                    ${video.name}
                </span>
            `;

            videoPreview.appendChild(card);
        }
    );
}


/* =========================
   MUSIC UPLOAD
========================= */

musicInput.addEventListener(
    "change",
    async () => {

        birthdayMedia.music = [];

        for (const file of musicInput.files) {

            try {

                const dataURL =
                    await fileToDataURL(file);

                birthdayMedia.music.push({
                    name: file.name,
                    src: dataURL
                });

            } catch (error) {

                console.error(
                    "Music error:",
                    error
                );
            }
        }

        displayMusic();
    }
);


function displayMusic() {

    musicPreview.innerHTML = "";

    if (!birthdayMedia.music.length) {

        musicPreview.innerHTML =
            "<p>No songs selected.</p>";

        return;
    }

    birthdayMedia.music.forEach(
        song => {

            const card =
                document.createElement("div");

            card.className =
                "upload-preview-item";

            card.innerHTML = `
                <span>🎵 ${song.name}</span>

                <audio
                    src="${song.src}"
                    controls>
                </audio>
            `;

            musicPreview.appendChild(card);
        }
    );
}


/* =========================
   VOICE MESSAGE
========================= */

voiceInput.addEventListener(
    "change",
    async () => {

        const file =
            voiceInput.files[0];

        if (!file) return;

        try {

            const dataURL =
                await fileToDataURL(file);

            birthdayMedia.voice = {
                name: file.name,
                src: dataURL
            };

            displayVoice();

        } catch (error) {

            console.error(
                "Voice error:",
                error
            );
        }
    }
);


function displayVoice() {

    voicePreview.innerHTML = "";

    if (!birthdayMedia.voice) {

        voicePreview.innerHTML =
            "<p>No voice message selected.</p>";

        return;
    }

    voicePreview.innerHTML = `
        <div class="upload-preview-item">

            <span>
                🎙️ ${birthdayMedia.voice.name}
            </span>

            <audio
                src="${birthdayMedia.voice.src}"
                controls>
            </audio>

        </div>
    `;
}


/* =========================
   SAVE DATA
========================= */

async function saveBirthday() {

    birthdayData = {

        name: nameInput.value.trim(),

        nickname:
            nicknameInput.value.trim(),

        age:
            ageInput.value,

        sender:
            senderInput.value.trim(),

        date:
            dateInput.value,

        message:
            messageInput.value.trim()
    };


    localStorage.setItem(
        "birthdayData",
        JSON.stringify(birthdayData)
    );


    localStorage.setItem(
        "birthdayMedia",
        JSON.stringify(birthdayMedia)
    );


    localStorage.setItem(
        "birthdayTheme",
        getCurrentTheme()
    );


    saveStatus.textContent =
        "✅ BirthdayVerse saved successfully!";

    saveStatus.classList.add(
        "success"
    );


    setTimeout(() => {

        saveStatus.textContent = "";

    }, 3000);
}


/* =========================
   CURRENT THEME
========================= */

function getCurrentTheme() {

    const activeButton =
        document.querySelector(
            ".theme-option.active"
        );

    return activeButton
        ? activeButton.dataset.theme
        : "love";
}


/* =========================
   SAVE BUTTON
========================= */

saveButton.addEventListener(
    "click",
    saveBirthday
);


/* =========================
   SAVE & CELEBRATE
========================= */

celebrateButton.addEventListener(
    "click",
    async () => {

        await saveBirthday();

        setTimeout(() => {

            window.location.href =
                "index.html";

        }, 700);
    }
);


/* =========================
   PREVIEW BUTTON
========================= */

function goToCelebration() {

    saveBirthday();

    setTimeout(() => {

        window.location.href =
            "index.html";

    }, 300);
}


/* =========================
   LOAD PREVIOUS MEDIA
========================= */

function loadPreviousMedia() {

    displayPhotos();
    displayVideos();
    displayMusic();
    displayVoice();
}


/* =========================
   CREATE STARS
========================= */

function createStars() {

    const stars =
        document.getElementById("stars");

    if (!stars) return;

    stars.innerHTML = "";

    for (let i = 0; i < 100; i++) {

        const star =
            document.createElement("span");

        star.style.position =
            "absolute";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.width =
            Math.random() * 3 + 1 + "px";

        star.style.height =
            star.style.width;

        star.style.borderRadius =
            "50%";

        star.style.background =
            "white";

        star.style.opacity =
            Math.random();

        stars.appendChild(star);
    }
}


/* =========================
   INITIALIZE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadData();

        loadTheme();

        loadPreviousMedia();

        createStars();

    }
);
