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
  var mainPinCenter = {
    x: 31,
    y: 31
  };

  setAddressValue();
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
      left: box.left + pageXOffset,
      top: box.top + pageYOffset
    };
  }

  /**
  * Возвращает координаты пина в поле ввода адреса с заданным значением смещения
  * @param {Object} pinType - пин
  * @param {number} pinOffsetX - смещение пина по оси X
  * @param {number} pinOffsetY - смещение пина по оси Y
  * @return {string}
  */
  function getAddressValue(pinType, pinOffsetX, pinOffsetY) {
    return (Math.round(getCoords(pinType).left + pinOffsetX)) +
    ', ' + (Math.round(getCoords(pinType).top + pinOffsetY));
  }

  /**
   * Устанавливает значение координат острия пина в поле адреса
   */
  function setCurrentAddressValue() {
    addressField.value = getAddressValue(mainPin, MainPinOffset.X, MainPinOffset.Y);
    document.querySelector('.map__pin--main').removeEventListener('mousedown', setCurrentAddressValue);
    document.querySelector('.map__pin--main').removeEventListener('keydown', onMainPinEnterPress);
  }

  /**
   * Устанавливает значение координат острия пина в поле адреса при нажатии Enter на главном пине
   * @param {Object} evt
   */
  function onMainPinEnterPress(evt) {
    if (evt.key === 'Enter') {
      setCurrentAddressValue();
    }
  }

  /**
   * Устанавливает значние центра пина в поля адреса
   */
  function setAddressValue() {
    if (addressField.value === '') {
      addressField.value = getAddressValue(mainPin, mainPinCenter.x, mainPinCenter.y);
      document.querySelector('.map__pin--main').addEventListener('mousedown', setCurrentAddressValue);
      document.querySelector('.map__pin--main').addEventListener('keydown', onMainPinEnterPress);
    }
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

  window.form = {
    getAddressValue: function (pinType, pinOffsetX, pinOffsetY) {
      return (Math.round(getCoords(pinType).left + pinOffsetX)) +
      ', ' + (Math.round(getCoords(pinType).top + pinOffsetY));
    }
  };
})();
