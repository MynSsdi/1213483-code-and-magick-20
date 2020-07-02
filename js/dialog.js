'use strict';

(function () {

  var userDialog = document.querySelector('.setup');
  var setupWizardForm = document.querySelector('.setup-wizard-form');
  var openUserDialog = document.querySelector('.setup-open');
  var closeUserDialog = document.querySelector('.setup-close');
  var dialogHandle = document.querySelector('.upload');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupWizardForm.addEventListener('keydown', function (evt) {
      window.util.isSaveButton(evt);
    });
    window.setup.setWizardColorsHandlers();
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  openUserDialog.addEventListener('click', function () {
    openPopup();
  });

  openUserDialog.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  closeUserDialog.addEventListener('click', function () {
    closePopup();
  });

  closeUserDialog.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();

document.removeEventListener('click', function (evt) {
  evt.preventDefault();
});
