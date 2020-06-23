'use strict';
/**
 * Модуль вспомогательных функций
 */
(function () {
  window.util = {
  /**
     * Возвращает случайное число, максимум и минимум включаются
     * @param {number} min - минимальное значение числа
     * @param {number} max - максимальное значение числа
     * @return {number}
   */
    getRandomNumber: function (min, max) {
      var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomNumber;
    },
    /**
      * Возвращает значение случайно выбранного элемента массива
      * @param {Object} selectedArray - массив из которого нужно получить случайный элемент
      * @return {string}
    */
    getRandomArrayElement: function (selectedArray) {
      return selectedArray[this.getRandomNumber(0, selectedArray.length - 1)];
    },
    /**
    *Возвращает массив случайной длины
    * @param {Object} arrayToProcess - Обрабатываемый массив
    * @param {number} arrayLength - длина массива
    * @return {Object}
    */
    getArrayWithRandomLength: function (arrayToProcess, arrayLength) {
      return arrayToProcess.slice(0, this.getRandomNumber(0, arrayLength));
    }
  };
})();
