'use strict';

var MIN_Y_LOCATION = 130;
var MAX_Y_LOCATION = 630;
var MIN_X_LOCATION = 0;
var MAX_X_LOCATION = 1200;
var MIN_PRICE = 1000;
var MAX_PRICE = 10000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 8;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var OFFSET_X_FORPIN = 25;
var OFFSET_Y_FORPIN = 70;
var NUMBER_OF_OBJECTS = 8;
var buildings = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

/**
 * Возвращает случайное число, максимум и минимум включаются
 * @param {number} min - минимальное значение числа
 * @param {number} max - максимальное значение числа
 * @return {number}
 */
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

/**
 * Возвращает объект со свойством avatar, адрес которого случайно сгенерирован.
 * @param {number} index -индекс для значения адреса аватарки
 * @return {Object}
 */
var generateAuthorObject = function (index) {
  var author = {};
  author.avatar = 'img/avatars/user0' + (index + 1) + '.png';
  return author;
};

/**
 * Возвращает значение случайно выбранного элемента массива
 * @param {Object} array - массив из которого нужно получить случайный элемент
 * @return {string}
 */
var getRandomArrayElement = function (array) {
  var randomArrayElement = array[getRandomNumber(0, array.length - 1)];
  return randomArrayElement;
};

/**
 *Возвращает массив случайной длины
 * @param {Object} array - массив с элементами
 * @param {number} arrayLength - длина массива
 * @return {Object}
 */
var getArrayWithRandomLength = function (array, arrayLength) {
  return array.slice(0, getRandomNumber(0, arrayLength));
};

/**
 * Возвращает объект offer со случайно полученными значениями свойств
 * @return {Object}
 */
var generateRandomOffer = function () {
  var objectOffer = {};
  objectOffer.title = 'Заголовок предложения';
  objectOffer.address = getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION) + ', ' + getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION);
  objectOffer.price = getRandomNumber(MIN_PRICE, MAX_PRICE);
  objectOffer.type = getRandomArrayElement(buildings);
  objectOffer.rooms = getRandomNumber(MIN_ROOMS, MAX_ROOMS);
  objectOffer.guests = getRandomNumber(MIN_GUESTS, MAX_GUESTS);
  objectOffer.checkin = getRandomArrayElement(checkin);
  objectOffer.checkout = getRandomArrayElement(checkin);
  objectOffer.features = getArrayWithRandomLength(features, features.length);
  objectOffer.description = 'Описание';
  objectOffer.photos = getArrayWithRandomLength(photos, photos.length);
  return objectOffer;
};

/**
* Возвращает объект location со свойствaми координат x и y, cлучайно сгенерированые.
* @return {Object}
*/
var generateLocationObject = function () {
  var location = {};
  location.x = getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION);
  location.y = getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION);
  return location;
};

/**
 * Возвращает объект с рандомными свойствами
 *@param {number} index - индекс для значения адреса аватарки
 * @return {Object}
 */
var generateRandomObject = function (index) {
  var randomObject = {};
  randomObject.author = generateAuthorObject(index);
  randomObject.offer = generateRandomOffer();
  randomObject.location = generateLocationObject();
  return randomObject;
};

/**
 * Возвращает массив объектов заданной длины
 * @param {number} quantity - количесвто объектов в массиве
 * @return {Object}
 */
