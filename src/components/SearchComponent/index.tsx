import { useContext, useState } from 'react';
import { Container, Title, SearchContainer, SearchIcon, Input } from './styles';
import { CountryContext } from '../../context/CountryContext';

const SearchComponent = () => {
  const [countryName, setCountryName] = useState<string>('');
  const { fetchCountryData, loading } = useContext(CountryContext);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //event.preventDefault();
    if (event.key === 'Enter') {
      fetchCountryData(countryName);
    }
  };
  
  return(
    <Container>
        <Title>Filtrar dados sobre um país</Title>
        <SearchContainer>
            <SearchIcon />
            <Input
              type="text"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              onKeyDown={handleSearch} 
              placeholder="Digite o nome do país"
              disabled={loading}
            />
        </SearchContainer>
    </Container>
  );
}

export default SearchComponent;