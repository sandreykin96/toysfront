import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

const CartContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CartItems = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
`;

const ItemPrice = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0 ${({ theme }) => theme.spacing.xl};
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.9;
  }
`;

const Quantity = styled.span`
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: 600;
`;

const RemoveButton = styled.button`
  color: ${({ theme }) => theme.colors.error};
  font-weight: 600;
  padding: ${({ theme }) => theme.spacing.sm};

  &:hover {
    text-decoration: underline;
  }
`;

const CartSummary = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.h2.fontSize};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.typography.h2.fontSize};
`;

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  if (items.length === 0) {
    return (
      <CartContainer>
        <Title>Корзина</Title>
        <EmptyCart>Ваша корзина пуста</EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <Title>Корзина</Title>
      <CartItems>
        {items.map((item) => (
          <CartItem key={item.product.id}>
            <ItemImage src={item.product.image} alt={item.product.name} />
            <ItemInfo>
              <ItemName>{item.product.name}</ItemName>
              <ItemPrice>{item.product.price.toFixed(2)} ₽</ItemPrice>
            </ItemInfo>
            <QuantityControl>
              <QuantityButton
                onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
              >
                -
              </QuantityButton>
              <Quantity>{item.quantity}</Quantity>
              <QuantityButton
                onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
              >
                +
              </QuantityButton>
            </QuantityControl>
            <RemoveButton onClick={() => handleRemoveItem(item.product.id)}>
              Удалить
            </RemoveButton>
          </CartItem>
        ))}
      </CartItems>
      <CartSummary>
        <Total>
          <span>Итого:</span>
          <span>{total.toFixed(2)} ₽</span>
        </Total>
        <CheckoutButton>Оформить заказ</CheckoutButton>
      </CartSummary>
    </CartContainer>
  );
};

export default Cart; 