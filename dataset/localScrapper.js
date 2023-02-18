localStorage.setItem(
    document.getElementsByClassName("winner-info__list-item-text")[3].innerText, 
    JSON.stringify({
        'status': document.getElementsByClassName("winner-info__status")[0].children[0].innerText,
        'name': document.getElementsByClassName("winner-info__title")[0].innerText.replaceAll('"', ''),
        'description': (document.getElementById("winner-summary").innerText).replace('<h2 class=\"winner__details-title\">Краткое описание</h2>', '').replaceAll('"', ''),
        'goal': document.getElementById("winner-aims").childNodes[3].innerText,
        'geography': (document.getElementById("winner-geography").innerText).replace('<h2 class=\"winner__details-title\">География проекта</h2>', '').replaceAll('"', ''),
        'social': (document.getElementById("winner-social").innerText).replace('<h2 class=\"winner__details-title\">Обоснование социальной значимости</h2>', '').replaceAll('"', ''),
        'tasks': document.getElementById("winner-tasks").childNodes[3].innerText,
        'audience': document.getElementById("winner-target").childNodes[3].innerText,
        'period': document.getElementsByClassName("winner-info__list-item-text")[4].innerText,
        'money_requested': document.getElementsByClassName("circle-bar__info-item")[0].childNodes[3].innerText,
        'money_cofound': document.getElementsByClassName("circle-bar__info-item")[1].childNodes[3].innerText,
    })
);