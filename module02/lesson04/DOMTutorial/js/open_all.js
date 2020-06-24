window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.code == 'KeyO') {
        document.querySelectorAll("button")
            .forEach(button => {
                button.removeAttribute('disabled');
                console.log(button);
            });
    }
});