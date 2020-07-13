'use strict';

(function () {
  var UTIL = window.util;
  var MAP = window.map;
  var PIN = window.pin;
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var select = document.querySelectorAll('select');
  var housingType = document.querySelector('#housing-type');

  /**
   * Устанавливает странице активное состояние
   */
  function setPageActivate() {
    document.querySelector('.map__pins').addEventListener('click', MAP.onOfferPinCard);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    UTIL.setBooleanValueAttributeFieldset(fieldsets, false);
    PIN.render(window.filter.typeHousing());
    if (select[0].disabled === true) {
      UTIL.setBooleanValueAttributeFieldset(select, false);
    }
    housingType.addEventListener('change', window.main.housingTypeFilter);
  }

  window.activation = {
    page: setPageActivate
  };
})();
