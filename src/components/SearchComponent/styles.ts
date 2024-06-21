import styled from 'styled-components';

import { FaSearch } from 'react-icons/fa';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-family: 'Spectral', serif;
  font-size: 24px;
  color: #4a4a4a;
  margin-bottom: 20px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  border-bottom: 2px solid #d32f2f;
  padding: 5px;
`;

export const SearchIcon = styled(FaSearch)`
  color: #d32f2f;
  margin-right: 10px;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 16px;
  color: #6c6c6c;
  &::placeholder {
    color: #bdbdbd;
  }
`;

