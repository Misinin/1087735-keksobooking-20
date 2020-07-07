'use strict';

(function () {
  var UTIL = window.util;
  var mainPin = document.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');
  var select = document.querySelectorAll('select');

  UTIL.setBooleanValueAttributeFieldset(fieldsets, true);
  UTIL.setBooleanValueAttributeFieldset(select, true);

  window.backend.load(responseSuccess, function () {
    // console.error("Ошибка");
  });

  /**
  * Возвращает данные полученные с сервера
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
      window.activation.setPageActivate();
    }
  }

  window.main = {
    /**
    * Выполняет проверку нажатия клавиши и запускает переданную функцию
    * @param {Object} evt - объект события
    * @param {string} key - проверяемая клавиша
    * @param {Object} selectedFunction - вызываемая функция
    */
    onEnterPressMapActivation: function (evt) {
      if (evt.key === 'Enter') {
        window.activation.setPageActivate();
      }
    },
    onMainPinMouseDownHandler: function (evt) {
      onMainPinClick(evt);
      window.move.onMainPinMove(evt);
    }
  };

  mainPin.addEventListener('mousedown', window.main.onMainPinMouseDownHandler);
  mainPin.addEventListener('keydown', window.main.onEnterPressMapActivation);
})();
