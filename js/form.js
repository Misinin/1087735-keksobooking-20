'use strict';

(function () {
  var DEACTIVATION = window.deactivation;
  var adForm = document.querySelector('.ad-form');
  var typeOfRentalHousing = document.querySelector('#type');
  var timeFields = document.querySelector('.ad-form__element--time');
  var mainPin = document.querySelector('.map__pin--main');
  var rentalPricePerNight = document.querySelector('#price');
  var addressField = document.querySelector('#address');
  var resetFormButton = document.querySelector('.ad-form__reset');
  var MinimumPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 100000
  };
  var MainPinOffset = {
    X: 36,
    Y: 84
  };

  document.querySelector('.map__pin--main').addEventListener('mousedown', setAddressValue);
  document.querySelector('.map__pin--main').removeEventListener('mouseup', setAddressValue);
  typeOfRentalHousing.addEventListener('change', setPriceOfBuilding);
  timeFields.addEventListener('change', setTheSameValue);
  resetFormButton.addEventListener('click', onResetButtonPress);

  /**
  * Возвращает координаты элемента относительно документа
  * @param {Object} elem - вычисляемый элемент
  * @return {Object}
  */
  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  /**
  * Устанавливает значение поля ввода адреса и устанавливает ему режим - только
  * для чтения
  */
  function setAddressValue() {
    addressField.value = (Math.round(getCoords(mainPin).top + MainPinOffset.X)) +
    ', ' + (Math.round(getCoords(mainPin).left + MainPinOffset.Y));
  }

  /**
  * Устанавливает минимальное значение поля 'Цена за ночь' в зависимости от
  * выбранного типа жилья
  */
  function setPriceOfBuilding() {
    var typeHousingValue = typeOfRentalHousing.value;
    rentalPricePerNight.min = MinimumPrice[typeHousingValue];
    rentalPricePerNight.placeholder = MinimumPrice[typeHousingValue];
  }

  /**
  * Устанавливает полученное значение соседнему полю
  * @param {Object} evt - объект события
  */
  function setTheSameValue(evt) {
    var indexOfSelectedItem = evt.target.selectedIndex;
    var selectFields = timeFields.querySelectorAll('select');
    selectFields.forEach(function (selectItem) {
      selectItem.selectedIndex = indexOfSelectedItem;
    });
  }

  function onResetButtonPress() {
    DEACTIVATION.setPageToInactive();
    adForm.reset();
  }
})();
