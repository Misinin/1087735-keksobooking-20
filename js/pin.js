'use strict';

(function () {
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

    objectElement.setAttribute('data-id', indexArrayElemt);
    objectElement.style = 'left: ' +
    (resultingObject.location.x - DATA.pinOffset.X) +
    'px; top: ' + (resultingObject.location.y - DATA.pinOffset.Y) + 'px;';
    objectElement.querySelector('img').src = resultingObject.author.avatar;
    objectElement.querySelector('img').alt = resultingObject.offer.title;

    return objectElement;
  }

  window.pin = {
    /**
     * Перебирает массив объектов предложений и отображает их пинами на странице
     * @param {Object} objects - массив объектов
     * @return {Object}
     */
    renderPins: function (objects) {
      objects.forEach(function (pin, index) {

        fragment.appendChild(createHtmlMarkingObject(pin, index));
      });

      return mapPins.appendChild(fragment);
    }
  };
})();
