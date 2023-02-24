import { CartItemContainer, Image, ItemDetails, Name } from "./cart-item.styles";

const CartItem = ({ item }) => {
  const { name, quantity, imageUrl, price } = item;

  return (
    <CartItemContainer>
      <Image src={imageUrl} alt={name} />
      <ItemDetails>
        <Name className="name">{name}</Name>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
