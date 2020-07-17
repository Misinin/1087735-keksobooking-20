'use strict';

(function () {
  // var recivedOffers = [];
  var priceRange = {
    low: {
      MIN: 0,
      MAX: 10000
    },
    middle: {
      MIN: 10000,
      MAX: 50000
    },
    high: {
      MIN: 50000,
      MAX: Infinity
    }
  };
  var ANY = 'any';
  var filters = document.querySelector('.map__filters');
  var houseType = filters.querySelector('#housing-type');
  var housePrice = filters.querySelector('#housing-price');
  var houseRooms = filters.querySelector('#housing-rooms');
  var houseGuests = filters.querySelector('#housing-guests');
  var houseFeatures = filters.querySelector('#housing-features');

  /**
   *
   * @param {Object} element
   * @return {Object}
   */
  var getFilteredAdsByType = function (element) {
    return houseType.value === element.offer.type;
  };

  /**
   *
   * @param {Object} element
   * @return {Object}
   */
  var getFilteredAdsByPrice = function (element) {
    return priceRange[housePrice.value].MIN <= element.offer.price && priceRange[housePrice.value].MAX >= element.offer.price;
  };

  /**
   *
   * @param {Object} element
   * @return {Object}
   */
  var getFilteredAdsByRooms = function (element) {
    return (parseFloat(houseRooms.value) === element.offer.rooms);
  };

  /**
   *
   * @param {Object} element
   * @return {Object}
   */
  var getFilteredAdsByGuests = function (element) {
    return (parseFloat(houseGuests.value) === element.offer.guests);
  };

  /**
   *
   * @param {Object} element
   * @return {Object}
   */
  var getCheckedFeatures = function () {
    return Array.from(houseFeatures.querySelectorAll('input:checked')).map(function (ad) {
      return ad.value;
    });
  };

  /**
   *
   * @param {Object} element
   * @return {Object}
   */
  var getFilteredAdsByFeatures = function (element) {
    return getCheckedFeatures().every(function (feature) {
      return element.offer.features.includes(feature);
    });
  };

  /**
   *
   * @param {Array} objects
   * @return {Array}
   */
  var getFilteredAds = function (objects) {
    var filtered = objects;
    var checkedFeatures = getCheckedFeatures();
    if (houseType.value !== ANY) {
      filtered = filtered.filter(getFilteredAdsByType);
    }
    if (housePrice.value !== ANY) {
      filtered = filtered.filter(getFilteredAdsByPrice);
    }
    if (houseRooms.value !== ANY) {
      filtered = filtered.filter(getFilteredAdsByRooms);
    }
    if (houseGuests.value !== ANY) {
      filtered = filtered.filter(getFilteredAdsByGuests);
    }
    if (checkedFeatures.length > 0) {
      filtered = filtered.filter(getFilteredAdsByFeatures);
    }
    return filtered;
  };

  window.filter = {
    filteredArray: getFilteredAds
  };
})();
