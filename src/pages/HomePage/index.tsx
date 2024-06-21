import  HeaderComponent from '../../components/HeaderComponent';
import doctorImg from '../../assets/images/doctors.svg'

import { Container, InnerContainer, Img, TittleContainer, TextContainer, Tittle,Text, 
            HeaderContainer,InputContainer, 
        } from './styles';
import SearchComponent from '../../components/SearchComponent';
import CovidDataComponent from '../../components/CovidDataComponent';

const HomePage = () => {
  return(
    <Container>
        <HeaderContainer>
            <HeaderComponent />
        </HeaderContainer>
        <InnerContainer>
            <TittleContainer>
                <TextContainer>
                    <Tittle>Conheça o Covidômetro</Tittle>
                    <Text>Fique atualizado com velocidade e transparência. O Covidômetro é uma 
                        ferramenta que mostra para você em tempo real o número de caso e óbitos
                        relacionados a pandemia da COVID-19 ao redor do mundo.
                    </Text>
                </TextContainer>
                <Img src={doctorImg}/>
            </TittleContainer>

            <InputContainer>
                <SearchComponent />
            </InputContainer>

            <InputContainer>
                <CovidDataComponent
                    country="África do Sul"
                    casesNumber={32687680}
                    deaths={672790}
                    fatalityRate={2.05}
                />
            </InputContainer>
                
        </InnerContainer>
    </Container>
    
  );
}

export default HomePage;