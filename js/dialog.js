'use strict';

(function () {

  var userDialog = document.querySelector('.setup');
  var setupWizardForm = document.querySelector('.setup-wizard-form');

  var openUserDialog = document.querySelector('.setup-open');
  var iconUserDialog = openUserDialog.querySelector('.setup-open-icon');
  var closeUserDialog = document.querySelector('.setup-close');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupWizardForm.addEventListener('keydown', function (evt) {
    window.util.isSaveButton(evt);
    });
    window.colorsHandlers.setWizardColorsHandlers();
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

}) ();
