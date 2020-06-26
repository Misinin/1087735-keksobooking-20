'use strict';

(function () {
  var DATA = window.data;
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
  * Закрывает карточку предложения
  */
  function closePopup() {
    var currentOffer = document.querySelector('.map .popup');
    if (currentOffer) {
      mapBlock.removeChild(currentOffer);
    }
    mapBlock.removeEventListener('keydown', window.map.onEscPressPopupClose);
    document.querySelector('.map__pins').addEventListener('click', window.map.renderTargetPinCard);
  }

  window.map = {
    /**
    *Проверяет нажатие клавиши Escape
    * @param {Object} evt
    * @param {Object} action - функция которую нужно выполнить
    */
    onEscPressPopupClose: function (evt) {
      if (evt.key === 'Escape') {
        closePopup();
      }
    },
    /**
    * Отображает карточку предложения, если клик был не по главному пину
    * @param {Object} evt
    */
    renderTargetPinCard: function (evt) {
      if (getPinIdClikedOn(evt) !== null) {
        mapBlock.appendChild(window.card.renderCard(DATA.getRandomObjects[getPinIdClikedOn(evt)]));
        var cardOffer = document.querySelector('.map .popup');
        cardOffer.querySelector('.popup__close').addEventListener('click', closePopup);
      }
    },
    /**
    * Удаляет карточку предложения, если она отображена
    */
    removeCardOffer: function () {
      closePopup();
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
