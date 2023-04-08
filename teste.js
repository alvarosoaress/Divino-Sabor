// ==UserScript==
// @name         Canva Bypass
// @version      0.1
// @description  try to take over the world!
// @author       Calvo
// @icon         https://www.google.com/s2/favicons?sz=64&domain=canva.com
// @match        https://www.canva.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  var link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'
  document.head.appendChild(link);

   containerClass();

  let elementsContainer = document.getElementsByClassName('v5rXzA');

  let elements = document.querySelectorAll('mh2TGQ, .CAFSwg, .wZ_zoQ, ._6mbnHA, .wKiiLw');

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      updateButton();
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  function updateButton() {
    elements = 0;
    elements = document.querySelectorAll('mh2TGQ, .CAFSwg, .wZ_zoQ, ._6mbnHA, .wKiiLw');

    // Adiciona debouncing
    clearTimeout(updateButton.timer);
    updateButton.timer = setTimeout(function() {
      elements.forEach(item => {
        if (!item.querySelector('#dwld-btn') && typeof item.children[0].src !== 'undefined') {
            var containerDwn = document.createElement('a');
            var iconDwn = document.createElement('i');
            containerDwn.id = 'dwld-btn';
            containerDwn.classList.add('dwld-btn');
            containerDwn.onclick = async function() {
                try {
                    const response = await fetch(item.children[2].src);
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "";
                    a.click();
                    URL.revokeObjectURL(url);
                } catch (error) {
                    console.error(error);
                }
            };

            iconDwn.classList.add('fa-solid', 'fa-download', 'fa-lg');

            containerDwn.appendChild(iconDwn);

            // --------------------------------------------------------------------------

            var containerCopy = document.createElement('a');
            var iconCopy = document.createElement('i');
            containerCopy.id = 'dwld-btn';
            containerCopy.classList.add('dwld-btn');
            containerCopy.style.top = 0;
            containerCopy.onclick = function() {
                const tempInput = document.createElement("input");
                tempInput.value = item.children[2].src
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand("copy");
                document.body.removeChild(tempInput);
            };

            iconCopy.classList.add('fa-solid', 'fa-copy', 'fa-lg');

            containerDwn.appendChild(iconDwn);
            containerCopy.appendChild(iconCopy);

            item.insertBefore(containerDwn, item.firstChild);
            item.insertBefore(containerCopy, item.firstChild);
        }});
    }, 200); // Chama a função após 200 milissegundos
  }

  function containerClass(){
  let style = document.createElement('style');
            style.innerHTML = `
  .dwld-btn {
    height: 25px;
    width: 25px;
z-index: 100000000;
position: absolute;
bottom: 0;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
  }
  i:hover{
    color: #008009 !important;
  }
`;
            document.head.appendChild(style);
}
})();
