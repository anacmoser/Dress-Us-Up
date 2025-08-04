const bgm = document.getElementById("bgm");
const changeSound = document.getElementById("changeSound");
const winSound = document.getElementById("winSound");

let musicOn = true;
let sfxOn = true;
let lastSelections = {};

const options = {
    char1: {
        eyes: [
            { thumb: "img/c1_eyes1.png", img: "img/c1_eyes1.png" },
            { thumb: "img/c1_eyes2.png", img: "img/c1_eyes2.png" },
            { thumb: "img/c1_eyes3.png", img: "img/c1_eyes3.png" },
            { thumb: "img/c1_eyes4.png", img: "img/c1_eyes4.png" },
            { thumb: "img/c1_eyes5.png", img: "img/c1_eyes5.png" },
            { thumb: "img/c1_eyes6.png", img: "img/c1_eyes6.png" },
        ],
        hair: [
            { thumb: "img/thumb_c1_hair1.png", img: "img/c1_hair12.png" },
            { thumb: "img/c1_hair22.png", img: "img/c1_hair22.png" },
            { thumb: "img/thumb_c1_hair32.png", img: "img/c1_hair3.png" },
            { thumb: "img/thumb_c1_hair4.png", img: "img/c1_hair4.png" },
            { thumb: "img/thumb_c1_hair5.png", img: "img/c1_hair5.png" },
            { thumb: "img/thumb_c1_hair6.png", img: "img/c1_hair6.png" },
        ],
        outfit: [
            { thumb: "img/thumb_c1_outfit1.png", img: "img/c1_outfit12.png" },
            { thumb: "img/thumb_c1_wedding.png", img: "img/c1_wedding2.png" },
            { thumb: "img/thumb_c1_outfit3.png", img: "img/c1_outfit3.png" },
            { thumb: "img/thumb_c1_outfit4.png", img: "img/c1_outfit4.png" },
            { thumb: "img/thumb_c1_outfit5.png", img: "img/c1_outfit5.png" },
            { thumb: "img/thumb_c1_outfit6.png", img: "img/c1_outfit6.png" },
        ]
    },
    char2: {
        eyes: [
            { thumb: "img/c2_eyes1.png", img: "img/c2_eyes1.png" },
            { thumb: "img/c2_eyes2.png", img: "img/c2_eyes2.png" },
            { thumb: "img/c2_eyes3.png", img: "img/c2_eyes3.png" },
            { thumb: "img/c2_eyes4.png", img: "img/c2_eyes4.png" },
            { thumb: "img/c2_eyes5.png", img: "img/c2_eyes5.png" },
            { thumb: "img/c2_eyes6.png", img: "img/c2_eyes6.png" },
        ],
        hair: [
            { thumb: "img/thumb_c2_hair1.png", img: "img/c2_hair12.png" },
            { thumb: "img/thumb_c2_hair2.png", img: "img/c2_hair22.png" },
            { thumb: "img/thumb_c2_hair3.png", img: "img/c2_hair32.png" },
            { thumb: "img/thumb_c2_hair4.png", img: "img/c2_hair4.png" },
            { thumb: "img/thumb_c2_hair5.png", img: "img/thumb_c2_hair5.png" },
            { thumb: "img/thumb_c2_hair6.png", img: "img/c2_hair6.png" },
        ],
        outfit: [
            { thumb: "img/thumb_c2_outfit1.png", img: "img/c2_outfit1.png" },
            { thumb: "img/thumb_c2_wedding.png", img: "img/c2_wedding2.png" },
            { thumb: "img/thumb_c2_outfit3.png", img: "img/c2_outfit32.png" },
            { thumb: "img/thumb_c2_outfit4.png", img: "img/c2_outfit4.png" },
            { thumb: "img/thumb_c2_outfit5.png", img: "img/c2_outfit5.png" },
            { thumb: "img/thumb_c2_outfit6.png", img: "img/c2_outfit6.png" },
        ]
    }
};

const selections = {
    char1: { outfit: "" },
    char2: { outfit: "" }
};

function toggleMusic() {
    musicOn = !musicOn;
    const musicIcon = document.getElementById("musicIcon");

    if (musicOn) {
        bgm.play();
        musicIcon.src = "img/music_on.png";
        musicIcon.classList.remove("disabled");
    } else {
        bgm.pause();
        musicIcon.src = "img/music_off.png";
        musicIcon.classList.add("disabled");
    }
}

