'use strict';

(function () {

  var MAX_SIMILAR_WIZARD_COUNT = 4;
  var userDialog = document.querySelector('.setup');

  var setupWizardForm = document.querySelector('.setup-wizard-form');
  var setupUserName = setupWizardForm.querySelector('.setup-user-name');
  var setupPlayer = document.querySelector('.setup-player');

  var wizardObject = {
    coat: setupPlayer.querySelector('.wizard-coat'),
    coatInput: setupPlayer.querySelector('.setup-wizard-coat-color'),
    eyes: setupPlayer.querySelector('.wizard-eyes'),
    eyesInput: setupPlayer.querySelector('.setup-wizard-eyes-color'),
    fireball: setupPlayer.querySelector('.setup-fireball'),
    fireballInput: setupPlayer.querySelector('.setup-fireball-color'),
  };

  var setWizardColorsHandlers = function () {
    wizardObject.coat.addEventListener('click', function () {
      var coatColor = getRandomElement(window.util.WIZARD_COAT_COLORS);
      window.util.isClickColor(wizardObject.coat, wizardObject.coatInput, coatColor);
    });
    wizardObject.eyes.addEventListener('click', function () {
      var eyesColor = getRandomElement(window.util.WIZARD_EYES_COLORS);
      window.util.isClickColor(wizardObject.eyes, wizardObject.eyesInput, eyesColor);
    });
    wizardObject.fireball.addEventListener('click', function () {
      var fireballColor = getRandomElement(window.util.WIZARD_FIREBALL_COLORS);
      window.util.isClickColor(wizardObject.fireball, wizardObject.fireballInput, fireballColor);
    });
  };

  window.setup = {
    setWizardColorsHandlers: setWizardColorsHandlers
  };

  setupUserName.addEventListener('invalid', function () {
    setupUserName.setCustomValidity('');
    if (setupUserName.value.length === 0) {
      setupUserName.setCustomValidity('Обязательное поле');
    }
  });

  setupUserName.addEventListener('input', function () {
    var valueLength = setupUserName.value.length;
    if (valueLength < window.util.MIN_NAME_LENGTH) {
      setupUserName.setCustomValidity('Ещё ' + (window.util.MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > window.util.MAX_NAME_LENGTH) {
      setupUserName.setCustomValidity('Удалите лишние ' + (valueLength - window.util.MAX_NAME_LENGTH) + ' симв.');
    } else {
      setupUserName.setCustomValidity('');
    }
  });

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var getRandomElement = function (wizardАttribute) {
    var indexElement = Math.floor(Math.random() * Math.floor(wizardАttribute.length));
    return wizardАttribute[indexElement];
  };

  /* var createWizard = function () {
    var wizard = {
      name: getRandomElement(window.util.WIZARD_NAMES) + ' ' + getRandomElement(window.util.WIZARD_SURNAMES),
      coatColor: getRandomElement(window.util.WIZARD_COAT_COLORS),
      eyesColor: getRandomElement(window.util.WIZARD_EYES_COLORS)
    };
    return wizard;
  }; */

  /*  var getWizards = function () {
    var wizards = [];
    for (var i = 0; i < window.util.POPULATION; i++) {
      wizards[i] = createWizard();
    }
    return wizards;
  }; */

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  /* function createDOMWizardsList(wizardsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsArray.length; i++) {
      fragment.appendChild(renderWizard(wizardsArray[i]));
    }
    similarListElement.appendChild(fragment);
  } */

  var getRandomIndex = function (wizardАttribute) {
    var randomIndex = Math.floor(Math.random() * Math.floor(wizardАttribute));
    return randomIndex;
  };

  var successGetDataHandler = function (wizardsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizardsArray[getRandomIndex(wizardsArray.length)]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');

  };

  var errorGetDataHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successGetDataHandler, errorGetDataHandler);

  var successSendDataHandler = function () {
    userDialog.classList.add('hidden');
    window.modal.createModalWindow('Форма успешно отправлена');
  };

  var errorSendDataHandler = function (message) {
    userDialog.classList.add('hidden');
    window.modal.createModalWindow(message);
  };

  var submitHandler = function (evt) {
    window.backend.save(new FormData(setupWizardForm), successSendDataHandler, errorSendDataHandler);
    evt.preventDefault();
  };

  setupWizardForm.addEventListener('submit', submitHandler);
})();
