'use strict';

(function () {

  var MAX_SIMILAR_WIZARD_COUNT = 4;

  var userDialog = document.querySelector('.setup');

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

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

  /*  var getRandomIndex = function (wizardАttribute) {
    var randomIndex = Math.floor(Math.random() * Math.floor(wizardАttribute));
    return randomIndex;
  }; */

  window.render = function (wizardsArray) {
    var fragment = document.createDocumentFragment();

    var takeNumber = wizardsArray.length > MAX_SIMILAR_WIZARD_COUNT ? MAX_SIMILAR_WIZARD_COUNT : wizardsArray.length;
    similarListElement.innerHTML = '';

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(wizardsArray[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');

  };

  //  window.render = {
  //  renderWizards: renderWizards
  //  };

})();
