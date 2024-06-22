let voices = [], voiceMap = [0, 1, 2];
let pluck = new Audio();
pluck.src = "./media/pluck.m4a";

function tts() {
    voices = speechSynthesis.getVoices();
    if (voices.length == 0) setTimeout(tts, 100);
    else {
        let names = tts.names;
        for (let i=0;i<names.length;i++) {
            for (let v=0;v<voices.length;v++) {
                if (voices[v].name.search(names[i]) > -1) voiceMap.splice(0, 0, v);
            }
        }
    }
}

function say(text, v, opt) {
    let u = new SpeechSynthesisUtterance(text);
    Object.assign(u, {voice:voices[voiceMap[v ? v : 0]], rate:1, lang:"en-CA"});
    if (opt) Object.assign(u, opt);
    u.onend = () => {
        console.log(u);
    }
    speechSynthesis.speak(u);
}

tts.names = ["Mark", "Hazel", "David", "Richard", "Linda", "UK English Female", "UK English Male", "US English"];

tts();
