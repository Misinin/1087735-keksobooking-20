'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPosition = map.getBoundingClientRect();
  var addressField = document.querySelector('#address');
  var pinHandle = document.querySelector('.map__pin--main');
  var MainPinOffset = {
    X: 40,
    Y: 82
  };
  var offsetPin = {
    MIN_Y: 130,
    MAX_Y: 630,
    MIN_X: 0,
    MAX_X: map.offsetWidth
  };

  window.move = {
    onMainPinMove: function (evt) {
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

        addressField.value = window.form.getAddressValue(pinHandle, (MainPinOffset.X - mapPosition.left), MainPinOffset.Y);
      }

      function onMouseup(upEvet) {
        upEvet.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseup);
      }

      document.addEventListener('mouseup', onMouseup);
    }
  };
})();
