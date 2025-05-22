import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { mockProducts } from '../services/mockData';

const ProductsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.h1.fontSize};
  margin-top: 32px;
  margin-bottom: 8px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  span {
    background: #ede6ff;
    border-radius: 6px;
    padding: 0 8px;
    color: #2d1a5a;
  }
`;

const Description = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 32px;
  font-size: 1.1rem;
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  margin-top: 32px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(80, 60, 180, 0.08);
  width: 280px;
  height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 16px;
  padding: 24px 16px 16px 16px;
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 16px;
`;

const ProductName = styled.h3`
  color: #6c2bd7;
  font-size: 1.3rem;
  margin: 0 0 8px 0;
  font-weight: 700;
  max-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const ProductDesc = styled.p`
  color: #444;
  font-size: 1rem;
  margin: 0 0 24px 0;
  text-align: center;
  max-height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.div`
  align-self: flex-end;
  background: #ede6ff;
  color: #6c2bd7;
  font-weight: 700;
  border-radius: 0 0 12px 0;
  padding: 6px 18px;
  font-size: 1.1rem;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 600;
  transition: opacity 0.2s;
  margin-top: 12px;

  &:hover {
    opacity: 0.9;
  }
`;

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProductsStart());
    try {
      setTimeout(() => {
        dispatch(fetchProductsSuccess(mockProducts));
      }, 1000);
    } catch (err) {
      dispatch(fetchProductsFailure('Не удалось загрузить товары'));
    }
  }, [dispatch]);

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    dispatch(addToCart(product));
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <ProductsContainer>
      <Title>
        <span>Получите</span> стикеры с собачками!
      </Title>
      <Description>
        Украсьте свой дом милыми стикерами с собачками! 🐶
      </Description>
      <ProductsGrid>
        {items.map((product) => (
          <Card key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductDesc>{product.description}</ProductDesc>
            <Price>{product.price.toFixed(2)} ₽</Price>
            <AddToCartButton onClick={() => handleAddToCart(product)}>
              В корзину
            </AddToCartButton>
          </Card>
        ))}
      </ProductsGrid>
    </ProductsContainer>
  );
};

export default Products; 