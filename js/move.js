'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPosition = map.getBoundingClientRect();
  var addressField = document.querySelector('#address');
  var pinHandle = document.querySelector('.map__pin--main');
  var mainPin = document.querySelector('.map__pin--main');
  var MainPinOffset = {
    X: 32,
    Y: 82
  };
  var offsetPin = {
    MIN_Y: 130,
    MAX_Y: 630,
    MIN_X: 0,
    MAX_X: map.offsetWidth
  };

  var startCoordMainPin = {};

  function getMainPinStartCoords() {
    startCoordMainPin.x = mainPin.style.left;
    startCoordMainPin.y = mainPin.style.top;
  }

  getMainPinStartCoords();

  /**
   * Возвращает координаты элемента относительно документа
   * @param {Object} elem - вычисляемый элемент
   * @return {Object}
   */
  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      left: box.left + pageXOffset,
      top: box.top + pageYOffset
    };
  }

  /**
   * Возвращает координаты пина с заданным значением смещения
   * @param {Object} pinType - пин
   * @param {number} pinOffsetX - смещение пина по оси X
   * @param {number} pinOffsetY - смещение пина по оси Y
   * @return {string}
   */
  function getAddressValue(pinType, pinOffsetX, pinOffsetY) {
    return {
      x: Math.round(getCoords(pinType).left + pinOffsetX),
      y: Math.round(getCoords(pinType).top + pinOffsetY)
    };
  }

  /**
   * Обработчик перемещения пина
   * @param {Object} evt
   */
  function onMainPinMove(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentX = pinHandle.offsetLeft + MainPinOffset.X;
      var currentY = pinHandle.offsetTop + MainPinOffset.Y;

      if (currentX >= offsetPin.MIN_X && currentX <= offsetPin.MAX_X) {
        pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';
      } else if (currentX <= offsetPin.MIN_X) {
        pinHandle.style.left = offsetPin.MIN_X - MainPinOffset.X + 'px';
      } else if (currentX > offsetPin.MAX_X) {
        pinHandle.style.left = offsetPin.MAX_X - MainPinOffset.X + 'px';
      }

      if (currentY >= offsetPin.MIN_Y && currentY <= offsetPin.MAX_Y) {
        pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
      } else if (currentY < offsetPin.MIN_Y) {
        pinHandle.style.top = offsetPin.MIN_Y - MainPinOffset.Y + 'px';
      } else if (currentY > offsetPin.MAX_Y) {
        pinHandle.style.top = offsetPin.MAX_Y - MainPinOffset.Y + 'px';
      }

      var currentCoords = getAddressValue(pinHandle, (MainPinOffset.X - mapPosition.left), MainPinOffset.Y);
      addressField.value = currentCoords.x + ', ' + currentCoords.y;
    }

    function onMouseup(upEvet) {
      upEvet.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseup);
      mainPin.addEventListener('mousedown', onMainPinMove);
    }

    document.addEventListener('mouseup', onMouseup);
  }

  /**
   * Устанавливает начальные координаты главному пину
   */
  function setStartPositionMainPin() {
    mainPin.style.left = startCoordMainPin.x;
    mainPin.style.top = startCoordMainPin.y;
  }

  window.move = {
    pin: onMainPinMove,
    getAddressValue: getAddressValue,
    start: setStartPositionMainPin
  };
})();
