'use strict';

(function () {
  var UTIL = window.util;

  var Сoordinate = {
    MIN_Y: 130,
    MAX_Y: 630,
    MIN_X: 0,
    MAX_X: 1200
  };

  var Price = {
    MIN: 1000,
    MAX: 10000
  };

  var Room = {
    MIN: 1,
    MAX: 8
  };

  var Guest = {
    MIN: 1,
    MAX: 10
  };

  var PinOffset = {
    X: 25,
    Y: 70
  };

  var NUMBER_OF_OBJECTS = 5;

  var Type = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var CHECKIN_OUT = ['12:00', '13:00', '14:00'];

  var FEATURES = [
    'wifi', 'dishwasher',
    'parking', 'washer',
    'elevator', 'conditioner'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var wordForms = {
    room: ['комнатa', 'комнаты', 'комнат'],
    guest: ['гость', 'гостя', 'гостей']
  };

  /**
  * Возвращает объект со свойством avatar, адрес которого случайно сгенерирован.
  * @param {number} index -индекс для значения адреса аватарки
  * @return {Object}
  */
  function generateAuthorObject(index) {
    return {
      avatar: 'img/avatars/user0' + (index + 1) + '.png',
    };
  }

  /**
  * Возвращает объект offer со случайно полученными значениями свойств
  * @return {Object}
  */
  function generateRandomOffer() {
    return {
      title: 'Заголовок предложения',
      address: UTIL.getRandomNumber(Сoordinate.MIN_X, Сoordinate.MAX_X)
      + ', ' + UTIL.getRandomNumber(Сoordinate.MIN_Y, Сoordinate.MAX_Y),
      price: UTIL.getRandomNumber(Price.MIN, Price.MAX),
      type: UTIL.getRandomArrayElement(Object.keys(Type)),
      rooms: UTIL.getRandomNumber(Room.MIN, Room.MAX),
      guests: UTIL.getRandomNumber(Guest.MIN, Guest.MAX),
      checkin: UTIL.getRandomArrayElement(CHECKIN_OUT),
      checkout: UTIL.getRandomArrayElement(CHECKIN_OUT),
      features: UTIL.getArrayWithRandomLength(FEATURES, FEATURES.length),
      description: 'Описание',
      photos: UTIL.getArrayWithRandomLength(PHOTOS, PHOTOS.length)
    };
  }

  /**
  * Возвращает объект location со свойствaми координат x и y
  * @return {Object}
  */
  function generateLocationObject() {
    return {
      x: UTIL.getRandomNumber(Сoordinate.MIN_X, Сoordinate.MAX_X),
      y: UTIL.getRandomNumber(Сoordinate.MIN_Y, Сoordinate.MAX_Y)
    };
  }

  /**
  * Возвращает объект предложения с рандомными свойствами
  * @param {number} index - индекс для значения адреса аватарки
  * @return {Object}
  */
  function generateRandomObject(index) {
    return {
      author: generateAuthorObject(index),
      offer: generateRandomOffer(),
      location: generateLocationObject(),
    };
  }

  /**
  * Возвращает массив заданной длины, элементы массива объекты предложения
  * @param {number} quantity - количесвто объектов в массиве
  * @return {Object}
  */
  function generateObjects(quantity) {
    var Objects = [];
    for (var i = 0; i < quantity; i++) {
      Objects.push(generateRandomObject(i));
    }
    return Objects;
  }

  /**
  * Массив объектов предложений
  */
  var adObjects = generateObjects(NUMBER_OF_OBJECTS);

  window.data = {
    pinOffset: PinOffset,
    wordForms: wordForms,
    getRandomObjects: adObjects,
  };
})();
