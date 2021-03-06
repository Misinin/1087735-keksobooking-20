'use strict';

(function () {
  var MAX_NUMBER_OFFERS_ON_MAP = 5;
  var DATA = window.data;
  var templateObject = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  /**
   * Возвращает разметку метки, добавляя в нее свойства полученного объекта
   * @param {Object} resultingObject - полученный объект
   * @param {number} indexArrayElemt - индекс текущего элемента массива объектов
   * @return {Object}
   */
  function createHtmlMarkingObject(resultingObject, indexArrayElemt) {
    var objectElement = templateObject.cloneNode(true);
    var img = objectElement.querySelector('img');

    objectElement.setAttribute('data-id', indexArrayElemt);
    objectElement.style = 'left: ' +
    (resultingObject.location.x - DATA.pinOffset.X) +
    'px; top: ' + (resultingObject.location.y - DATA.pinOffset.Y) + 'px;';
    img.src = (resultingObject.author.avatar === null) ? '' : resultingObject.author.avatar;
    img.alt = (resultingObject.offer.title === null) ? '' : resultingObject.offer.title;

    return objectElement;
  }

  /**
   * Перебирает массив объектов предложений и отображает их пинами на странице
   * @param {Object} objects - массив объектов
   * @return {Object}
   */
  function renderPins(objects) {
    objects = (objects.length <= MAX_NUMBER_OFFERS_ON_MAP) ? objects : objects.slice(0, MAX_NUMBER_OFFERS_ON_MAP);
    objects.forEach(function (pin, index) {

      fragment.appendChild(createHtmlMarkingObject(pin, index));
    });

    return mapPins.appendChild(fragment);
  }

  window.pin = {
    render: renderPins
  };
})();
