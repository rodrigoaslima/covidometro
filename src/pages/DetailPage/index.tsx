import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {Chart as ChartSJ, 
    LineElement, 
    CategoryScale, 
    LinearScale, 
    PointElement
} from 'chart.js';

import { CircularProgress, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DataChartContext } from '../../context/DataChartContext';
import { Container, HeaderContainer, InnerContainer } from './styles';
import HeaderComponent from '../../components/HeaderComponent';


ChartSJ.register(
    LineElement, 
    CategoryScale, 
    LinearScale, 
    PointElement
)

const DetailPage = () => {
    const {dataChart,error,fetchDataForDates,loading} = useContext(DataChartContext);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { countryName } = useParams<{ countryName: any, }>();
    const [selectedData, setSelectedData] = useState<string[]>(['confirmed', 'deaths']);

    useEffect(()=>{
        fetchDataForDates('2023-01-09', countryName)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        setSelectedData(event.target.value as string[]);
    };

    
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const dataTypes = [
        { value: 'confirmed', label: 'Confirmed', color: '#fdd835', yAxisID: 'y1' },
        { value: 'deaths', label: 'Deaths', color: '#f44336', yAxisID: 'y2' },
    ];

    const data = {
        labels: dataChart?.date.map(d => d.date) || [],
        datasets: selectedData.map(key => {
            const dataType = dataTypes.find(type => type.value === key);
            return {
                label: dataType?.label,
                data: dataChart?.covidData.map(d => d[key as keyof typeof dataChart.covidData[0]]) || [],
                borderColor: dataType?.color,
                backgroundColor: `${dataType?.color}33`, // Transparent color
                pointBorderColor: dataType?.color,
                fill: true,
                tension: 0.4,
                yAxisID: dataType?.yAxisID, // Link dataset to specific y-axis
            };
        })
    }

    const options = {
        plugins: {
          legend: true,
        },
        scales: {
          y1: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Casos',
            },
          },
          y2: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Mortes',
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
    };

    return(
        <Container>
            <HeaderContainer>
                <HeaderComponent />
            </HeaderContainer>
            <InnerContainer>
                <h1>Grafico Covid</h1>
                {loading ? (
                    <CircularProgress color="secondary" />
                ) : 
                    <>
                        <InputLabel id="select-data-label">Select Data</InputLabel>
                        
                        <Select
                            labelId="select-data-label"
                            multiple
                            value={selectedData}
                            onChange={handleChange}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {dataTypes.map((type) => (
                                <MenuItem key={type.value} value={type.value}>
                                    {type.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <Line data={data} options={options} />
                    </>
                }
                
            </InnerContainer>
            
        </Container>
    );
}

export default DetailPage;