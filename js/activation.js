'use strict';

(function () {
  var UTIL = window.util;
  var MAIN = window.main;
  var MAP = window.map;
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var select = document.querySelectorAll('select');

  window.activation = {
    /**
    * Устанавливает странице активное состояние
    */
    setPageActivate: function () {
      mainPin.removeEventListener('mousedown', MAIN.onMainPinMouseDownHandler);
      mainPin.removeEventListener('keydown', MAIN.onEnterPressMapActivation);
      document.querySelector('.map__pins').addEventListener('click', MAP.onOfferPinCard);
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      UTIL.setBooleanValueAttributeFieldset(fieldsets, false);
      UTIL.setBooleanValueAttributeFieldset(select, false);
      window.pin.renderPins(window.main.dataPins);
    }
  };
})();
