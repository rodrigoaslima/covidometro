import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const CountryName = styled.h2`
  font-family: 'Spectral', serif;
  font-size: 24px;
  color: #4a4a4a;
  margin-bottom: 20px;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
`;

export const StatLabel = styled.span`
  font-size: 14px;
  color: #6c6c6c;
  margin-bottom: 10px;
`;

export const StatValue = styled.span`
  font-size: 24px;
  color: #d32f2f;
  font-weight: bold;
`;