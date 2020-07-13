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
    },
    /**
     * Возвращает корректную форму множественного числа. Функция применима только
     * для целых чисел.
     * @param {number} number - число, для вычисляется формы записи наименования
     * @param {Object} forms - формы слова для разных наименований
     * @return {string} форма множественного числа наименования
     */
    getCorrectWord: function (number, forms) {
      var mod10 = number % 10;
      var mod100 = number % 100;

      switch (true) {
        case (mod100 >= 11 && mod100 <= 20):
          return forms[2];

        case (mod10 > 5):
          return forms[2];

        case (mod10 >= 2 && mod10 <= 4):
          return forms[1];

        case (mod10 === 1):
          return forms[0];

        default:
          return forms[2];
      }
    },
    /**
     *Устанавливает логическое значение атрибуту disabled
     * @param {Object} fildsetArray - массив fildset'ов
     * @param {boolean} state - логическое состояние атрибута disabled
     */
    setBooleanValueAttributeFieldset: function (fildsetArray, state) {
      fildsetArray.forEach(function (itemFieldset) {
        itemFieldset.disabled = state;
      });
    }
  };
})();
