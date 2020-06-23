'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var typeOfRentalHousing = document.querySelector('#type');
  var rentalPricePerNight = document.querySelector('#price');
  var timeFields = document.querySelector('.ad-form__element--time');
  var addressField = document.querySelector('#address');
  var resetFormButton = document.querySelector('.ad-form__reset');
  var mainPin = document.querySelector('.map__pin--main');
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

  var headline = adForm.querySelector('#title');

  /**
   * Выполняет валидацию заголовку по его длине
   */
  function validateHeadline() {
    var getMinLengthAttribute = headline.getAttribute('minlength');
    var getMaxLengthAttribute = headline.getAttribute('maxlength');
    var validity = headline.validity;

    if (validity.tooShort) {
      headline.setCustomValidity('Длина заголовка не менее ' + getMinLengthAttribute + ' символов.');
    } else if (validity.tooLong) {
      headline.setCustomValidity('Длина заголовка не более ' + getMaxLengthAttribute + ' символов.');
    } else if (validity.valueMissing) {
      headline.setCustomValidity('Обязательное поле');
    } else {
      headline.setCustomValidity('');
    }
  }

  /**
   * Выполняет валидацию заголовку по его длине в режиме ввода
   */
  function validateHeadlineInput() {
    var HeadlineLength = {
      MIN: 30,
      MAX: 100
    };

    var valueLength = headline.value.length;
    if (valueLength < HeadlineLength.MIN) {
      headline.setCustomValidity('Ещё ' + (HeadlineLength.MIN - valueLength) + ' симв.');
    } else if (valueLength > HeadlineLength.MAX) {
      headline.setCustomValidity('Удалите еще' + (HeadlineLength.MAX - valueLength) + ' симв.');
    } else {
      headline.setCustomValidity('');
    }
  }

  /**
   * Выполняет валидацию поля 'Цена за ночь'
   */
  function priceFieldValidation() {
    var minPriceValue = rentalPricePerNight.getAttribute('min');
    var maxPriceValue = rentalPricePerNight.getAttribute('max');
    var validity = rentalPricePerNight.validity;

    if (validity.rangeOverflow) {
      rentalPricePerNight.setCustomValidity('Максимальная цена аренды ' + maxPriceValue);
    } else if (validity.rangeUnderflow) {
      rentalPricePerNight.setCustomValidity('Минимальная цена аренды ' + minPriceValue);
    } else {
      rentalPricePerNight.setCustomValidity('');
    }
  }

  var roomNumberSelect = document.querySelector('#room_number');
  var capacityBuildingSelect = document.querySelector('#capacity');
  var RoomsFeatures = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  window.form = {
    type: typeOfRentalHousing,
    time: timeFields,
    reset: resetFormButton,
    /**
    * Устанавливает минимальное значение поля 'Цена за ночь' в зависимости от
    * выбранного типа жилья
    */
    setPriceOfBuilding: function () {
      var typeHousingValue = typeOfRentalHousing.value;
      rentalPricePerNight.min = MinimumPrice[typeHousingValue];
      rentalPricePerNight.placeholder = MinimumPrice[typeHousingValue];
    },
    /**
    * Устанавливает полученное значение соседнему полю
    * @param {Object} evt - объект события
    */
    setTheSameValue: function (evt) {
      var indexOfSelectedItem = evt.target.selectedIndex;
      var selectFields = timeFields.querySelectorAll('select');
      selectFields.forEach(function (selectItem) {
        selectItem.selectedIndex = indexOfSelectedItem;
      });
    },
    /**
    * Устанавливает значение поля ввода адреса и устанавливает ему режим - только
    * для чтения
    */
    setAddressValue: function () {
      addressField.value = (Math.round(getCoords(mainPin).top + MainPinOffset.X)) +
      ', ' + (Math.round(getCoords(mainPin).left + MainPinOffset.Y));
    },
    /**
     * Выполняет проверку соответствия выбранного количества комнат и количества гостей
    */
    validationRoomsSelect: function () {
      var selectRoomsValue = roomNumberSelect.value;
      var selectGuestValue = capacityBuildingSelect.value;
      var guestsArray = RoomsFeatures[selectRoomsValue];

      if (guestsArray.indexOf(selectGuestValue) === -1) {
        switch (+selectRoomsValue) {
          case 1:
            if (selectGuestValue === '1') {
              capacityBuildingSelect.setCustomValidity('');
            } else {
              capacityBuildingSelect.setCustomValidity('В одну комнату можно поселить только одного гостя.');
            }
            break;

          case 2:
            if (selectGuestValue === '1' || selectGuestValue === '2') {
              capacityBuildingSelect.setCustomValidity('');
            } else {
              capacityBuildingSelect.setCustomValidity('В две комнаты можно поселить не больше двух гостей.');
            }
            break;

          case 3:
            if (selectGuestValue === '1' || selectGuestValue === '2' || selectGuestValue === '3') {
              capacityBuildingSelect.setCustomValidity('');
            } else {
              capacityBuildingSelect.setCustomValidity('В три комнаты можно поселить от 1го до 3х гостей.');
            }
            break;

          case 100:
            if (selectGuestValue === '0') {
              capacityBuildingSelect.setCustomValidity('');
            } else {
              capacityBuildingSelect.setCustomValidity('Дворец не для гостей.');
            }
            break;
        }
      }
    },
    /**
    * Выполняет валидацию формы
    */
    validateForm: function () {
      headline.addEventListener('invalid', validateHeadline);
      headline.addEventListener('input', validateHeadlineInput);
      rentalPricePerNight.addEventListener('invalid', priceFieldValidation);
      roomNumberSelect.addEventListener('invalid', this.validationRoomsSelect);
      capacityBuildingSelect.addEventListener('invalid', this.validationRoomsSelect);
    }
  };
})();
