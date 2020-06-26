'use strict';

(function () {
  var UTIL = window.util;
  var MAIN = window.main;
  var MAP = window.map;
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');

  window.deactivation = {
    /**
    * Устанавливает странице неактивное состояние
    */
    setPageToInactive: function () {
      document.querySelector('.map__pin--main').addEventListener('mousedown', MAIN.onMouseClickActivateMap);
      document.querySelector('.map__pin--main').addEventListener('keydown', MAIN.onEnterPressMapActivation);
      map.classList.add('map--faded');
      form.classList.add('ad-form--disabled');
      UTIL.setBooleanValueAttributeFieldset(fieldsets, true);
      UTIL.setBooleanValueAttributeFieldset(fieldsets, true);
      MAP.removeOfferPins();
      MAP.removeCardOffer();
    },
  };
})();
