'use strict';

(function () {
  var UTIL = window.util;
  var MAIN = window.main;
  var MAP = window.map;
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var select = document.querySelectorAll('select');

  /**
   * Функция обработчик события перемещения Главного Пина
   * @param {Object} evt
   */
  function isMainPinMove(evt) {
    window.move.onMainPinMove(evt);
  }

  window.activation = {
    /**
    * Устанавливает странице активное состояние
    */
    setPageActivate: function () {
      document.querySelector('.map__pin--main').removeEventListener('mousedown', MAIN.onMouseClickActivateMap);
      document.querySelector('.map__pin--main').removeEventListener('keydown', MAIN.onEnterPressMapActivation);
      document.querySelector('.map__pins').addEventListener('click', MAP.renderTargetPinCard);
      document.querySelector('.map__pin--main').addEventListener('mousedown', isMainPinMove);
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      UTIL.setBooleanValueAttributeFieldset(fieldsets, false);
      UTIL.setBooleanValueAttributeFieldset(select, false);
      window.pin.renderPins(window.main.dataPins);
    }
  };
})();
