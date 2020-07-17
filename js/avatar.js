'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var PhotoAtribute = {
    ALT: 'Фото жилья',
    WIDTH: '70px',
    HEIGHT: '70px'
  };

  var adForm = document.querySelector('.ad-form');
  var avatarChooser = adForm.querySelector('#avatar');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var photosChoose = adForm.querySelector('#images');
  var photosPreview = adForm.querySelector('.ad-form__photo');

  function loaderImage(fileInput, preview) {
    var file = fileInput.files[0];
    var fileName = file.name.toLowerCase();

    var mathes = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (mathes) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  }

  function onAvatarChange() {
    loaderImage(avatarChooser, avatarPreview);
  }

  function createPreview() {
    var photoElement = document.createElement('img');
    photoElement.alt = PhotoAtribute.ALT;
    photoElement.style.width = PhotoAtribute.WIDTH;
    photoElement.style.height = PhotoAtribute.HEIGHT;

    return photoElement;
  }

  function onPhotoChange() {
    var preview = createPreview();
    photosPreview.appendChild(preview);

    loaderImage(photosChoose, preview);
  }

  function removePictures() {
    avatarPreview.src = DEFAULT_AVATAR;
    photosPreview.innerHTML = '';
  }

  avatarChooser.addEventListener('change', onAvatarChange);
  photosChoose.addEventListener('change', onPhotoChange);

  window.avatar = {
    removePictures: removePictures
  };
})();
