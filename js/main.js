'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  /**
   * Возвращает данные полученные с сервера
   * @param {Object} xhr
   */
  function responseSuccess(xhr) {
    window.main.dataPins = xhr.response;
    document.querySelector('.map__pin--main').removeEventListener('focus', window.main.downloadData);
  }

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
     * Обработчик события получения данных с сервера
     */
    downloadData: function () {
      window.backend.load(responseSuccess, function () {
        // console.error("Ошибка");
      });
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

  mainPin.addEventListener('keydown', window.main.onEnterPressMapActivation);
  mainPin.addEventListener('mouseover', window.main.downloadData);
  mainPin.addEventListener('focus', window.main.downloadData);
  mainPin.addEventListener('mouseup', window.main.onMouseClickActivateMap);
})();
