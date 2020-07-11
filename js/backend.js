'use strict';

(function () {
  var urlGet = 'https://javascript.pages.academy/code-and-magick/data';
  var urlSend = 'https://javascript.pages.academy/code-and-magick';

  var StatusCode = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 10000;

  var sendData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

    });

    xhr.open('POST', urlSend);
    xhr.send(data);
  };

  var getData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });


    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', urlGet);

    xhr.send();
  };

  window.backend = {
    save: sendData,
    load: getData
  };

})();
