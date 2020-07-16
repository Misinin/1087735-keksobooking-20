'use strict';

(function () {
  var PIN = window.pin;
  var filteres = document.querySelector('.map__filters');
  var selectHouseType = document.querySelector('#housing-type');
  var selectHousePrice = document.querySelector('#housing-price');
  var selectHouseRooms = document.querySelector('#housing-rooms');
  var selectHouseGuests = document.querySelector('#housing-guests');

  var houseType = selectHouseType.value;
  var housePrice = selectHousePrice.value;
  var houseRooms = selectHouseRooms.value.toString();
  var houseGuests = selectHouseGuests.value.toString()

  function getFilteredPins(objects) {
    if (houseType === 'any') {
      return objects;
    } else {
      return objects.filter(function (offer) {
        return houseType.value === offer.offer.type;
      });
    }
  }

  function onChangeHandler(objects) {
    console.log(getFilteredPins(objects));
    PIN.render(getFilteredPins(objects));
  }

  filteres.addEventListener('change', onChangeHandler(window.main.dataPins));

  window.filter = {
    getFilteredPins: getFilteredPins
  };
})();
