'use strict';

(function () {

  var setupPlayer = document.querySelector('.setup-player');

  var wizardObject = {
    coat: setupPlayer.querySelector('.wizard-coat'),
    coatInput: setupPlayer.querySelector('.setup-wizard-coat-color'),
    eyes: setupPlayer.querySelector('.wizard-eyes'),
    eyesInput: setupPlayer.querySelector('.setup-wizard-eyes-color'),
    fireball: setupPlayer.querySelector('.setup-fireball'),
    fireballInput: setupPlayer.querySelector('.setup-fireball-color'),
  };

  var getRandomElement = function (wizardАttribute) {
    var indexElement = Math.floor(Math.random() * Math.floor(wizardАttribute.length));
    return wizardАttribute[indexElement];
  };

  var setWizardColorsHandlers = function () {
    wizardObject.coat.addEventListener('click', function () {
      var coatColor = getRandomElement(window.util.WIZARD_COAT_COLORS);
      window.setup.onCoatChange(coatColor);
      window.util.isClickColor(wizardObject.coat, wizardObject.coatInput, coatColor);
    });
    wizardObject.eyes.addEventListener('click', function () {
      var eyesColor = getRandomElement(window.util.WIZARD_EYES_COLORS);
      window.setup.onEyesChange(eyesColor);
      window.util.isClickColor(wizardObject.eyes, wizardObject.eyesInput, eyesColor);
    });
    wizardObject.fireball.addEventListener('click', function () {
      var fireballColor = getRandomElement(window.util.WIZARD_FIREBALL_COLORS);
      window.util.isClickColor(wizardObject.fireball, wizardObject.fireballInput, fireballColor);
    });
  };

  window.wizard = {
    setWizardColorsHandlers: setWizardColorsHandlers
  };

})();
