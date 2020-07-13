'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var headline = adForm.querySelector('#title');
  var rentalPricePerNight = adForm.querySelector('#price');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacityBuildingSelect = adForm.querySelector('#capacity');

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

  /**
   * Выполняет проверку соответствия выбранного количества комнат и количества гостей
   */
  function validationRoomsSelect() {
    var selectRoomsValue = roomNumberSelect.value;
    var selectGuestValue = capacityBuildingSelect.value;
    capacityBuildingSelect.setCustomValidity('');

    switch (+selectRoomsValue) {
      case 1:
        if (selectGuestValue !== '1') {
          capacityBuildingSelect.setCustomValidity('В одну комнату можно поселить только одного гостя.');
        }
        break;

      case 2:
        if (selectGuestValue === '0' || selectGuestValue === '3') {
          capacityBuildingSelect.setCustomValidity('В две комнаты можно поселить не больше двух гостей.');
        }
        break;

      case 3:
        if (selectGuestValue === '0') {
          capacityBuildingSelect.setCustomValidity('В три комнаты можно поселить от 1го до 3х гостей.');
        }
        break;

      case 100:
        if (selectGuestValue !== '0') {
          capacityBuildingSelect.setCustomValidity('Дворец не для гостей.');
        }
        break;
    }
  }

  headline.addEventListener('invalid', validateHeadline);
  headline.addEventListener('input', validateHeadlineInput);
  rentalPricePerNight.addEventListener('invalid', priceFieldValidation);
  roomNumberSelect.addEventListener('change', validationRoomsSelect);
  capacityBuildingSelect.addEventListener('change', validationRoomsSelect);

  window.validation = {
    headline: validateHeadline(),
    headlineInput: validateHeadlineInput(),
    price: priceFieldValidation(),
    rooms: validationRoomsSelect(),
    guests: validationRoomsSelect()
  };
})();
