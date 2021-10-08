import React, { useState , useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {addImagesFromDropAction,calcGallery} from './store/actions/galleryAction';

import ErrorAlert from './components/ErrorAlert';
import Gallery from './components/Gallery';
import Loader from './components/Loader';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();

const [dropfileClass, setDropfileClass] = useState('App');



const handleDragEnter = (event) => {
  event.preventDefault();
  event.stopPropagation();
  setDropfileClass('drop-enter');
};

const handleDragOver = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

const handleDragLeave = () => {
  setDropfileClass('App');
};

const handleDrop = (event) => {
  event.preventDefault();
  event.stopPropagation();
  dispatch(addImagesFromDropAction(event.dataTransfer.files));
  setDropfileClass('App');
};



  return (

    <div
    className={dropfileClass}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
       >
         <Loader />
      <ErrorAlert />
      <Gallery />
    </div>
  );
};

export default App;
