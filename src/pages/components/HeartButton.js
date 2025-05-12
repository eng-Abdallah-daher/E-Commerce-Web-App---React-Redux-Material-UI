import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import ConfirmDialog from './ConfirmDialog';
import { addToWishlist, removeFromWishlist, getWishlist } from '../utils/WishlistFunctions';
import { obj } from '../../data/products';
import { refreshWishlist } from '../../redux/slices/wishlistSlice';

const HeartButton = ({ productIndex }) => {
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const wishlist = getWishlist();
    setIsWishlisted(wishlist.includes(productIndex));
  }, [productIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const wishlist = getWishlist();
      setIsWishlisted(wishlist.includes(productIndex));
    }, 1000);

    return () => clearInterval(interval);
  }, [productIndex]);

  const openConfirmDialog = (action) => {
    setConfirmAction(() => action);
    setShowConfirm(true);
  };

  const confirm = () => {
    if (confirmAction) {
      confirmAction();
      dispatch(refreshWishlist());
    }
    setShowConfirm(false);
  };

  const cancel = () => {
    setShowConfirm(false);
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      openConfirmDialog(() => {
        removeFromWishlist(productIndex);
        setIsWishlisted(false);
      });
    } else {
      openConfirmDialog(() => {
        addToWishlist(productIndex);
        setIsWishlisted(true);
      });
    }
  };

  return (
    <>
      <IconButton
        onClick={toggleWishlist}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        color={isWishlisted ? "error" : "default"}
        size="small"
      >
        {isWishlisted ? <Favorite /> : <FavoriteBorder />}
      </IconButton>

      <ConfirmDialog
        show={showConfirm}
        title={isWishlisted ? 'Remove from wishlist?' : 'Add to wishlist?'}
        message={isWishlisted
          ? `Do you want to remove ${obj.results[productIndex].productName} from the wishlist?`
          : `Do you want to add ${obj.results[productIndex].productName} to the wishlist?`}
        onCancel={cancel}
        onConfirm={confirm}
      />
    </>
  );
};

export default HeartButton;
