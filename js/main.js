'use strict';

var buildings = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var indexesAvatars = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 * Выбирает первый элемент из массива, возвращает его и удаляет
 * @param {Object} arr - массив значений номеров аватарки
 * @returns {number}
 */

var getElementAndDelete = function (arr) {
  var number = arr[0];
  arr.shift();
  return number;
};

/**
 * Возвращает случайное число, максимум и минимум включаются
 * @param {number} min - минимальное значение числа
 * @param {number} max - максимальное значение числа
 * @returns {number}
 */

var getRundomNumber = function (min, max) {
  var rundomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return rundomNumber;
};

/**
 * Возвращает объект со свойством avatar, адрес которого случайно сгенерирован.
 * @returns {Object}
 */

var generateAuthorObject = function () {
  var author = {};
  author.avatar = 'img/avatars/user0' + getElementAndDelete(indexesAvatars) + '.png';
  return author;
};

/**
 * Возвращает значение случайно выбранного элемента массива
 * @param {Object} array - массив из которого нужно получить случайный элемент
 * @returns {string}
 */

var getRundomArrayElement = function (array) {
  var rundomArrayElement = array[getRundomNumber(0, array.length - 1)];
  return rundomArrayElement;
};

/**
 *Возвращает массив случайной длины
 * @param {Object} array - массив с элементами
 * @param {number} arrayLength - длина массива
 * @returns {Object}
 */

var getArrayWithRandomLength = function (array) {
  var arrayWithRandomLength = [];
  for (var i = 0; i <= getRundomNumber(0, array.length); i++) {
    arrayWithRandomLength.push(array[i]);
  }
  return arrayWithRandomLength;
};

/**
 * Возвращает объект offer со случайно полученными значениями свойств
 * @returns {Object}
 */

var generateRandomOffer = function () {
  var objectOffer = {};
  objectOffer.title = 'Заголовок предложения';
  objectOffer.adress = getRundomNumber(10, 600) + ', ' + getRundomNumber(10, 600);
  objectOffer.price = getRundomNumber(1000, 6000);
  objectOffer.type = getRundomArrayElement(buildings);
  objectOffer.rooms = getRundomNumber(1, 8);
  objectOffer.guests = getRundomNumber(1, 10);
  objectOffer.checkin = getRundomArrayElement(checkin);
  objectOffer.checkout = getRundomArrayElement(checkout);
  objectOffer.features = getArrayWithRandomLength(features, features.length);
  objectOffer.description = 'Описание';
  objectOffer.photos = getArrayWithRandomLength(photos, photos.length);
  return objectOffer;
};

/**
* Возвращает объект location со свойствaми координат x и y, cлучайно сгенерированые.
* @returns {Object}
*/

var generateLocationObject = function () {
  var location = {};
  location.x = getRundomNumber(130, 800);
  location.y = getRundomNumber(130, 630);
  return location;
};

/**
 * Возвращает объект с рандомными свойствами
 * @returns {Object}
 */

var generateRundomObject = function () {
  var rundomObject = {};
  rundomObject.author = generateAuthorObject();
  rundomObject.offer = generateRandomOffer();
  rundomObject.location = generateLocationObject();
  return rundomObject;
};

/**
 * Возвращает массив объектов заданной длины
 * @param {number} quantity - количесвто объектов в массиве
 * @returns {Object}
 */

var createArrayObjects = function (quantity) {
  var arrayObjects = [];
  for (var i = 0; i < quantity; i++) {
    arrayObjects.push(generateRundomObject());
  }
  return arrayObjects;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var templateObject = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var OFFSET_X_FORPIN = 25;
var OFFSET_Y_FORPIN = 70;

/**
 * Возвращает разметку метки добавляя в нее свойства полученного объекта
 * @param {Object} resultingObject - полученный объект
 * @returns {Object}
 */

var createHtmlMarkingObject = function (resultingObject) {
  var objectElement = templateObject.cloneNode(true);

  objectElement.style = 'left: ' + (resultingObject.location.x - OFFSET_X_FORPIN) + 'px; top: ' + (resultingObject.location.y - OFFSET_Y_FORPIN) + 'px;';
  objectElement.querySelector('img').src = resultingObject.author.avatar;
  objectElement.querySelector('img').alt = resultingObject.offer.title;

  return objectElement;
};

createArrayObjects(8).forEach(function (element) {
  fragment.appendChild(createHtmlMarkingObject(element));
});

var mapPins = document.querySelector('.map__pins');

mapPins.appendChild(fragment);
