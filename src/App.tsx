import { GlobalStyle } from "."
import { CountryProvider } from "./context/CountryContext"
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { DataChartProvider } from "./context/DataChartContext";

function App() {
  return (
    <>
      <GlobalStyle />
      <CountryProvider>
        <DataChartProvider>
          <Router>
            <Routes />
          </Router>
        </DataChartProvider>
      </CountryProvider>
    </>
    
  )
}

export default App
