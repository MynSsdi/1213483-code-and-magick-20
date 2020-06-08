'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницка', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [
  {
    name: WIZARD_NAMES,
    surname: WIZARD_SURNAMES,
    coatColor: WIZARD_COAT_COLORS,
    eyesColor: WIZARD_EYES_COLORS
  },
  {
    name: WIZARD_NAMES,
    surname: WIZARD_SURNAMES,
    coatColor: WIZARD_COAT_COLORS,
    eyesColor: WIZARD_EYES_COLORS
  },
  {
    name: WIZARD_NAMES,
    surname: WIZARD_SURNAMES,
    coatColor: WIZARD_COAT_COLORS,
    eyesColor: WIZARD_EYES_COLORS
  },
  {
    name: WIZARD_NAMES,
    surname: WIZARD_SURNAMES,
    coatColor: WIZARD_COAT_COLORS,
    eyesColor: WIZARD_EYES_COLORS
  }
];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomElement = function (wizardАttribute) {
  var indexElement = Math.floor(Math.random() * Math.floor(wizardАttribute.length));
  return wizardАttribute[indexElement];
};

var createWizards = function (wizard) {
  wizard.name = getRandomElement(WIZARD_NAMES);
  wizard.surname = getRandomElement(WIZARD_SURNAMES);
  wizard.coatColor = getRandomElement(WIZARD_COAT_COLORS);
  wizard.eyesColor = getRandomElement(WIZARD_EYES_COLORS);
};

var renderWizard = function (wizard) {
  createWizards(wizard);
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
