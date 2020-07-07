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

  window.map = {
    /**
    * Отображает карточку предложения, если клик был не по главному пину
    * @param {Object} evt
    */
    onOfferPinCard: function (evt) {
      if (getPinIdClikedOn(evt) !== null) {
        mapBlock.appendChild(window.card.render(window.main.dataPins[getPinIdClikedOn(evt)]));
        var cardOffer = document.querySelector('.map .popup');
        cardOffer.querySelector('.popup__close').addEventListener('click', window.card.close);
      }
    },
    /**
    * Удаляет карточку предложения, если она отображена
    */
    removeCardOffer: function () {
      window.card.close();
    },
    /**
    * Удаляет пины из разметки
    */
    removeOfferPins: function () {
      var offers = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      offers.forEach(function (offer, index) {
        mapPins.removeChild(offers[index]);
      });
    }
  };
})();
