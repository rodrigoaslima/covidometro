import { Routes as Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';

// import { Container } from './styles';

const Routes = () => {
  return(
    <Switch>
        <Route path="/covidometro/" element={<HomePage />} />
        <Route path="/details/:countryName" element={<DetailPage />} />
    </Switch>
  )
}

export default Routes;