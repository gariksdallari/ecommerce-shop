import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import { ProductCardContainer, Image, Price, Footer, Name } from "./product-card.styles";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => addItemToCart(product);

  return (
    <ProductCardContainer>
      <Image alt={name} src={imageUrl} /> 
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addToCartHandler}>
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
