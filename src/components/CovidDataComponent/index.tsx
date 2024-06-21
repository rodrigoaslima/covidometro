
import { Container, CountryName, StatsContainer, StatBox, StatLabel, StatValue } from './styles';

interface CovidDataInterface{
    country: string
    casesNumber: number
    deaths: number
    fatalityRate: number
}


const CovidDataComponent = ({ country, casesNumber, deaths, fatalityRate }:CovidDataInterface) => {
  return (
    <Container>
      <CountryName>{country}</CountryName>
      <StatsContainer>
        <StatBox>
          <StatLabel>Total de casos</StatLabel>
          <StatValue>{casesNumber.toLocaleString()}</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>Mortes</StatLabel>
          <StatValue>{deaths.toLocaleString()}</StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>Fatalidade</StatLabel>
          <StatValue>{fatalityRate}%</StatValue>
        </StatBox>
      </StatsContainer>
    </Container>
  );
}

export default CovidDataComponent;