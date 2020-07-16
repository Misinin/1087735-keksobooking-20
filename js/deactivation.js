'use strict';

(function () {
  var UTIL = window.util;
  var MAIN = window.main;
  var CARD = window.card;
  var MAP = window.map;
  var MOVE = window.move;
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var select = document.querySelectorAll('select');
  var mainPin = document.querySelector('.map__pin--main');

  /**
   * Устанавливает странице неактивное состояние
   */
  function setPageToInactive() {
    document.querySelector('.map__pin--main').addEventListener('mousedown', MAIN.onMouseClickPageActive);
    document.querySelector('.map__pin--main').addEventListener('keydown', MAIN.onEnterPageActive);
    mainPin.addEventListener('mousedown', MOVE.pin);
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    UTIL.setBooleanValueAttributeFieldset(fieldsets, true);
    UTIL.setBooleanValueAttributeFieldset(select, true);
    MAP.removeOfferPins();
    CARD.close();
    MOVE.start();
  }

  window.deactivation = {
    page: setPageToInactive
  };
})();
