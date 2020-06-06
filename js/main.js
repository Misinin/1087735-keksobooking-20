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
 * Возвращает массив от 1 до максимального значения по возрастанию, максимальное значение задается
 * @param {number} maxIndexValue - максимальное значение в массиве
 * @return {Object}
 */
var getIndexesAvatars = function (maxIndexValue) {
  var arrayIndexes = [];
  for (var i = 1; i <= maxIndexValue; i++) {
    arrayIndexes.push(i);
  }
  return arrayIndexes;
};

/**
 * Выбирает первый элемент из массива, возвращает его и удаляет
 * @param {Object} arr - массив значений номеров аватарки
 * @return {number}
 */
var getElementAndDelete = function (arr) {
  var number = arr.shift();
  return number;
};

var avatarIndexes = getIndexesAvatars(NUMBER_OF_OBJECTS);

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
 * @return {Object}
 */
var generateAuthorObject = function () {
  var author = {};
  author.avatar = 'img/avatars/user0' + getElementAndDelete(avatarIndexes) + '.png';
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
var getArrayWithRandomLength = function (array) {
  return array.slice(0, getRandomNumber(0, array.length));
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
 * @return {Object}
 */
var generateRandomObject = function () {
  var randomObject = {};
  randomObject.author = generateAuthorObject();
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
    arrayObjects.push(generateRandomObject());
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
