import React, {  useState , useEffect  } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { gallerySelector,galleryWidthSelector,cardsSelector,  rowsSelector } from '../store/selectors/gallerySelector';
import {addInit, handleDeleteImageAction,calcGallery } from '../store/actions/galleryAction';
import {containerMaxWidth,containerMinWidth,imagePadding, rowMaxHeight, rowNormalHeight} from '../consts'
import Empty from './Empty';
import ImageCard from './ImageCard';
import '../styles/gallery.scss';
import photos from '../photos';

export default function Gallery() {
  const dispatch = useDispatch();
  const gallery = useSelector(gallerySelector);
  const widthGallery = useSelector(galleryWidthSelector) ;
  const cards = useSelector(cardsSelector);
  const rows = useSelector(rowsSelector);


useEffect(() => {

dispatch(addInit(photos));

},[]);

useEffect(() => {

  dispatch(calcGallery());

  const  actionResize = e => {
  dispatch(calcGallery());
  }
  
  window.addEventListener('resize', actionResize);
}, [dispatch]);




  return (
    <div className="gallery"  >

      {!cards.length && <Empty />}
      {!!cards.length &&
        cards.length === gallery.length &&
        gallery.map((item, i) => (
          <ImageCard
            key={'img_' + i}
            index={i}
            width = {widthGallery}
            url={item.url}
            cardNormalWidth={cards[i].cardNormalWidth}
            rowScale={widthGallery / rows[cards[i].rowNumber]}
            isLastRow={cards[i].rowNumber === rows.length - 1}
          />
        ))}

    </div>

  )

}
