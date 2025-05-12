import React from 'react';

export default function CartPageItem({ item, openConfirmDialog }) {
    return (
        <div className="cart-item">
            <div className="m">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={item.productImg}
                        alt={item.productName}
                        tabIndex="0"
                        className="cart-item-img"
                    />
                    <div className="data">
                        <div tabIndex="0" className="cart-item-name">{item.productName}</div>
                        <div tabIndex="0" className="cart-item-color">{item.productcolor}</div>
                        <div tabIndex="0" className="cart-item-price">{item.productPriceFormatted}</div>
                    </div>
                </div>
                <button
                    onClick={() => openConfirmDialog(item)}
                    aria-label="Remove the item from wishlist"
                    className="remove-button"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
