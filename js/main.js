'use strict';

(function () {
  var DATA = window.data;
  var MAP = window.map;
  var FORM = window.form;
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var filterPins = document.querySelector('.map__filters').querySelectorAll('select');
  var typeOfRentalHousing = document.querySelector('#type');
  var timeFields = document.querySelector('.ad-form__element--time');

  var mapBlock = document.querySelector('.map');

  var mainPin = document.querySelector('.map__pin--main');

  /**
   *Устанавливает логическое значение атрибуту disabled
  * @param {Object} fildsetArray - массив fildset'ов
  * @param {boolean} state - логическое состояние атрибута disabled
  */
  function setBooleanValueAttributeFieldset(fildsetArray, state) {
    fildsetArray.forEach(function (itemFieldset) {
      itemFieldset.disabled = state;
    });
  }

  document.querySelector('.map__pin--main').addEventListener('mousedown', onMouseClickActivateMap);
  document.querySelector('.map__pin--main').addEventListener('keydown', onEnterPressMapActivation);
  document.querySelector('.map__pin--main').addEventListener('mousedown', FORM.setAddressValue);
  document.querySelector('.map__pin--main').removeEventListener('mouseup', FORM.setAddressValue);

  /**
    * Активирует карту предложений, если по главному пину нажата левая кнопка мыши
    * @param {Object} evt
    */
  function onMouseClickActivateMap(evt) {
    if (evt.which === 1) {
      window.main.setPageActivate();
    }
  }

  /**
 * Выполняет проверку нажатия клавиши и запускает переданную функцию
 * @param {Object} evt - объект события
 * @param {string} key - проверяемая клавиша
 * @param {Object} selectedFunction - вызываемая функция
 */
  function onEnterPressMapActivation(evt) {
    if (evt.key === 'Enter') {
      window.main.setPageActivate();
    }
  }

  window.main = {
    mainPin: mainPin,
    /**
    * Устанавливает странице неактивное состояние
    */
    setPageToInactive: function () {
      mapBlock.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      setBooleanValueAttributeFieldset(FORM.fieldsets, true);
      setBooleanValueAttributeFieldset(FORM.pinsFilter, true);
      FORM.type.removeEventListener('change', FORM.setPriceOfBuilding);
      timeFields.removeEventListener('change', FORM.setTheSameValue);
      FORM.reset.removeEventListener('click', this.onResetButtonPress);
      mainPin.removeEventListener('mouseup', FORM.setAddressValue);
      MAP.removeOfferPins();
      MAP.removeCardOffer();
      document.querySelector('.map__pin--main').addEventListener('mousedown', MAP.onMouseClickActivateMap);
      document.querySelector('.map__pin--main').addEventListener('keydown', MAP.onEnterPressMapActivation);
    },
    /**
    * Устанавливает странице активное состояние
    */
    setPageActivate: function () {
      document.querySelector('.map__pin--main').removeEventListener('mousedown', MAP.onMouseClickActivateMap);
      document.querySelector('.map__pin--main').removeEventListener('keydown', MAP.onEnterPressMapActivation);
      mapBlock.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      setBooleanValueAttributeFieldset(formFieldsets, false);
      setBooleanValueAttributeFieldset(filterPins, false);
      window.pin.renderPins(DATA.getRandomObjects);
      typeOfRentalHousing.addEventListener('change', window.form.setPriceOfBuilding);
      timeFields.addEventListener('change', FORM.setTheSameValue);
      FORM.reset.addEventListener('click', this.onResetButtonPress);
      FORM.validationRoomsSelect();
      adForm.addEventListener('click', FORM.validateForm);
      mainPin.addEventListener('mousedown', FORM.setAddressValue);
      document.querySelector('.map__pins').addEventListener('click', MAP.renderTargetPinCard);
    },
    onResetButtonPress: function () {
      this.setPageToInactive();
      adForm.reset();
    }
  };
}
)();
