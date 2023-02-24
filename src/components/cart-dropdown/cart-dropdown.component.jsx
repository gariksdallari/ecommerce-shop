import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { CartDropdownContainer, CartDropdownItems } from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/checkout');
    setIsCartOpen(false);
  }

  return (
    <CartDropdownContainer>
      <CartDropdownItems>
        {cartItems?.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </CartDropdownItems>
        <Button onClick={navigateHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
