'use strict';

(function () {
  var Url = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    POST: 'https://javascript.pages.academy/keksobooking'
  };

  var StatusCodes = {
    OK: 200
  };

  var TIME_OUT_MS = 10000;

  /**
   * Возвращает XHR объект
   * @param {Object} successAction - действия при получении данных с сервера
   * @param {*} errorAction - действия при получении ошибки с сервера
   * @return {Object}
   */
  function createXHR(successAction, errorAction) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIME_OUT_MS; // 10s

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCodes.OK) {
        successAction(xhr);
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

  /**
   * Выполняет отправку запроса на сервер
   * @param {Object} successAction - действия при получении данных с сервера
   * @param {Object} errorAction - действия при получении ошибки с сервера
   */
  function download(successAction, errorAction) {
    var xhr = createXHR(successAction, errorAction);
    xhr.open('GET', Url.GET);
    xhr.send();
  }

  /**
   * Выполняет отправку данных на сервер
   * @param {Object} data - данные для отправки
   * @param {Object} successAction - действия при получении данных с сервера
   * @param {Object} errorAction - действия при получении ошибки с сервера
   */
  function upLoad(data, successAction, errorAction) {
    var xhr = createXHR(successAction, errorAction);
    xhr.open('POST', Url.POST);
    xhr.send(data);
  }

  window.backend = {
    load: download,
    upLoad: upLoad,
    statusCodes: StatusCodes
  };
})();
