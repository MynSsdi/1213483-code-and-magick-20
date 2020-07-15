'use strict';

(function () {

  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';
  var wizards = [];

  var userDialog = document.querySelector('.setup');

  var setupWizardForm = document.querySelector('.setup-wizard-form');

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  /*  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }; */

  var updateWizards = function () {
    /*    var sameCoatAndEyesWizards = wizards.filter(function(it) {
      return it.colorCoat === coatColor && it.colorEyes === eyesColor;
    })

    var sameCoatWizards = wizards.filter(function(it) {
      return it.colorCoat === coatColor;
    });

    var sameEyesWizards = wizards.filter(function(it) {
      return it.colorEyes === eyesColor;
    });

    var filteredWizards = sameCoatAndEyesWizards;
    filteredWizards = filteredWizards.concat(sameCoatWizards);
    filteredWizards = filteredWizards.concat(sameEyesWizards);
    filteredWizards = filteredWizards.concat(wizards);

    var uniqueWizards = filteredWizards.filter(function (it, i) {
      return filteredWizards.indexOf(it) === i;
    }); */

    window.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      //  rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var debounce = function (uw) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        uw.apply(null, parameters);
      }, window.util.DEBOUNCE_INTERVAL);
    };
  };

  var onEyesChange = debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var onCoatChange = debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var successGetDataHandler = function (wizardsArray) {
    wizards = wizardsArray;
    updateWizards();
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

  window.setup = {
    onEyesChange: onEyesChange,
    onCoatChange: onCoatChange
  };

})();
