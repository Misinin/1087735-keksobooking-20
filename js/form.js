'use strict';

(function () {
  var DEACTIVATION = window.deactivation;
  var BACKEND = window.backend;
  var MOVE = window.move;
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
  * Устанавливает значение координат острия пина в поле адреса
  */
  function setCurrentAddressValue() {
    var coords = MOVE.getAddressValue(mainPin, MainPinOffset.X, MainPinOffset.Y);
    addressField.value = coords.x + ', ' + coords.y;
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
    var coords = MOVE.getAddressValue(mainPin, mainPinCenter.x, mainPinCenter.y);
    if (addressField.value === '') {
      addressField.value = coords.x + ', ' + coords.y;
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

  /**
  * Действия при нажатии на кнопку сброса формы
  */
  function onResetButtonPress() {
    DEACTIVATION.page();
    adForm.reset();
  }

  var mainContentBlock = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content;
  var errorTemplate = document.querySelector('#error').content;

  /**
  * Обработчик события успешной отправки формы
  */
  function onSuccessUpLoad() {
    var successMessage = successTemplate.cloneNode(true);
    showMessageAboutUpLoad(successMessage);
    DEACTIVATION.page();
    adForm.reset();
    document.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
  }

  /**
  * Обработчик события ошибки при отправке формы
  */
  function onErrorUpLoad() {
    var errorMessage = errorTemplate.cloneNode(true);
    showMessageAboutUpLoad(errorMessage);
    var errorButton = document.querySelector('.error__button');
    document.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageEscPress);
    errorButton.addEventListener('click', onErrorButtonClick);
  }

  /**
  * Убирает блок сообщения о статусе отправки формы из разметки
  * @param {Object} messageBlock - блок статуса отправки формы
  */
  function eventOnSuccessMessagePopupHandler(messageBlock) {
    if (messageBlock) {
      var containerMessage = messageBlock.parentNode;
      containerMessage.removeChild(messageBlock);
      document.removeEventListener('click', onSuccessMessageClick);
      document.removeEventListener('keydown', onSuccessMessageEscPress);
    }
    document.removeEventListener('click', onSuccessMessageClick);
    document.removeEventListener('keydown', onSuccessMessageEscPress);
    mainPin.addEventListener('mousedown', window.main.onMouseClickPageActive);
    mainPin.addEventListener('keydown', window.main.onEnterPageActive);
  }

  /**
  * Обработчик клика по сообщению об успешной отправке
  */
  function onSuccessMessageClick() {
    var successBlock = document.querySelector('.success');
    eventOnSuccessMessagePopupHandler(successBlock);
    document.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
  }

  /**
  * Обработчик нажатия клавиши Escape по сообщению об успешной отправке
  * @param {Object} evt
  */
  function onSuccessMessageEscPress(evt) {
    if (evt.key === 'Escape') {
      var successBlock = document.querySelector('.success');
      eventOnSuccessMessagePopupHandler(successBlock);
    }
  }

  /**
  * Убирает блок сообщения о ошибке отправки формы из разметки
  * @param {Object} messageBlock - блок статуса отправки формы
  */
  function eventOnErrorMessagePopupHandler(messageBlock) {
    if (messageBlock) {
      var containerMessage = messageBlock.parentNode;
      var errorButton = document.querySelector('.error__button');
      containerMessage.removeChild(messageBlock);
      document.removeEventListener('click', onErrorMessageClick);
      document.removeEventListener('keydown', onErrorMessageEscPress);
      errorButton.removeEventListener('click', onErrorButtonClick);
    }
  }

  /**
  * Обработчик клика по сообщению об ошибке отправки
  */
  function onErrorMessageClick() {
    var errorBlock = document.querySelector('.error');
    eventOnErrorMessagePopupHandler(errorBlock);
  }

  /**
  * Обработчик нажатия клавиши Escape по сообщению об ошибке отправки
  * @param {Object} evt
  */
  function onErrorMessageEscPress(evt) {
    if (evt.key === 'Escape') {
      var errorBlock = document.querySelector('.error');
      eventOnErrorMessagePopupHandler(errorBlock);
    }
  }

  /**
  * Обработчик нажатия кнопки ошибки отправки
  * @param {Object} evt
  */
  function onErrorButtonClick(evt) {
    evt.preventDefault();
    var errorBlock = document.querySelector('.error');
    eventOnErrorMessagePopupHandler(errorBlock);
  }

  /**
  * Выводит сообщение о состоянии отправки формы на сервер
  * @param {Object} typeMessage - отображаемое сообщение
  */
  function showMessageAboutUpLoad(typeMessage) {
    mainContentBlock.appendChild(typeMessage);
  }

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    BACKEND.upLoad(new FormData(adForm), onSuccessUpLoad, onErrorUpLoad);
  });
})();
