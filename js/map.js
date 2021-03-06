'use strict';

(function () {
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
      mapBlock.appendChild(window.card.render(window.filter.filteredArray(window.activation.dataPins)[getPinIdClikedOn(evt)]));
    }
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
    removeOfferPins: removeOfferPins
  };
})();
