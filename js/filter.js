'use strict';

(function () {
  var PIN = window.pin;
  var ANY = 'any';
  var filteres = document.querySelector('.map__filters');
  var selectHouseType = document.querySelector('#housing-type');
  var selectHousePrice = document.querySelector('#housing-price');
  var selectHouseRooms = document.querySelector('#housing-rooms');
  var selectHouseGuests = document.querySelector('#housing-guests');


  filteres.addEventListener('change', onChangeHandler);

  function onChangeHandler() {
    var houseType = selectHouseType.value;
    var housePrice = selectHousePrice.value;
    var houseRooms = selectHouseRooms.value.toString();
    var houseGuests = selectHouseGuests.value.toString();

    function filteredArray(element) {
      var isType = true;
      var isRooms = true;
      var isGuests = true;
      var isPrice = true;
      var isFeatures = true;

      if (houseType !== ANY) {
        isType = element.offer.type === houseType;
      }
      return isType;
    }

    window.map.removeOfferPins();
    window.map.removeCardOffer();
    return window.main.dataPins.filter(filteredArray);
  }

  window.filter = {
    onChangeHandler: onChangeHandler
  };
})();