function toggleSfx() {
    sfxOn = !sfxOn;
    const sfxIcon = document.getElementById("sfxIcon");

    if (sfxOn) {
        sfxIcon.src = "img/sound_on.png";
        sfxIcon.classList.remove("disabled");
    } else {
        sfxIcon.src = "img/sound_off.png";
        sfxIcon.classList.add("disabled");
    }
}

function createOptions(containerId, charKey, part, imgId) {
    const container = document.getElementById(containerId);
    options[charKey][part].forEach(opt => {
        const img = document.createElement("img");
        img.src = opt.thumb;
        img.alt = "";
        img.onclick = () => {
            document.getElementById(imgId).src = opt.img;

            if (sfxOn) {
                changeSound.pause();
                changeSound.currentTime = 0;
                changeSound.play();
            }

            Array.from(container.children).forEach(c => c.classList.remove("selected"));
            img.classList.add("selected");

            if (part === "outfit") {
                selections[charKey].outfit = opt.img;
                checkVictory();
            }
        }
        container.appendChild(img);
    });
}
function captureScreenshot() {
    const finalView = document.getElementById("finalView");

    html2canvas(finalView).then(canvas => {
        const link = document.createElement('a');
        link.download = 'edu&ana.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

function switchTab(charNum, part, event) {
    const tabs = ["eyes", "hair", "outfit"];
    tabs.forEach(t => {
        document.getElementById(t + "Options" + charNum).classList.remove("active");
    });
    document.getElementById(part + "Options" + charNum).classList.add("active");
    event.currentTarget.parentElement.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
    event.currentTarget.classList.add("active");
}

function checkVictory() {
    if (
        selections.char1.outfit.includes("wedding") &&
        selections.char2.outfit.includes("wedding")
    ) {
        lastSelections = JSON.parse(JSON.stringify(selections));
        setTimeout(() => {
            if (sfxOn) {
                winSound.play();
            }
            document.getElementById("winMessage").style.display = "flex";

            setTimeout(() => {
                document.getElementById("winMessage").style.display = "none";
            }, 3000);
        }, 0500);
    }
}


function resetGame(full = false) {
    ["char1Eyes", "char1Hair", "char1Outfit", "char2Eyes", "char2Hair", "char2Outfit"].forEach(id => {
        document.getElementById(id).src = "img/png.png";
    });
    document.querySelectorAll(".option-group img").forEach(img => img.classList.remove("selected"));
    selections.char1.outfit = "";
    selections.char2.outfit = "";
    if (full) location.reload();
}

function resumeGame() {
    document.getElementById("winMessage").style.display = "none";
    setSelections(lastSelections);
}

function setSelections(saved) {
    Object.keys(saved).forEach(charKey => {
        const outfitId = charKey === "char1" ? "char1Outfit" : "char2Outfit";
        document.getElementById(outfitId).src = saved[charKey].outfit;

        document.querySelectorAll(`#outfitOptions${charKey === "char1" ? "1" : "2"} img`).forEach(img => {
            img.classList.toggle("selected", img.src.includes(saved[charKey].outfit));
        });

        selections[charKey].outfit = saved[charKey].outfit;
    });
}

function startGame() {
    document.getElementById('introScreen').style.display = 'none';
    if (musicOn) bgm.play();
    createOptions("eyesOptions1", "char1", "eyes", "char1Eyes");
    createOptions("hairOptions1", "char1", "hair", "char1Hair");
    createOptions("outfitOptions1", "char1", "outfit", "char1Outfit");

    createOptions("eyesOptions2", "char2", "eyes", "char2Eyes");
    createOptions("hairOptions2", "char2", "hair", "char2Hair");
    createOptions("outfitOptions2", "char2", "outfit", "char2Outfit");

}

function showFinalView() {
    document.getElementById("finalChar1Eyes").src = document.getElementById("char1Eyes").src;
    document.getElementById("finalChar1Hair").src = document.getElementById("char1Hair").src;
    document.getElementById("finalChar1Outfit").src = document.getElementById("char1Outfit").src;

    document.getElementById("finalChar2Eyes").src = document.getElementById("char2Eyes").src;
    document.getElementById("finalChar2Hair").src = document.getElementById("char2Hair").src;
    document.getElementById("finalChar2Outfit").src = document.getElementById("char2Outfit").src;

    document.getElementById("finalView").style.display = "flex";
}

function closeFinalView() {
    document.getElementById("finalView").style.display = "none";
}
