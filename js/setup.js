'use strict';

var WIZARD_NAMES = ['Иван','Хуан Себастьян','Мария','Кристоф','Виктор','Юлия','Люпита','Вашингтон'];
var WIZARD_SURNAME = ['да Марья','Верон','Мирабелла','Вальц','Онопко','Топольницка','Нионго','Ирвинг'];
var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var maxlength = [WIZARD_NAMES, WIZARD_SURNAME, WIZARD_COAT, WIZARD_EYES];
var maxIndex = ['names', 'surname', 'coat', 'eyes'];

var wizards = [
  {
    name: WIZARD_NAMES,
    surname: WIZARD_SURNAME,
    coatColor: WIZARD_COAT,
    eyesColor: WIZARD_EYES
  },
  {
    name: WIZARD_NAMES,
    surname: WIZARD_SURNAME,
    coatColor: WIZARD_COAT,
    eyesColor: WIZARD_EYES
  },
  {
    name: WIZARD_NAMES,
    surname: WIZARD_SURNAME,
    coatColor: WIZARD_COAT,
    eyesColor: WIZARD_EYES
  },
  {
    name: WIZARD_NAMES,
    surname: WIZARD_SURNAME,
    coatColor: WIZARD_COAT,
    eyesColor: WIZARD_EYES
  }
];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var createWizards = function (wizard) {
  for (var j = 0; j < maxlength.length; j++) {
    maxIndex[j] = getRandomInt(maxlength[j].length);
  }
  wizard.name = WIZARD_NAMES[maxIndex[0]];
  wizard.surname = WIZARD_SURNAME[maxIndex[1]];
  wizard.coatColor = WIZARD_COAT[maxIndex[2]];
  wizard.eyesColor = WIZARD_EYES[maxIndex[3]];
}

var renderWizard = function(wizard) {
  createWizards(wizard);
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
