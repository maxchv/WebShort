window.addEventListener('load', function () {
    (function () {
        var all, lang = document.language.current;
        function switchLang() {
            all = document.querySelectorAll("*[lang]");
            for (var i = 0; i < all.length; i++) {
                if (all[i].getAttribute("lang")) {
                    if (all[i].getAttribute("lang") !== lang.value) {
                        all[i].setAttribute("hidden", "true");
                    } else {
                        all[i].removeAttribute("hidden");
                    }
                }
            }
        }
        lang.addEventListener("change", switchLang);
        switchLang();
    })();
    // Этот хак удаляет узлы с классом remove
    (function removeAllElements(cls) {
        while (document.getElementsByClassName(cls).length > 0) {
            var removeElement = document.getElementsByClassName(cls)[0];
            var parent = removeElement.parentElement;
            parent.removeChild(removeElement);
        }
    })("remove");
});