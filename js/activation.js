'use strict';

(function () {
  var UTIL = window.util;
  var MAP = window.map;
  var PIN = window.pin;
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var select = document.querySelectorAll('select');
  var mapFilters = document.querySelector('.map__filters');

  /**
   * Присваивает глобальной переменной данные полученные с сервера
   * @param {Object} xhr
   */
  function responseSuccess(xhr) {
    window.activation.dataPins = xhr.response;
    PIN.render(window.activation.dataPins);
    UTIL.setBooleanValueAttributeFieldset(select, false);
  }

  /**
   * Устанавливает странице активное состояние
   */
  function setPageActivate() {
    document.querySelector('.map__pins').addEventListener('click', MAP.onOfferPinCard);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    UTIL.setBooleanValueAttributeFieldset(fieldsets, false);
    window.backend.load(responseSuccess, function () {});
    if (select[0].disabled === true) {
      UTIL.setBooleanValueAttributeFieldset(select, false);
    }
    mapFilters.addEventListener('change', window.debounce(window.main.onChangeHandler));
  }

  window.activation = {
    page: setPageActivate
  };
})();