var createArrayObjects = function (quantity) {
  var arrayObjects = [];
  for (var i = 0; i < quantity; i++) {
    arrayObjects.push(generateRandomObject(i));
  }
  return arrayObjects;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var templateObject = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

/**
 * Возвращает разметку метки добавляя в нее свойства полученного объекта
 * @param {Object} resultingObject - полученный объект
 * @return {Object}
 */
var createHtmlMarkingObject = function (resultingObject) {
  var objectElement = templateObject.cloneNode(true);

  objectElement.style = 'left: ' + (resultingObject.location.x - OFFSET_X_FORPIN) + 'px; top: ' + (resultingObject.location.y - OFFSET_Y_FORPIN) + 'px;';
  objectElement.querySelector('img').src = resultingObject.author.avatar;
  objectElement.querySelector('img').alt = resultingObject.offer.title;

  return objectElement;
};

var arrayObjects = createArrayObjects(NUMBER_OF_OBJECTS);

arrayObjects.forEach(function (element) {
  fragment.appendChild(createHtmlMarkingObject(element));
});

var mapPins = document.querySelector('.map__pins');

mapPins.appendChild(fragment);

var offerTemplate = document.querySelector('#card').content;
var OfferItem = offerTemplate.querySelector('.map__card');
var placeCardAdded = document.querySelector('.map');

var createCardOffer = function (array, index) {
  var clonedOfferItem = OfferItem.cloneNode(true);
  var cardTitle = clonedOfferItem.querySelector('.popup__title');
  var buildingAddress = clonedOfferItem.querySelector('.popup__text--address');
  var checkTime = clonedOfferItem.querySelector('.popup__text--time');
  var offerDescription = clonedOfferItem.querySelector('.popup__description');
  var avatar = clonedOfferItem.querySelector('.popup__avatar');

  if (array[index].offer.title) {
    cardTitle.textContent = array[index].offer.title;
  } else {
    cardTitle.remove();
  }

  if (array[index].offer.address) {
    buildingAddress.textContent = array[index].offer.address;
  } else {
    buildingAddress.remove();
  }

  if (array[index].offer.description) {
    offerDescription.textContent = array[index].offer.description;
  } else {
    offerDescription.remove();
  }

  if (array[index].author.avatar) {
    avatar.src = array[index].author.avatar;
  } else {
    avatar.remove();
  }

  if (array[index].offer.checkin && array[index].offer.checkout) {
    checkTime.textContent = 'Заезд после ' + array[index].offer.checkin + ' выезд до ' + array[index].offer.checkout;
  } else {
    checkTime.remove();
  }

  /**
   * Возвращает элемент price с контентом
   * @return {Object}
   */
  var setOfferPrice = function () {
    var priceOffer = clonedOfferItem.querySelector('.popup__text--price');
    var HTMLCollectionPriceOffer = priceOffer.childNodes;

    if (array[index].offer.price) {
      HTMLCollectionPriceOffer[0].textContent = '';
      priceOffer.insertAdjacentText('afterbegin', array[index].offer.price + '₽');
    } else {
      priceOffer.remove();
    }

    return priceOffer;
  };

  setOfferPrice();

  /**
   * Возвращает элемент с инфомацией о количестве гостей и комнат для них
   * @return {Object}
   */

  var setGuestsAndRoomsInformation = function () {
    var guestsAndRoomsInformation = clonedOfferItem.querySelector('.popup__text--capacity');

    if (array[index].offer.rooms === 1 && array[index].offer.guests === 1) {
      guestsAndRoomsInformation.textContent = array[0].offer.rooms + ' комната для ' + array[index].offer.guests + ' гостя';
    }
    if (array[index].offer.rooms >= 2 && array[index].offer.rooms <= 4) {
      guestsAndRoomsInformation.textContent = array[0].offer.rooms + ' комнаты для ' + array[index].offer.guests + ' гостей';
    }
    if (array[index].offer.rooms >= 2 && array[index].offer.rooms <= 4 && array[index].offer.guests === 1) {
      guestsAndRoomsInformation.textContent = array[index].offer.rooms + ' комнаты для ' + array[index].offer.guests + ' гостя';
    }
    if (array[index].offer.rooms > 5) {
      guestsAndRoomsInformation.textContent = array[index].offer.rooms + ' комнат для ' + array[index].offer.guests + ' гостей';
    }
    if (array[index].offer.rooms > 5 && array[index].offer.guests === 1) {
      guestsAndRoomsInformation.textContent = array[index].offer.rooms + ' комнат для ' + array[index].offer.guests + ' гостя';
    }
    return guestsAndRoomsInformation;
  };

  setGuestsAndRoomsInformation();

  /**
   * Возвращает элемент с инфомацией о типе здания
   * @return {Object}
   */

  var setTypeBuilding = function () {
    var buildingType = clonedOfferItem.querySelector('.popup__type');

    switch (array[index].offer.type) {
      case 'flat':
        buildingType.textContent = 'Квартира';
        break;
      case 'bungalo':
        buildingType.textContent = 'Бунгало';
        break;
      case 'house':
        buildingType.textContent = 'Дом';
        break;
      case 'palace':
        buildingType.textContent = 'Дворец';
        break;
      default:
        buildingType.remove();
        break;
    }

    return buildingType;
  };

  setTypeBuilding();

  var setFeaturesBuilding = function () {
    var availableFeatures = clonedOfferItem.querySelector('.popup__features');
    var featuresFragment = document.createDocumentFragment();
    var featuresArray = array[index].offer.features;
    if (featuresArray.length) {
      for (var i = 0; i < featuresArray.length; i++) {
        var featureItem = document.createElement('li');
        featureItem.classList = 'popup__feature popup__feature--' + featuresArray[i];
        featuresFragment.appendChild(featureItem);
      }
    } else {
      availableFeatures.remove();
    }
    availableFeatures.innerHTML = '';
    availableFeatures.appendChild(featuresFragment);
    return availableFeatures;
  };

  setFeaturesBuilding();

  var setBuildingPhotos = function () {
    var photosForOffer = clonedOfferItem.querySelector('.popup__photos');
    var photoItemTemplate = photosForOffer.querySelector('img');
    var photoItem = photoItemTemplate.cloneNode();
    var photosArray = array[index].offer.photos;
    var photosFragment = document.createDocumentFragment();
    if (photosArray) {
      photosArray.forEach(function (element) {
        photoItem.src = element;
        photosFragment.appendChild(photoItem);
      });
    } else {
      photosForOffer.remove();
    }
    photoItemTemplate.remove();
    return photosForOffer.appendChild(photosFragment);
  };

  setBuildingPhotos();

  return clonedOfferItem;
};

placeCardAdded.appendChild(createCardOffer(arrayObjects, 4));
