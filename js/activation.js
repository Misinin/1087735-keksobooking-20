'use strict';

(function () {
  var UTIL = window.util;
  var MAIN = window.main;
  var DATA = window.data;
  var MAP = window.map;
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');

  window.activation = {
    /**
    * Устанавливает странице активное состояние
    */
    setPageActivate: function () {
      document.querySelector('.map__pin--main').removeEventListener('mousedown', MAIN.onMouseClickActivateMap);
      document.querySelector('.map__pin--main').removeEventListener('keydown', MAIN.onEnterPressMapActivation);
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      UTIL.setBooleanValueAttributeFieldset(fieldsets, false);
      UTIL.setBooleanValueAttributeFieldset(fieldsets, false);
      window.pin.renderPins(DATA.getRandomObjects);
      document.querySelector('.map__pins').addEventListener('click', MAP.renderTargetPinCard);
      document.querySelector('.map__pin--main').addEventListener('mousedown', function (evt) {
        window.move.onMainPinMove(evt);
      });
    }
  };
})();
