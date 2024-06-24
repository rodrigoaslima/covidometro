import  HeaderComponent from '../../components/HeaderComponent';
import doctorImg from '../../assets/images/doctors.svg'

import { Container, InnerContainer, Img, TittleContainer, TextContainer, Tittle,Text, 
            HeaderContainer,InputContainer, 
        } from './styles';
import SearchComponent from '../../components/SearchComponent';
import CovidDataComponent from '../../components/CovidDataComponent';
import { CountryContext, CountryDataInterface } from '../../context/CountryContext';
import { useContext, useEffect, useState } from 'react';
import { Alert, CircularProgress, Snackbar } from '@mui/material';

const HomePage = () => {
    const { countryData, loading, error } = useContext(CountryContext);

    const [dataArray, setDataArray] = useState<CountryDataInterface[]>([]);
    const [open, setOpen] = useState<boolean>(false); 

   useEffect(() => {
    if(error){
        setOpen(true);
    }

    if (countryData) {
        setDataArray((prevArray) => {const countryExists = prevArray.some((item) => item.iso === countryData.iso);

        if (countryExists) {
            return prevArray;
        } else {
          return [...prevArray, countryData];
        }
      });
    }
  }, [countryData, setDataArray, error]);


    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

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
                    {dataArray.map(({confirmed,countryName,deaths,fatality_rate, iso}: CountryDataInterface, index) => 

                        <InputContainer key={index}>
                            <CovidDataComponent
                                country={countryName}
                                casesNumber={confirmed}
                                deaths={deaths}
                                fatalityRate={fatality_rate}
                                iso={iso}
                            />
                        </InputContainer>   
                    )}
                </>
            }    
        </InnerContainer>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Não foi possivel encontrar o pais solicitado.
            </Alert>
        </Snackbar>

    </Container>
    
  );
}

export default HomePage;