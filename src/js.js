const StartBtn = document.querySelector(".queuejoinerUI_startBtn");
const ResetBtn = document.querySelector(".queuejoinerUI_resetBtn");
const KeepTryingBtn = document.querySelector(".queuejoinerUI_keepTryingBtn_true");
const TimerElement = document.querySelector(".queuejoinerUI_timer");
const TextElement = document.querySelector(".queuejoinerUI_text");

let isWaitingForQueue = false;
let timer = null;

function startTimer() {
    isWaitingForQueue = true;
    const startTime = Date.now();

    const p = document.createElement("p");
    const t = new Date();
    p.textContent = 'Started at: [' +
        String(t.getHours()).padStart(2,'0') + ':' +
        String(t.getMinutes()).padStart(2,'0') + ':' +
        String(t.getSeconds()).padStart(2,'0') +
    ']';
    TextElement.appendChild(p);

    timer = setInterval(() => {
        const diff = Math.floor((Date.now() - startTime) / 1000);

        const h = String(Math.floor(diff / 3600)).padStart(2, "0");
        const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
        const s = String(diff % 60).padStart(2, "0");

        TimerElement.textContent = h + ':' + m + ':' + s;
    }, 1000);
}

function WaitForElement(selector, callback) {
    const interval = setInterval(() => {
        const Element = document.querySelectorAll(selector)[0];
        if (Element) {
            clearInterval(interval);
            callback(Element);
        }
    }, 10);
}

function resetTimer() {
    isWaitingForQueue = false;
    clearInterval(timer);
    TimerElement.textContent = "00:00:00";
}
let keeptrying = false;
StartBtn.onclick = () => {
    if (!isWaitingForQueue) {
        startTimer();
        WaitForElement("._201d5e8a3c09670a-button._201d5e8a3c09670a-lookFilled._201d5e8a3c09670a-colorBrand._201d5e8a3c09670a-sizeSmall._201d5e8a3c09670a-grow", (el) => {
            if (el.textContent === "Join Queue") {
                const p = document.createElement("p");
                const t = new Date();
                p.textContent = 'Joined the queue at: [' +
                    String(t.getHours()).padStart(2,'0') + ':' +
                    String(t.getMinutes()).padStart(2,'0') + ':' +
                    String(t.getSeconds()).padStart(2,'0') +
                ']';
                TextElement.appendChild(p);
                if (keeptrying) {
                    trying = setInterval(() => {
                        
                        if (!keeptrying) {
                            clearInterval(trying);
                        };
                        el.click();

                    }, 200);
                }
                el.click();
                resetTimer();
            }
        });
    }
};

ResetBtn.onclick = () => {
    if (isWaitingForQueue) {
        const p = document.createElement("p");
        const t = new Date();
        p.textContent = 'Reset at: [' +
            String(t.getHours()).padStart(2,'0') + ':' +
            String(t.getMinutes()).padStart(2,'0') + ':' +
            String(t.getSeconds()).padStart(2,'0') +
        ']';
        TextElement.appendChild(p);

        resetTimer();
    }
};
KeepTryingBtn.onclick = () => {
    if (!keeptrying) {
        KeepTryingBtn.classList = "queuejoinerUI_keepTryingBtn_false";
        keeptrying = true;
    }
    else {
        KeepTryingBtn.classList = "queuejoinerUI_keepTryingBtn_true";
        keeptrying = false;
    }
}
neededbtn.onclick = () => {
    console.log("presed.");
}