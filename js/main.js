'use strict';

var Locations = {
  MIN_Y_LOCATION: 130,
  MAX_Y_LOCATION: 630,
  MIN_X_LOCATION: 0,
  MAX_X_LOCATION: 1200
};
var MIN_PRICE = 1000;
var MAX_PRICE = 10000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 8;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var OFFSET_X_FORPIN = 25;
var OFFSET_Y_FORPIN = 70;
var NUMBER_OF_OBJECTS = 8;
var Types = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало'
};
var CHECKIN_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher',
  'parking', 'washer',
  'elevator', 'conditioner'];
var PHOTOS = [
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
function getRandomNumber(min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

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
 * Возвращает значение случайно выбранного элемента массива
 * @param {Object} selectedArray - массив из которого нужно получить
 *                                 случайный элемент
 * @return {string}
 */
function getRandomArrayElement(selectedArray) {
  return selectedArray[getRandomNumber(0, selectedArray.length - 1)];
}

/**
 *Возвращает массив случайной длины
 * @param {Object} arrayToProcess - Обрабатываемый массив
 * @param {number} arrayLength - длина массива
 * @return {Object}
 */
function getArrayWithRandomLength(arrayToProcess, arrayLength) {
  return arrayToProcess.slice(0, getRandomNumber(0, arrayLength));
}

/**
 * Возвращает объект offer со случайно полученными значениями свойств
 * @return {Object}
 */
function generateRandomOffer() {
  return {
    title: 'Заголовок предложения',
    address: getRandomNumber(Locations.MIN_X_LOCATION, Locations.MAX_X_LOCATION)
    + ', ' + getRandomNumber(Locations.MIN_Y_LOCATION, Locations.MAX_Y_LOCATION),
    price: getRandomNumber(MIN_PRICE, MAX_PRICE),
    type: getRandomArrayElement(Object.keys(Types)),
    rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
    guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
    checkin: getRandomArrayElement(CHECKIN_OUT),
    checkout: getRandomArrayElement(CHECKIN_OUT),
    features: getArrayWithRandomLength(FEATURES, FEATURES.length),
    description: 'Описание',
    photos: getArrayWithRandomLength(PHOTOS, PHOTOS.length)
  };
}

/**
* Возвращает объект location со свойствaми координат x и y,
  cлучайно сгенерированые.
* @return {Object}
*/
function generateLocationObject() {
  return {
    x: getRandomNumber(Locations.MIN_X_LOCATION, Locations.MAX_X_LOCATION),
    y: getRandomNumber(Locations.MIN_Y_LOCATION, Locations.MAX_Y_LOCATION)
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

// var map = document.querySelector('.map');
var templateObject = document.querySelector('#pin').content
                    .querySelector('.map__pin');
var fragment = document.createDocumentFragment();

/**
 * Возвращает разметку метки, добавляя в нее свойства полученного объекта
 * @param {Object} resultingObject - полученный объект
 * @return {Object}
 */
function createHtmlMarkingObject(resultingObject) {
  var objectElement = templateObject.cloneNode(true);

  objectElement.style = 'left: ' +
  (resultingObject.location.x - OFFSET_X_FORPIN) +
  'px; top: ' + (resultingObject.location.y - OFFSET_Y_FORPIN) + 'px;';
  objectElement.querySelector('img').src = resultingObject.author.avatar;
  objectElement.querySelector('img').alt = resultingObject.offer.title;

  return objectElement;
}

var adObjects = generateObjects(NUMBER_OF_OBJECTS);

/**
 * Перебирает массив сгенерированных объектов предложений и отображает их пинами
 * на странице
 * @return {Object}
 */
function renderPins() {
  adObjects.forEach(function (pin) {
    fragment.appendChild(createHtmlMarkingObject(pin));
  });

  var mapPins = document.querySelector('.map__pins');

  return mapPins.appendChild(fragment);
}

renderPins();

var offerTemplate = document.querySelector('#card').content;
var offerItem = offerTemplate.querySelector('.map__card');
var placeCardAdded = document.querySelector('.map');

/**
 * Наполняет контентом шаблон карточки предложения, отрисовывает ее и возвращает
 * @param {Object} objectOffer
 * @return {Object}
 */
function renderCardOffer(objectOffer) {
  var clonedOfferItem = offerItem.cloneNode(true);
  clonedOfferItem.querySelector('.popup__title').textContent = objectOffer
                                                              .offer
                                                              .title;
  clonedOfferItem.querySelector('.popup__text--address').textContent = objectOffer
                                                                      .offer
                                                                      .address;
  clonedOfferItem.querySelector('.popup__text--time').textContent = 'Заезд после ' +
  objectOffer.offer.checkin + ' выезд до ' + objectOffer.offer.checkout;
  clonedOfferItem.querySelector('.popup__description').textContent = objectOffer
                                                                     .offer
                                                                     .description;
  clonedOfferItem.querySelector('.popup__avatar').src = objectOffer.author.avatar;
  clearFieldOfferPrice();
  clonedOfferItem.querySelector('.popup__text--price').
                insertAdjacentText('afterbegin', objectOffer.offer.price + '₽');
  var rooms = objectOffer.offer.rooms;
  var guests = objectOffer.offer.guests;
  clonedOfferItem.querySelector('.popup__text--capacity').textContent =
  rooms +
  getPluralForm(rooms, 'комнатa', 'комнаты', 'комнат') + 'для ' + guests +
  getPluralForm(guests, 'комнатa', 'комнаты', 'комнат');
  clearFieldFeatures();
  clonedOfferItem.querySelector('.popup__features')
    .appendChild(createFeaturesFragment());
  clonedOfferItem.querySelector('.popup__photos').appendChild(createBuildingPhotosFragment());

  // /**
  //  * Проверяет наличие контента в поле, при его отсутствии удалет поле
  //  * @param {string} field
  //  */
  // function isFieldEmpty (field) {
  //   if (field === false) {
  //     field.remove();
  //   }
  // }

  /**
   * Убирает шаблонное значение цены предложения
   */
  function clearFieldOfferPrice() {
    var priceOffer = clonedOfferItem.querySelector('.popup__text--price');
    var hTMLCollectionPriceOffer = priceOffer.childNodes;
    hTMLCollectionPriceOffer[0].textContent = '';
  }

  /**
   * Возвращает корректную форму множественного числа. Функция применима только
   * для целых чисел.
   * @param {number} number - число, для вычисляется формы записи наименования
   * @param {string} one - форма наименования единственного числа
   * @param {string} two - форма наименования множественного числа 2,3,4
   * @param {string} many - форма наименования множественного остальные числа
   * @return {string} форма множественного числа наименования
   */
  function getPluralForm(number, one, two, many) {
    var mod10 = number % 10;
    var mod100 = number % 100;

    switch (true) {
      case (mod100 >= 11 && mod100 <= 20):
        return many;

      case (mod10 > 5):
        return many;

      case (mod10 >= 2 && mod10 <= 4):
        return two;

      case (mod10 === 1):
        return one;

      default:
        return many;
    }
  }
  /**
   * Очищает поле features
   */
  function clearFieldFeatures() {
    clonedOfferItem.querySelector('.popup__features').innerHTML = '';
  }

  /**
   * Созадет фрагмент разметки features и возвращает его
   * @return {Object}
   */
  function createFeaturesFragment() {
    var featuresFragment = document.createDocumentFragment();
    var featuresArray = objectOffer.offer.features;
    for (var i = 0; i < featuresArray.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.classList = 'popup__feature popup__feature--' + featuresArray[i];
      featuresFragment.appendChild(featureItem);
    }

    return featuresFragment;
  }

  /**
   * Созадет фрагмент фотографий здания и возвращает его
   * @return {Object}
   */
  function createBuildingPhotosFragment() {
    var photosForOffer = clonedOfferItem.querySelector('.popup__photos');
    var photoItemTemplate = photosForOffer.querySelector('img');
    var photoItem = photoItemTemplate.cloneNode();
    var photosArray = objectOffer.offer.photos;
    var photosFragment = document.createDocumentFragment();
    photosArray.forEach(function (element) {
      photoItem.src = element;
      photosFragment.appendChild(photoItem);
    });
    photoItemTemplate.remove();
    return photosFragment;
  }

  return clonedOfferItem;
}

placeCardAdded.appendChild(renderCardOffer(adObjects[0]));

setActivateOrDisabledFormElements((document.querySelector('.ad-form')), true);
setActivateOrDisabledFormElements((document.querySelector('.map__filters')), true);
document.querySelector('.map__pin--main').tabIndex = '0';

document.querySelector('.map__pin--main').addEventListener('keydown', function (evt) {
  isKeyPress(evt, 'Enter', pageActivation);
});

document.querySelector('.map__pin--main').addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    pageActivation();
    setValueAddressField();
  }
});

/**
 * Выполняет проверку нажатия клавиши и запускает переданную функцию
 * @param {Object} evt - объект события
 * @param {string} key - проверяемая клавиша
 * @param {Object} selectedFunction - вызываемая функция
 */
function isKeyPress(evt, key, selectedFunction) {
  if (evt.key === key) {
    selectedFunction();
  }
}

/**
 *Устанавливает логическое значение атрибуту disabled всем элементам формы
 * @param {Object} pseudoArrayParent - родительский элемент псевдо-массива формы
 * @param {boolean} state - логическое состояние атрибута disabled элемента формы
 */
function setActivateOrDisabledFormElements(pseudoArrayParent, state) {
  pseudoArrayParent.childNodes.forEach(function (formElement) {
    formElement.disabled = state;
  }
  );
}

/**
 * Устанавливает значение поля ввода адреса и устанавливает ему режим - только
 * для чтения
 */
function setValueAddressField() {
  document.querySelector('.map__pin--main').addEventListener('mouseup', function (evt) {
    document.querySelector('#address').value = (evt.pageX - OFFSET_X_FORPIN) + ', ' +
    (evt.pageX - OFFSET_Y_FORPIN);
    document.querySelector('#address').readOnly = true;
  });
}

var MinimumPrices = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

/**
 * Устанавливает минимальное значение поля 'Цена за ночь' в зависимости от
 * выбранного типа жилья
 */
function setPriceOfBuilding() {
  var buildingPrice = document.querySelector('#price');
  var typeBuilding = document.querySelector('#type').value;

  buildingPrice.min = MinimumPrices[typeBuilding];
  buildingPrice.placeholder = MinimumPrices[typeBuilding];
}

// var roomNumberSelect = document.querySelector('#room_number');
// var capacityBuildingSelect = document.querySelector('#capacity');
// var RoomsFeatures = {
//   1: [1],
//   2: [1, 2],
//   3: [1, 2, 3],
//   100: [0]
// };

// function validationRoomsSelect() {
//   selectRoomsValue = roomNumberSelect.value;
//   selectGuestValue = capacityBuildingSelect.value;
//   var validityMessage = '';
// }

var timeFields = document.querySelector('.ad-form__element--time');

/**
* Выполняет выбор поля option соседнего selecta, в зависимости от выбранного
* ранее
* @param {Object} evt - объект события
*/
function selectCheckInOutValue(evt) {
  var indexOfSelectedItem = evt.target.selectedIndex;
  var selectFields = timeFields.querySelectorAll('select');
  selectFields.forEach(function (selectItem) {
    selectItem.selectedIndex = indexOfSelectedItem;
  });
}

/**
 * Переводит страницу в активное состояние
 */
function pageActivation() {
  setActivateOrDisabledFormElements((document.querySelector('.ad-form')), false);
  setActivateOrDisabledFormElements((document.querySelector('.map__filters')), false);
  document.querySelector('.ad-form').action = 'https://javascript.pages.academy/keksobooking';
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.map__filters').style.opacity = 1;
  document.querySelector('#type').addEventListener('change', setPriceOfBuilding);
  timeFields.addEventListener('change', selectCheckInOutValue);
}
