'use strict';

(function () {
  var MAX_NUMBER_OFFERS_ON_MAP = 5;
  var housingType = document.querySelector('#housing-type');

  /**
   * Отсекает от массива требуемое количество элементов и возвращает их
   * @param {Object} objects - массив объектов
   * @return {Object}
   */
  function slicePinData(objects) {
    var result = [];
    result = shuffle(objects).slice(0, MAX_NUMBER_OFFERS_ON_MAP);
    return result;
  }

  /**
   * Перемешивает массив случайным образом и возвращает его
   * @param {Object} array - используемый массив
   * @return {Object}
   */
  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  housingType.addEventListener('change', filterTypeHousing);

  function filterTypeHousing() {

  }

  window.filter = {
    pins: slicePinData
  };
})();
