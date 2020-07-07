'use strict';

(function () {
  var UTIL = window.util;
  var DATA = window.data;
  var MAP = window.map;
  var mapBlock = document.querySelector('.map');
  var offerTemplate = document.querySelector('#card').content;
  var offerItem = offerTemplate.querySelector('.map__card');
  var clonedOfferItem = offerItem.cloneNode(true);

  /**
  * Убирает шаблонное значение цены предложения
  */
  function clearFieldOfferPrice() {
    var priceOffer = clonedOfferItem.querySelector('.popup__text--price');
    var hTMLCollectionPriceOffer = priceOffer.childNodes;
    hTMLCollectionPriceOffer[0].textContent = '';
  }

  /**
  * Очищает поле features
  */
  function clearFieldFeatures() {
    clonedOfferItem.querySelector('.popup__features').innerHTML = '';
  }

  /**
  * Созадет фрагмент разметки features на основании данных и возвращает его
  * @param {Object} recivedFeatures - массив возможностей полученных извне
  * @return {Object}
  */
  function createFeaturesFragment(recivedFeatures) {
    var featuresFragment = document.createDocumentFragment();
    recivedFeatures.forEach(function (feature) {
      var featureItem = document.createElement('li');
      featureItem.classList = 'popup__feature popup__feature--' + feature;
      featuresFragment.appendChild(featureItem);
    });
    return featuresFragment;
  }

  var photosForOffer = clonedOfferItem.querySelector('.popup__photos');
  var photoItemTemplate = photosForOffer.querySelector('img');
  var photoWidth = photoItemTemplate.getAttribute('width');
  var photoHeigth = photoItemTemplate.getAttribute('heigth');

  /**
   * Очищает блок изображений в шаблоне
   */
  function clearPhotosField() {
    clonedOfferItem.querySelector('.popup__photos').innerHTML = '';
  }

  /**
  * Созадет фрагмент фотографий здания и возвращает его
  * @param {Object} recivedPhotos - массив фотографий полученных извне
  * @return {Object}
  */
  function createBuildingPhotosFragment(recivedPhotos) {
    clearPhotosField();
    var photosFragment = document.createDocumentFragment();
    recivedPhotos.forEach(function (element) {
      var photoItem = photoItemTemplate.cloneNode();
      photoItem.src = element;
      photoItem.style.width = photoWidth;
      photoItem.style.heigth = photoHeigth;
      photosFragment.appendChild(photoItem);
    });
    photoItemTemplate.remove();
    return photosFragment;
  }

  /**
  * Закрывает карточку предложения
  */
  function closeCard() {
    var currentOffer = document.querySelector('.map .popup');
    if (currentOffer) {
      mapBlock.removeChild(currentOffer);
    }
    mapBlock.removeEventListener('keydown', window.map.onEscPressPopupClose);
    document.querySelector('.map__pins').addEventListener('click', window.map.renderTargetPinCard);
  }

  /**
  * Удаляет карту предложения из разметки
  */
  function removeCard() {
    var currentOffer = document.querySelector('.map .popup');
    if (currentOffer) {
      mapBlock.removeChild(currentOffer);
    }
  }

  /**
  *Проверяет нажатие клавиши Escape
  * @param {Object} evt
  * @param {Object} action - функция которую нужно выполнить
  */
  function onEscPressCardClose(evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }
  }

  /**
  * Наполняет контентом шаблон карточки предложения
  * @param {Object} objectOffer
  * @return {Object}
  */
  function renderCard(objectOffer) {
    clonedOfferItem.querySelector('.popup__title').textContent = objectOffer.offer.title;
    clonedOfferItem.querySelector('.popup__text--address').textContent = objectOffer.offer.address;
    clonedOfferItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + objectOffer.offer.checkin +
    ' выезд до ' + objectOffer.offer.checkout;
    clonedOfferItem.querySelector('.popup__description').textContent = objectOffer.offer.description;
    clonedOfferItem.querySelector('.popup__avatar').src = objectOffer.author.avatar;
    clearFieldOfferPrice();
    clonedOfferItem.querySelector('.popup__text--price').insertAdjacentText('afterbegin', objectOffer.offer.price + '₽');
    var rooms = objectOffer.offer.rooms;
    var guests = objectOffer.offer.guests;
    clonedOfferItem.querySelector('.popup__text--capacity').textContent = rooms + ' ' + UTIL.getCorrectWord(rooms, DATA.wordForms.room) +
    ' для ' + guests + ' ' + UTIL.getCorrectWord(guests, DATA.wordForms.guest);
    clearFieldFeatures();
    clonedOfferItem.querySelector('.popup__features').appendChild(createFeaturesFragment(objectOffer.offer.features));
    clonedOfferItem.querySelector('.popup__photos').appendChild(createBuildingPhotosFragment(objectOffer.offer.photos));
    mapBlock.addEventListener('keydown', onEscPressCardClose);
    document.querySelector('.map__pins').removeEventListener('click', MAP.renderTargetPinCard);

    return clonedOfferItem;
  }

  window.card = {
    render: renderCard,
    remove: removeCard
  };
})();
