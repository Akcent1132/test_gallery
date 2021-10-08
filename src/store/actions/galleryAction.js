import { ADD_IMAGES_ARRAY, DELETE_IMAGE, ADD_IMAGE,SET_CALC_RESULT } from '../type';
import store from '../index';

import { newErrorAction } from './errorAction';
import { rowNormalHeight } from '../../consts';


export const calcGallery = () =>{

  const gallery = store.getState().galleryReducer.galleryImages;

  const galleryWidth = Math.ceil(document.body.scrollWidth);

  const cardsArr = [];
  const rowsArr = [];
  let rowNumber = 0;
  let rowWidth = 0;

  gallery.forEach((image, index) => {
    const cardNormalWidth = (rowNormalHeight / image.height) * image.width;

    if (rowWidth + cardNormalWidth > galleryWidth) {
      rowNumber++;
      rowWidth = cardNormalWidth;
    } else {
      rowWidth = rowWidth + cardNormalWidth;
    }

    cardsArr[index] = {
      index,
      cardNormalWidth,
      rowNumber,
    };

    rowsArr[rowNumber] = Math.ceil(rowWidth);
  });

  return {
    type: SET_CALC_RESULT,
    payload: { galleryWidth, cardsArr, rowsArr },
  };



}

const deleteImageAction = (deleteIndex) => ({ type: DELETE_IMAGE, payload: deleteIndex });

const addImageAction = (image) => ({ type: ADD_IMAGE, payload: image });

const addImagesFromArrayAction = (imagesArray) => ({
  type: ADD_IMAGES_ARRAY,
  payload: imagesArray,
});

export const handleDeleteImageAction = (deleteIndex,width) => (dispatch) => {
  dispatch(deleteImageAction(deleteIndex));
  dispatch(calcGallery(width));
};

export const addImageFromUrlAction = (url) => (dispatch) => {
  const galleryWidth = store.getState().galleryReducer.galleryWidth;
  const newImage = new Image();
  newImage.src = url;
  newImage.onload = () => {
    dispatch(addImageAction({ url, height: newImage.height, width: newImage.width }));
    dispatch(calcGallery(galleryWidth));
  };
  newImage.onerror = () => {
    dispatch(newErrorAction(`Error on image loading on url: ${url}`));
  };
};

export const addInit = (photos) => (dispatch) =>{
      dispatch(addImagesFromArrayAction(photos.galleryImages));
}

export const addImagesFromDropAction = (files) => (dispatch) => {
const galleryWidth = store.getState().galleryReducer.galleryWidth;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type.startsWith('image/')) {
      const image = new Image();

      const reader = new FileReader();
      reader.onload = () => (image.src = reader.result);
      reader.readAsDataURL(file);

      image.onload = () => {
        dispatch(addImageAction({ url: image.src, height: image.height, width: image.width }));
        dispatch(calcGallery(galleryWidth));
      };
    } else if (file.type === 'application/json') {
      file
        .text()
        .then((text) => JSON.parse(text))
        .then((data) => {
          if (data.galleryImages) {
            dispatch(addImagesFromArrayAction(data.galleryImages));
            dispatch(calcGallery(galleryWidth));
          } else {
            dispatch(
              newErrorAction(
                'Not supported file data. Json file should contain "galleryImages" array'
              )
            );
          }
        })
        .catch((error) => {
          dispatch(newErrorAction(`Error in json file parsing: ${error}`));
        });
    } else {
      dispatch(newErrorAction(`${file.name} - file type is not supported`));
    }
  }
};

export const addImagesFromJsonFileAction = (jsonUrl) => (dispatch) => {
  const galleryWidth = store.getState().galleryReducer.galleryWidth;
  fetch(jsonUrl)
    .then((response) => {
      if (!response.ok) {
        const error = new Error();
        error.response = response;
        throw error;
      }
      return response.text();
    })
    .then((text) => {
      if (text !== '') {
        const data = JSON.parse(text);
        if (data.galleryImages) {
          dispatch(addImagesFromArrayAction(data.galleryImages));
          dispatch(calcGallery(galleryWidth));
        } else {
          dispatch(
            newErrorAction(
              'Not supported file data. Json file should contain "galleryImages" array'
            )
          );
        }
      } else {
        dispatch(newErrorAction('Emty file data. Json file should contain "galleryImages" array'));
      }
    })
    .catch((error) => {
      dispatch(newErrorAction(`Error in fetch: ${error}`));
    });
};
