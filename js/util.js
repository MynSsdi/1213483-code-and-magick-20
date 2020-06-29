'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницка', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var POPULATION = 4;
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  var isIconUserInFocus = function () {
    return iconUserDialog === document.activeElement;
  };

  var isCloseInFocus = function () {
    return closeUserDialog === document.activeElement;
  };

  var isInputNameInFocus = function () {
    return setupUserName === document.activeElement;
  };

  var isSetupOpened = function () {
    return !userDialog.classList.contains('hidden');
  };

  var isSaveButtonInFocus = function () {
    return setupSubmitForm === document.activeElement;
  };

  window.util = {
    WIZARD_NAMES: WIZARD_NAMES,
    WIZARD_SURNAMES: WIZARD_SURNAMES,
    WIZARD_COAT_COLORS: WIZARD_COAT_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS,
    WIZARD_FIREBALL_COLORS: WIZARD_FIREBALL_COLORS,

    POPULATION: POPULATION,
    MIN_NAME_LENGTH: MIN_NAME_LENGTH,
    MAX_NAME_LENGTH: MAX_NAME_LENGTH,

    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape' && !isInputNameInFocus() && isSetupOpened()) {
        action();
      }
  },
    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter' && isIconUserInFocus()) {
        action();
      } else if (evt.key === 'Enter' && isCloseInFocus()) {
        action();
      }
  },
  isSaveButton: function (evt) {
    if (evt.key === 'Enter' && !isSaveButtonInFocus() && isSetupOpened()) {
      evt.preventDefault();
    }
  },
  isClickColor: function (wizardObjectElement, wizardObjectInput, wizardObjectColor) {
    if (wizardObjectElement.tagName !== 'DIV') {
      wizardObjectElement.style.fill = wizardObjectColor;
      wizardObjectInput.value = wizardObjectColor;
    } else {
      wizardObjectElement.style.backgroundColor = wizardObjectColor;
    }
  }
};

})();
