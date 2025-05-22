import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Nav = styled.nav`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #6c2bd7;
  font-size: 2rem;
  font-weight: 900;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Paw = styled.span`
  font-size: 2rem;
  margin-right: 6px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CartLink = styled(Link)`
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  min-width: 20px;
  text-align: center;
`;

const Navigation: React.FC = () => {
  const location = useLocation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <Paw>🐾</Paw>
          Стикеры с собачками
        </Logo>
        <NavLinks>
          <NavLink to="/" $active={location.pathname === '/'}>
            Товары
          </NavLink>
          <CartLink to="/cart">
            <span role="img" aria-label="cart">🛒</span>
            {cartItemsCount > 0 && <CartCount>{cartItemsCount}</CartCount>}
            <span style={{marginLeft: 4}}>Корзина</span>
          </CartLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navigation; 