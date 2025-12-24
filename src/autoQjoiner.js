const queuejoinerUI = document.createElement("div");
const queuejoinerUI_style = document.createElement("style");

queuejoinerUI.classList = "queuejoinerUI";

queuejoinerUI.innerHTML = `
    <div class="queuejoinerUI_timer">00:00:00</div>
    <div class="queuejoinerUI_line1"></div>
    <div class="queuejoinerUI_line2"></div>
    <div class="queuejoinerUI_text"></div>
    <button class="queuejoinerUI_startBtn">Start</button>
    <button class="queuejoinerUI_resetBtn">Reset</button>
    <button class="queuejoinerUI_keepTryingBtn_true">Keep trying</button>
`;

queuejoinerUI_style.textContent = `
.queuejoinerUI {
    background-color: #151519;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
    
    height: 31.5vh;
    width: 20vw;

    min-width: 300px;
    position: absolute;
    right: 2vw;
    top: 2vw; 
    border-radius: 24px;
    padding: 1.5vh 1vw; 
    box-sizing: border-box;
    overflow: hidden;
    transition: all 0.27s ease;
}

.queuejoinerUI:hover {
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 1);
}

.queuejoinerUI {
    z-index: 99999;
}

.queuejoinerUI_timer {
    font-family: 'Courier New', Courier, monospace;
    font-weight: 800;
    font-size: 18px;
    color: #FFFFFF;
    position: fixed;
    top: 5px;
    left: 0;
    width: 100%;
    text-align: center;
}

.queuejoinerUI_line1 {
    bottom: 8.7vh;           
    left: 0px;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
    position: fixed;
}

.queuejoinerUI_line2 {
    top: 4vh;           
    left: 0px;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
    position: fixed;
}

.queuejoinerUI_text {
    height: 12vh;             
    overflow-y: auto;        
    overflow-x: hidden;
    margin-top: 2.5vh;   
    color: #FFFFFF;
    font-family: 'Courier New', Courier, monospace;
    font-size: 13px;
}

.queuejoinerUI_startBtn,
.queuejoinerUI_keepTryingBtn_true,
.queuejoinerUI_keepTryingBtn_false,
.queuejoinerUI_resetBtn {
    flex-shrink: 0;
    width: clamp(120px, 9vw, 180px);
    height: clamp(44px, 7.5vh, 60px);
    border: none;
    border-radius: 20px;
    font-weight: 800;
    font-size: 125%;
    color: #FFFFFF;
    text-align: center;
    cursor: pointer;
    transition: all 0.27s;
}

.queuejoinerUI_startBtn {
    background: linear-gradient(to bottom right, #5865f2, #8276C2);
    position: absolute;
    left: 0.75vw;
    bottom: 8vh;
    
}

.queuejoinerUI_resetBtn {
    background: linear-gradient(to bottom right, #E71D36, #CE3459);
    position: absolute;
    right: 0.75vw;
    bottom: 8vh;
    
}

.queuejoinerUI_keepTryingBtn_false {
    background: linear-gradient(to bottom right, #80ED99, #38A3A5);
    position: absolute;
    right: 2.5%;
    bottom: 0.75vh;
    width: 95%;
}

.queuejoinerUI_keepTryingBtn_true {
    background: linear-gradient(to bottom right, #ECAF67, #DF8214);
    position: absolute;
    right: 2.5%;
    bottom: 0.75vh;
    width: 95%;
}

.queuejoinerUI_resetBtn:hover {
    filter: brightness(0.9);
    transform: scale(1.015);
}

.queuejoinerUI_resetBtn:active {
    filter: brightness(1.025);
    transform: scale(1.025);
}

.queuejoinerUI_startBtn:hover {
    filter: brightness(0.87);
    transform: scale(1.015);
}

.queuejoinerUI_startBtn:active {
    filter: brightness(1.025);
    transform: scale(1.025);
}

.queuejoinerUI_keepTryingBtn_false:hover {
    filter: brightness(0.87);
    transform: scale(1.015);
}

.queuejoinerUI_keepTryingBtn_false:active {
    filter: brightness(1.025);
    transform: scale(1.025);
}

.queuejoinerUI_keepTryingBtn_true:hover {
    filter: brightness(0.87);
    transform: scale(1.015);
}

.queuejoinerUI_keepTryingBtn_true:active {
    filter: brightness(1.025);
    transform: scale(1.025);
}
`;

document.head.appendChild(queuejoinerUI_style);
document.body.appendChild(queuejoinerUI);

(() => {
    const StartBtn = document.querySelector(".queuejoinerUI_startBtn");
    const ResetBtn = document.querySelector(".queuejoinerUI_resetBtn");
    const KeepTryingBtn = document.querySelector(".queuejoinerUI_keepTryingBtn_true");
    const TimerElement = document.querySelector(".queuejoinerUI_timer");
    const TextElement = document.querySelector(".queuejoinerUI_text");

    let keeptrying = false;
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

    function updateKeeptrying() {
        if (!keeptrying) {
        KeepTryingBtn.classList = "queuejoinerUI_keepTryingBtn_false";
        keeptrying = true;
    }
        else {
            KeepTryingBtn.classList = "queuejoinerUI_keepTryingBtn_true";
            keeptrying = false;
        }
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
        updateKeeptrying();
    }

})();