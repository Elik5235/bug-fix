import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useField } from 'formik';

const ImageUpload = (props) => {
  const [{ value, ...restField }, meta, helpers] = useField(props.name);
  const { uploadContainer, inputContainer, imgStyle } = props.classes;

  useEffect(() => {
    // Очищаем URL объекта, когда компонент размонтируется или когда значение изменяется
    return () => {
      if (value && typeof value !== 'string') {
        URL.revokeObjectURL(value.preview);
      }
    };
  }, [value]);

  const onChange = (e) => {
    let file = e.target.files[0];
    const node = window.document.getElementById('imagePreview');

    if (!file) {
      helpers.setValue(null, false);
      node.src = ''; // Очищаем предварительный просмотр, если файл не выбран
      return;
    }

    const imageType = /image.*/;
    if (!file.type?.match(imageType)) {
      e.target.value = '';
      helpers.setValue(null, false);
      node.src = ''; // Очищаем предварительный просмотр, если файл не является изображением
      return;
    }

    // Создаем URL объекта для предварительного просмотра
    file.preview = URL.createObjectURL(file);
    helpers.setValue(file, false);
    node.src = file.preview; // Устанавливаем src для предварительного просмотра
  };

  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          {...restField}
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={onChange}  
        />
        <label htmlFor="fileInput">Choose file</label>
      </div>
      <img
        id="imagePreview"
        className={classNames({ [imgStyle]: !!value })}
        alt="user"
      />
    </div>
  );
};

export default ImageUpload;
