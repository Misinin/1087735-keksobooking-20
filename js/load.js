'use strict';

(function () {
  var URL = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    POST: 'https://javascript.pages.academy/keksobooking'
  };

  function createXHR(successAction, errorAction) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000; // 10s

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successAction();
      } else {
        errorAction('Стутус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorAction('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorAction('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    return xhr;
  }

  window.backend = {
    load: function (successAction, errorAction) {
      var xhr = createXHR(successAction, errorAction);
      xhr.open('GET', URL.GET);
      xhr.send();
    },
    upLoad: function (data, successAction, errorAction) {
      var xhr = createXHR(successAction, errorAction);
      xhr.open('POST', URL.POST);
      xhr.send(data);
    }
  };
})();
