(function(){
    const documentE = document.documentElement;
    function setSize() {
        documentE.style.fontSize = documentE.getBoundingClientRect().width/15 + 'px'
    }
    setSize()

    window.addEventListener('resize',setSize)
})()