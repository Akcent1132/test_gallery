import { ADD_IMAGE, ADD_IMAGES_ARRAY, DELETE_IMAGE,SET_CALC_RESULT } from '../type';

const stateStore = {
    galleryImages: [],
    galeryWidth: window.innerWidth,
    cardsArr: [],
    rowsArr: [],
};


const galleryReducer = (state = stateStore, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return { ...state, galleryImages: [...state.galleryImages, action.payload] };
      case SET_CALC_RESULT:
        return { ...state, ...action.payload };
    case ADD_IMAGES_ARRAY:
      return {
        ...state,
        galleryImages: [...state.galleryImages, ...action.payload],
      };

    case DELETE_IMAGE:
      const galery = state.galleryImages.filter((image, index) => index !== action.payload);
      return { ...state, galleryImages: galery };

    default:
      return state;
  }
};

export default galleryReducer;
