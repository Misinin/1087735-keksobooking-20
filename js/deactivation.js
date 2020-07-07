'use strict';

(function () {
  var UTIL = window.util;
  var MAIN = window.main;
  var CARD = window.card;
  var MAP = window.map;
  var FORM = window.form;
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var select = document.querySelectorAll('select');

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
      UTIL.setBooleanValueAttributeFieldset(select, true);
      MAP.removeOfferPins();
      CARD.remove();
      FORM.deleteMessageListener();
      // window.form.setStartCoord();
    }
  };
})();
