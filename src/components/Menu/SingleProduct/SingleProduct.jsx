/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { addItemAction, MenuContext, addTotalAmount } from '../../../StoreLogic/store';

export default function SingleProduct({ itemInfo, setDisplayMenu }) {
  const { dispatch } = useContext(MenuContext);

  // set local state for inputs
  const [size, setSize] = useState('');
  const [temp, setTemp] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const singleOrder = {
      itemId: itemInfo.id,
      sizeChoice: size,
      tempChoice: temp,
      quantity,
      itemName: itemInfo.itemName,
      itemPrice: itemInfo.price,
    };
    dispatch(addItemAction(singleOrder));
    // DISPATCH THE TOTAL AMOUNT.
    dispatch(addTotalAmount(totalAmount));
    //
    setDisplayMenu(() => null);
  }
  return (
    <>
      <h1>SINGLE PRODUCT PAGE</h1>
      <p>
        Name:
        {itemInfo.itemName}
      </p>
      <p>
        Desp:
        {itemInfo.description}
      </p>
      <p>
        Price:
        {itemInfo.price}
      </p>
      <p>
        Temp:
        {itemInfo.availableInTemp}
      </p>
      <form onSubmit={handleSubmit}>
        <p>Size</p>
        <input
          type="radio"
          id="regular"
          name="size_choice"
          value="regular"
          onChange={() => {
            setSize('regular');
          }}
        />

        <label htmlFor="regular">Regular</label>
        <input
          type="radio"
          id="large"
          name="size_choice"
          value="large"
          onChange={() => {
            setSize('large');
          }}
        />
        <label htmlFor="large">Large</label>
        <p>Available in</p>
        <input
          type="radio"
          id="hot"
          name="temp_choice"
          value="hot"
          onChange={() => {
            setTemp('hot');
          }}
        />
        <label htmlFor="hot">Hot</label>
        <input
          type="radio"
          id="iced"
          name="temp_choice"
          value="iced"
          onChange={() => {
            setTemp('iced');
          }}
        />
        <label htmlFor="iced">Iced</label>
        <div>
          <button
            type="button"
            onClick={async () => {
              const newQuantity = quantity - 1;
              await setQuantity(newQuantity);
              const updatedTotalAmount = itemInfo.price * newQuantity;
              console.log(updatedTotalAmount);
              setTotalAmount(updatedTotalAmount);
            }}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            onClick={async () => {
              const newQuantity = quantity + 1;
              await setQuantity(newQuantity);
              console.log(newQuantity);
              const updatedTotalAmount = itemInfo.price * newQuantity;
              console.log(updatedTotalAmount);
              setTotalAmount(updatedTotalAmount);
            }}
          >
            +
          </button>
          <p>
            <button type="submit">
              Add to cart $
              {totalAmount}
            </button>
          </p>
        </div>
      </form>
    </>
  );
}
