import  HeaderComponent from '../../components/HeaderComponent';
import doctorImg from '../../assets/images/doctors.svg'

import { Container, InnerContainer, Img, TittleContainer, TextContainer, Tittle,Text, 
            HeaderContainer,InputContainer, 
        } from './styles';
import SearchComponent from '../../components/SearchComponent';
import CovidDataComponent from '../../components/CovidDataComponent';
import { CountryContext, CountryDataInterface } from '../../context/CountryContext';
import { useContext, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

const HomePage = () => {
    const { countryData, loading } = useContext(CountryContext);

    const [dataArray, setDataArray] = useState<CountryDataInterface[]>([]) 

   console.log('dataArray: ', countryData)

   useEffect(() => {
    if (countryData) {
        setDataArray((prevArray) => {const countryExists = prevArray.some((item) => item.iso === countryData.iso);

        if (countryExists) {
          alert(`O país ${countryData.countryName} já existe no array.`);
          return prevArray;
        } else {
          return [...prevArray, countryData];
        }
      });
    }
  }, [countryData, setDataArray]);



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

            {loading ? (
                <CircularProgress color="secondary" />
            ) :
                <>
                    {dataArray.map(({confirmed,countryName,deaths,fatality_rate}: CountryDataInterface, index) => 

                        <InputContainer key={index}>
                            <CovidDataComponent
                                country={countryName}
                                casesNumber={confirmed}
                                deaths={deaths}
                                fatalityRate={fatality_rate}
                            />
                        </InputContainer>   
                    )}
                </>
            }    
        </InnerContainer>
    </Container>
    
  );
}

export default HomePage;