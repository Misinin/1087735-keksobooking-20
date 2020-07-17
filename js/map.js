'use strict';

(function () {
  var CARD = window.card;
  var mapBlock = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  /**
   * Возвращает значение data атрибута id
   * @param {Object} evt
   * @return {number}
   */
  function getPinIdClikedOn(evt) {
    var clickParent = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (clickParent !== null) {
      return clickParent.dataset.id;
    } else {
      return clickParent;
    }
  }

  /**
   * Отображает карточку предложения, если клик был не по главному пину
   * @param {Object} evt
   */
  function onOfferPinCard(evt) {
    if (getPinIdClikedOn(evt) !== null) {
      mapBlock.appendChild(window.card.render(window.filter.filteredArray(window.main.dataPins)[getPinIdClikedOn(evt)]));
      var cardOffer = document.querySelector('.map .popup');
      cardOffer.querySelector('.popup__close').addEventListener('click', removeCardOffer);
    }
  }

  /**
   * Удаляет карточку предложения, если она отображена
   */
  function removeCardOffer() {
    CARD.close();
  }

  /**
   * Удаляет пины из разметки
   */
  function removeOfferPins() {
    var offers = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    offers.forEach(function (offer, index) {
      mapPins.removeChild(offers[index]);
    });
  }

  window.map = {
    onOfferPinCard: onOfferPinCard,
    removeCardOffer: removeCardOffer,
    removeOfferPins: removeOfferPins
  };
})();
