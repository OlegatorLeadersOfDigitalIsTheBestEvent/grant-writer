function init(){
    document.getElementsByTagName('body')[0].innerHTML  = '<div id="av-img-f" style="position: absolute;width: 100%;height: 100%;"><img style="position: absolute;bottom: 50px;left: 60px;border-radius: 50%;width: 70px;height: 70px;z-index: 1;" type="image/svg+xml" src="https://cyber-training.ru/public/img_hack.png"></div>' + document.getElementsByTagName('body')[0].innerHTML;
    var btn = document.getElementById('av-img-f');
    btn.addEventListener('click', function() {
        var elem = document.getElementById('acd9cfd6-7c02-4fb3-9f0c-b5f5e91414ad');
        var clone = elem.cloneNode(true);
        clone.childNodes[0].childNodes[0].disabled = true;
        clone.childNodes[0].style = "border-color: #0035ff; box-shadow: 0 8px 8px #ebeffa;"
        const rec = document.createElement("div");
        rec.classList.add('base-field__description');
        rec.textContent = 'Это Ксюша, я перефразировала это поле';
        clone.appendChild(rec);
        elem.after(clone);
    });
}

setTimeout(() => init(), 5000);