'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницка', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var POPULATION = 4;
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var userDialog = document.querySelector('.setup');
var openUserDialog = document.querySelector('.setup-open');
var iconUserDialog = document.querySelector('.setup-open-icon');
var closeUserDialog = document.querySelector('.setup-close');

var setupWizardForm = document.querySelector('.setup-wizard-form');
var setupUserName = setupWizardForm.querySelector('.setup-user-name');
var setupSubmitForm = setupWizardForm.querySelector('.setup-submit');

var setupPlayer = document.querySelector('.setup-player');
var wizardObject = {
  coat: setupPlayer.querySelector('.wizard-coat'),
  coatInput: setupPlayer.querySelector('.setup-wizard-coat-color'),
  eyes: setupPlayer.querySelector('.wizard-eyes'),
  eyesInput: setupPlayer.querySelector('.setup-wizard-eyes-color'),
  fireball: setupPlayer.querySelector('.setup-fireball'),
  fireballInput: setupPlayer.querySelector('.setup-fireball-color'),
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && !isInputNameInFocus() && isSetupOpened()) {
    closePopup();
  }
};

var isSetupOpened = function () {
  return !userDialog.classList.contains('hidden');
};

var isInputNameInFocus = function () {
  return setupUserName === document.activeElement;
};

var onClickCoatColor = function () {
  var coatColor = getRandomElement(WIZARD_COAT_COLORS);
  wizardObject.coat.style.fill = coatColor;
  wizardObject.coatInput.value = coatColor;
};

var onClickEyesColor = function () {
  var eyesColor = getRandomElement(WIZARD_EYES_COLORS);
  wizardObject.eyes.style.fill = eyesColor;
  wizardObject.eyesInput.value = eyesColor;
};

var onClickFireballColor = function () {
  var fireballColor = getRandomElement(WIZARD_FIREBALL_COLORS);
  wizardObject.fireball.style.backgroundColor = fireballColor;
  wizardObject.fireballInput.value = fireballColor;
};

var setWizardColorsHandlers = function () {
  wizardObject.coat.addEventListener('click', onClickCoatColor);
  wizardObject.eyes.addEventListener('click', onClickEyesColor);
  wizardObject.fireball.addEventListener('click', onClickFireballColor);
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupWizardForm.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && !isSaveButtonInFocus() && isSetupOpened()) {
      evt.preventDefault();
    }
  });
  setWizardColorsHandlers();
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

openUserDialog.addEventListener('click', function () {
  openPopup();
});

var isIconUserInFocus = function () {
  return iconUserDialog === document.activeElement;
};

openUserDialog.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' && isIconUserInFocus()) {
    openPopup();
  }
});

closeUserDialog.addEventListener('click', function () {
  closePopup();
});

var isCloseInFocus = function () {
  return closeUserDialog === document.activeElement;
};

closeUserDialog.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' && isCloseInFocus) {
    closePopup();
  }
});

setupUserName.addEventListener('invalid', function () {
  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity('Обязательное поле');
  } else {
    setupUserName.setCustomValidity('');
  }
});

setupUserName.addEventListener('input', function () {
  var valueLength = setupUserName.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    setupUserName.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    setupUserName.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    setupUserName.setCustomValidity('');
  }
});

var isSaveButtonInFocus = function () {
  return setupSubmitForm === document.activeElement;
};

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomElement = function (wizardАttribute) {
  var indexElement = Math.floor(Math.random() * Math.floor(wizardАttribute.length));
  return wizardАttribute[indexElement];
};

var createWizard = function (name, surname, coatColor, eyesColor) {
  var wizard = {
    name: getRandomElement(name) + ' ' + getRandomElement(surname),
    coatColor: getRandomElement(coatColor),
    eyesColor: getRandomElement(eyesColor)
  };
  return wizard;
};

var getWizards = function () {
  var wizards = [];
  for (var i = 0; i < POPULATION; i++) {
    wizards[i] = createWizard(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLORS, WIZARD_EYES_COLORS);
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

function createDOMWizardsList(wizardsArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsArray.length; i++) {
    fragment.appendChild(renderWizard(wizardsArray[i]));
  }
  similarListElement.appendChild(fragment);
}

userDialog.querySelector('.setup-similar').classList.remove('hidden');

createDOMWizardsList(getWizards());
