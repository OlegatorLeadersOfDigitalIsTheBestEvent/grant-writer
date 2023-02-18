var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = 'ru-RU';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function show_assistant(){
    document.getElementsByTagName('article')[0].childNodes[1].style = 'display: none;';
    document.getElementsByTagName('article')[0].innerHTML = document.getElementsByTagName('article')[0].innerHTML + '<div class="app-article__content app-article_content_3MJ8N app-article_paddedContent_2xRP2" style=" min-height: 800px; "><div class="project-edit-aside_wrapper_3nc9n"><h3 class="project-edit-aside_title_1WGHZ">ЦИФРОВОЙ ПОМОЩНИК - КСЮША</h3><div class="project-edit-aside_text_3CJjF"><p>Цифровой ассистент поможет тебе легко найти, все что связано с твоей грантовой заявкой! Тебе достаточно лишь надиктовать (или напечатать) твой вопрос. Она подберет нужные курсы, уроки, статьи!</p><p>Если тебе нужна помощь с заполнением какого-то грантового поля, ты тоже можешь попросить ее помочь. Просто скажи «Ксюша, помоги заполнить поле цель проекта. Цель моего проекта обучить людей киберграмотности» и так можно делать с любым полем!</p></div></div><form class="project-edit-form_form_1RCXW"><!----><section class="base-row"><h3 class="project-edit-form_title_3J8qN">Твой вопрос</h3><div class="base-textarea base-field base-field--animated base-field--grid base-field--grid-12" bound="region" parts="" rules="[object Object]" required="required"><div class="base-field__entry"><textarea id="question-field" name="acd9cfd6-7c02-4fb3-9f0c-b5f5e91414ad" rows="2" tabindex="0" class="base-textarea__autosize" required="required" style="resize: none; height: 90px; overflow: hidden;"></textarea><!----><!----></div><label for="acd9cfd6-7c02-4fb3-9f0c-b5f5e91414ad-102" id="question-label" title="С чем тебе необходима помощь?" class="base-field__label base-field__label--empty"><span>С чем тебе необходима помощь?</span><div icon="asterisk" path="/icons/asterisk.svg" class="base-icon base-field__marker"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false"><path d="M11 6h2v4.079l3.341-2.34 1.147 1.639L13.743 12l3.745 2.622-1.147 1.639L13 13.92V18h-2v-4.079l-3.341 2.34-1.148-1.639L10.257 12 6.51 9.378l1.15-1.639L11 10.08V6z" fill="currentColor"></path></svg></div></label><!----><button id="btn-filling" style="margin-top: 20px; display:none;" type="button" aria-label="" tabindex="0" custom="" class="base-button base-button--alternate"><span class="base-button__label base-button__label-icon-prefix base-button__label-text"><span class="base-button__text"> Перенести в заявку <!----></span><!----></span></button></div><div id="answer-card" style="display: none;"><h3 class="project-edit-form_title_3J8qN">Ответ на вопрос</h3><div class="project-edit-form_title_3J8qN" id="ai-answer"></div></div></section></form></div>';
    // Обработка события аналогового воода текста (с клавы)
    var keyboard = document.getElementById('question-field');
    keyboard.addEventListener('change', function() {
        rewrite_interface_update(document.getElementById('question-field').value);
    });
}
function hide_assistant(){
    document.getElementsByTagName('article')[0].childNodes[1].style = 'display: block;';
}

// Получение данных рерайтинга с бэкенда
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

// Метод обновления интерфейса при запуске рерайтинга
async function rewrite_interface_update(text){
    document.getElementById('btn-filling').style = 'margin-top: 20px; display: none;';
    // Двигаем лейбл первого поля
    var label = document.getElementById('question-label');
    label.classList.remove('base-field__label--empty');
    label.classList.add('base-field__label', 'base-field__label--focused');
    document.getElementById('question-field').value = text;
    const recommendation = await call_rewrite(text);
    document.getElementById('answer-card').style = 'display: block;';
    document.getElementById('ai-answer').innerText = recommendation.result;
    if(recommendation.field_id != false){
        document.getElementById('btn-filling').style = 'margin-top: 20px; display: block;';
        var btn = document.getElementById('btn-filling');
        btn.addEventListener('click', function() {
            hide_assistant();
            document.getElementById(recommendation.field_id).value = recommendation.result;
            let updated_label = document.querySelectorAll("[for='" + recommendation.field_id + "']")[0];
            updated_label.classList.remove('base-field__label--empty');
            updated_label.classList.add('base-field__label', 'base-field__label--focused');
        });
    }
}

function init(){
    
    document.getElementsByTagName('body')[0].innerHTML  = "<div id='av-img-f' style='position: absolute;width: 100%;height: 100%;'><div style='position: fixed; bottom: 50px; left: 91px; border-radius: 8px; width: 200px; height: 70px; z-index: 6; border: 2px solid #8b65d8; background: #0000000f;'><img id='img-shadow' style='position: fixed;bottom: 50px;left: 60px;border-radius: 50%;width: 70px;height: 70px;z-index: 1;' type='image/svg+xml' src='https://cyber-training.ru/public/img_hack.png'><div style=' height: calc(70px - 6px); display: flex; flex-direction: column; justify-content: center; padding-left: 52px; '><div style='font-weight: 700;'>Ксюша</div><div>Твой ассистент</div></div></div></div>" + document.getElementsByTagName('body')[0].innerHTML;
    // Обработка события «записи микрофона»
    var btn = document.getElementById('av-img-f');
    btn.addEventListener('click', function() {
        recognition.start();
    });
}

recognition.onresult = function(event) {
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
    // Текстовый запрос
    const text = (final_transcript == '' ? interim_transcript : final_transcript);
    rewrite_interface_update(text);
}
  
recognition.onspeechend = function() {
    recognition.stop();
}

recognition.onstart = function() {
    show_assistant();
    document.getElementById('img-shadow').style = 'box-shadow: 0px 1px 20px 1px #8b65d8; position: fixed;bottom: 50px;left: 60px;border-radius: 50%;width: 70px;height: 70px;z-index: 1;';
}

recognition.onend = function() {
    document.getElementById('img-shadow').style = 'position: fixed;bottom: 50px;left: 60px;border-radius: 50%;width: 70px;height: 70px;z-index: 1;';
}

recognition.onnomatch = function(event) {
    diagnostic.textContent = "Не опознанная ошибка.";
}
  
recognition.onerror = function(event) {
    diagnostic.textContent = 'Не опознанная ошибка: ' + event.error;
}
  
setTimeout(() => init(), 3000);