import React from 'react';

import { Container, Title, SearchContainer, SearchIcon, Input } from './styles';

const SearchComponent: React.FC = () => {
  return(
    <Container>
        <Title>Filtrar dados sobre um país</Title>
        <SearchContainer>
            <SearchIcon />
            <Input placeholder="Digite o nome do país"/>
        </SearchContainer>
    </Container>
  );
}

export default SearchComponent;