import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {CheckoutItemContainer, ImageContainer, Image, Name, Quantity, Price, Arrow, Value, RemoveButton} from './checkout-item.styles'

const CheckoutItem = ({ item }) => {
  const { incrementItemCount, decrementItemCount, removeItem } =
    useContext(CartContext);

  const { imageUrl, name, price, quantity } = item;

  const decrementHandler = () => decrementItemCount(item);
  const incrementHandler = () => incrementItemCount(item);
  const removeHandler = () => removeItem(item);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <Image src={imageUrl} alt={name} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={decrementHandler}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={incrementHandler}>
          &#10095;
        </Arrow>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={removeHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
