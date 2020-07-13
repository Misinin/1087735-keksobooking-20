'use strict';

(function () {
  var MAX_NUMBER_OFFERS_ON_MAP = 5;
  var recivedOffers = [];
  var housingType = document.querySelector('#housing-type');

  /**
   * Отсекает от массива требуемое количество элементов и возвращает их
   * @param {Object} objects - массив объектов
   * @return {Object}
   */
  function slicePinData(objects) {
    var result = [];
    result = objects.slice(0, MAX_NUMBER_OFFERS_ON_MAP);
    return result;
  }

  /**
   * Формирует массив предложений в зависимости от выбранного поля типа жилья
   * @return {Object}
   */
  function filterTypeHousing() {
    recivedOffers = window.main.dataPins;
    if (housingType.value === 'any') {
      var resultArray = slicePinData(recivedOffers);
      recivedOffers = resultArray;
      return recivedOffers;
    }
    recivedOffers = recivedOffers.filter(function (offer) {
      return housingType.value === offer.offer.type;
    });
    return recivedOffers;
  }

  housingType.addEventListener('change', filterTypeHousing);

  window.filter = {
    offers: recivedOffers,
    maxNumberPins: MAX_NUMBER_OFFERS_ON_MAP,
    typeHousing: filterTypeHousing
  };
})();
