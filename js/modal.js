'use strict';

(function () {
  var modalWindow = document.createElement('div');
  var modalText = document.createElement('p');
  var buttonModal = document.createElement('button');

  var createModalWindow = function (message) {

    modalWindow.className = 'modal-window hidden';
    modalWindow.style = 'box-sizing: border-box; width: 800px; height: 180px; z-index: 100; margin: 0 auto; background-color: #89a1fd; position: absolute; text-align: center';
    modalWindow.style.left = window.outerWidth / 2 - parseInt(modalWindow.style.width, 10) / 2 + 'px';
    modalWindow.style.top = window.outerHeight / 2 - parseInt(modalWindow.style.height, 10) / 2 + 'px';

    modalText.className = 'modal-text';
    modalText.style = 'color: black; font-size: 30px;';
    modalText.textContent = message;

    modalText.className = 'modal-button';
    buttonModal.textContent = 'OK';
    buttonModal.type = 'button';

    buttonModal.addEventListener('click', closeModalWindow);

    document.body.appendChild(modalWindow);
    modalWindow.appendChild(modalText);
    modalWindow.insertAdjacentElement('beforeend', buttonModal);

    showModalWindow();
  };

  var showModalWindow = function () {
    modalWindow.classList.remove('hidden');

  };

  var closeModalWindow = function () {
    modalWindow.classList.add('hidden');
  };

  window.modal = {
    createModalWindow: createModalWindow,
    closeModalWindow: closeModalWindow
  };

})();
