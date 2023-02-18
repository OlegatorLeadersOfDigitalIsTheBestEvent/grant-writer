var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = 'ru-RU';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

async function call_rewrite(text){
    let response = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        body: JSON.stringify({
            field: text,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        return await response.json();
    } else {
        console.log("Ошибка HTTP: " + response.status);
    }
}

function init(){
    document.getElementsByTagName('body')[0].innerHTML  = '<div id="av-img-f" style="position: absolute;width: 100%;height: 100%;"><img id="img-shadow" style="position: fixed;bottom: 50px;left: 60px;border-radius: 50%;width: 70px;height: 70px;z-index: 1;" type="image/svg+xml" src="https://cyber-training.ru/public/img_hack.png"></div>' + document.getElementsByTagName('body')[0].innerHTML;
    var btn = document.getElementById('av-img-f');
    btn.addEventListener('click', function() {
        recognition.start();
        if(document.getElementById('acd9cfd6-7c02-4fb3-9f0c-f5f5e91414ad') != null){ return; }
        var elem = document.getElementById('acd9cfd6-7c02-4fb3-9f0c-b5f5e91414ad');
        var clone = elem.cloneNode(true);
        clone.id = 'acd9cfd6-7c02-4fb3-9f0c-f5f5e91414ad';
        clone.childNodes[0].childNodes[0].disabled = true;
        clone.childNodes[0].style = "border-color: #0035ff; box-shadow: 0 8px 8px #ebeffa;"
        const rec = document.createElement("div");
        rec.classList.add('base-field__description');
        rec.textContent = 'Это Ксюша, я перефразировала это поле';
        clone.appendChild(rec);
        elem.after(clone);
    });
}

recognition.onresult = async function(event) {
    // Create the interim transcript string locally because we don't want it to persist like final transcript
    let interim_transcript = "";
    let final_transcript = "";

    // Loop through the results from the speech recognition object.
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    // Двигаем лейбл первого поля
    var elem = document.getElementById('acd9cfd6-7c02-4fb3-9f0c-b5f5e91414ad').childNodes[1];
    elem.classList.remove('base-field__label--empty');
    elem.classList.add('base-field__label', 'base-field__label--focused');
    const text = (final_transcript == '' ? interim_transcript : final_transcript);
    document.getElementById('acd9cfd6-7c02-4fb3-9f0c-b5f5e91414ad').childNodes[0].childNodes[0].value = text;
    const recommendation = await call_rewrite(text);
    // Двигаем лейбл второго поля
    var elem = document.getElementById('acd9cfd6-7c02-4fb3-9f0c-f5f5e91414ad').childNodes[1];
    elem.classList.remove('base-field__label--empty');
    elem.classList.add('base-field__label', 'base-field__label--focused');
    document.getElementById('acd9cfd6-7c02-4fb3-9f0c-f5f5e91414ad').childNodes[0].childNodes[0].value = recommendation.result;
}
  
recognition.onspeechend = function() {
    recognition.stop();
}

recognition.onstart = function() {
    document.getElementById('img-shadow').style = 'box-shadow: 0px 1px 20px 1px #8b65d8; position: fixed;bottom: 50px;left: 60px;border-radius: 50%;width: 70px;height: 70px;z-index: 1;';
}

recognition.onend = function() {
    document.getElementById('img-shadow').style = 'position: fixed;bottom: 50px;left: 60px;border-radius: 50%;width: 70px;height: 70px;z-index: 1;';
}

recognition.onnomatch = function(event) {
    diagnostic.textContent = "I didn't recognise that color.";
}
  
recognition.onerror = function(event) {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
  
setTimeout(() => init(), 5000);