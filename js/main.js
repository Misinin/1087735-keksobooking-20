'use strict';

(function () {
  var UTIL = window.util;
  var ACTIVATION = window.activation;
  var MOVE = window.move;
  var mainPin = document.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');
  var select = document.querySelectorAll('select');

  UTIL.setBooleanValueAttributeFieldset(fieldsets, true);
  UTIL.setBooleanValueAttributeFieldset(select, true);

  window.backend.load(responseSuccess, function () {
    // console.error("Данные с сервера не получены");
  });

  /**
  * Присваивает глобальной переменной данные полученные с сервера
  * @param {Object} xhr
  */
  function responseSuccess(xhr) {
    window.main.dataPins = xhr.response;
  }

  /**
  * Активирует карту предложений, если по главному пину нажата левая кнопка мыши
  * @param {Object} evt
  */
  function onMainPinClick(evt) {
    if (evt.which === 1) {
      ACTIVATION.page();
    }
  }

  /**
  * Выполняет проверку нажатия клавиши и запускает переданную функцию
  * @param {Object} evt - объект события
  * @param {string} key - проверяемая клавиша
  * @param {Object} selectedFunction - вызываемая функция
  */
  function onEnterPressMapActivation(evt) {
    if (evt.key === 'Enter') {
      ACTIVATION.page();
      mainPin.removeEventListener('mousedown', onMainPinMouseDownHandler);
      mainPin.removeEventListener('keydown', onEnterPressMapActivation);
    }
  }

  /**
  * Обработчик события клика по главному пину
  * @param {Object} evt
  */
  function onMainPinMouseDownHandler(evt) {
    onMainPinClick(evt);
    mainPin.removeEventListener('mousedown', onMainPinMouseDownHandler);
    mainPin.removeEventListener('keydown', onEnterPressMapActivation);
    MOVE.pin(evt);
  }

  mainPin.addEventListener('mousedown', onMainPinMouseDownHandler);
  mainPin.addEventListener('keydown', onEnterPressMapActivation);

  window.main = {
    onEnterPageActive: onEnterPressMapActivation,
    onMouseClickPageActive: onMainPinMouseDownHandler
  };
})();
