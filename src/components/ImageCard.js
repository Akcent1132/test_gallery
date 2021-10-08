import React from 'react';
import { imagePadding, rowMaxHeight, rowNormalHeight } from '../consts'
import { useDispatch } from 'react-redux';
import { handleDeleteImageAction } from '../store/actions/galleryAction';
import '../styles/imageCard.scss';
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
export default function ImageCard({ index,width, url, cardNormalWidth, rowScale, isLastRow }) {
  const dispatch = useDispatch();

  const calcCardWidth =
    isLastRow && rowNormalHeight * rowScale > rowMaxHeight
      ? cardNormalWidth * (rowMaxHeight / rowNormalHeight)
      : cardNormalWidth * rowScale;
  const calcCardHeight =
    isLastRow && rowNormalHeight * rowScale > rowMaxHeight
      ? rowMaxHeight
      : rowNormalHeight * rowScale;

  const cardStyle = {
    width: calcCardWidth + 'px',
    height: calcCardHeight + 'px',
  };

  const handleDelete = () => {
    dispatch(handleDeleteImageAction(index,width));
  };

  return (
    <div style={cardStyle} className="card">
    <button className="card__delete-btn" onClick={handleDelete}>
<FontAwesomeIcon icon={faWindowClose} />
    </button>
      <img
        className="card__image"
        src={url}
        alt="img"
        width={calcCardWidth - imagePadding * 2 + 'px'}
        height={calcCardHeight - imagePadding * 2 + 'px'}
      />

    </div>
  );
}
