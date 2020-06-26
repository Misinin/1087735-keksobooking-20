'use strict';

(function () {
  window.main = {
    /**
    * Активирует карту предложений, если по главному пину нажата левая кнопка мыши
    * @param {Object} evt
    */
    onMouseClickActivateMap: function (evt) {
      if (evt.which === 1) {
        window.activation.setPageActivate();
      }
    },
    /**
    * Выполняет проверку нажатия клавиши и запускает переданную функцию
    * @param {Object} evt - объект события
    * @param {string} key - проверяемая клавиша
    * @param {Object} selectedFunction - вызываемая функция
    */
    onEnterPressMapActivation: function (evt) {
      if (evt.key === 'Enter') {
        window.activation.setPageActivate();
      }
    }
  };

  document.querySelector('.map__pin--main').addEventListener('keydown', window.main.onEnterPressMapActivation);
  document.querySelector('.map__pin--main').addEventListener('mousedown', window.main.onMouseClickActivateMap);
})();
