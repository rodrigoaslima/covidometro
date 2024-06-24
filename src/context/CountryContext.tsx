import { createContext, useState, ReactNode } from 'react';
import { CovidApi, IsoApi } from '../services/api';

export interface CountryDataInterface {
  confirmed: number;
  deaths: number;
  fatality_rate: string;
  countryName: string;
  iso: string;
}

interface CountryContextProps {
  countryData: CountryDataInterface | null;
  fetchCountryData: (countryName: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

export const CountryContext = createContext<CountryContextProps>({
  countryData: null,
  fetchCountryData: async () => {},
  loading: false,
  error: null,
});

interface CountryProviderProps {
  children: ReactNode;
}

export const CountryProvider = ({ children }: CountryProviderProps) => {
  const [countryData, setCountryData] = useState<CountryDataInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCountryData = async (countryName: string) => {
    const name = countryName.toLocaleUpperCase();
    setLoading(true);
    setError(null);

    try {
      const isoResponse = await IsoApi.get(`/name/${name}`);
      
      const covidResponse = await CovidApi(`/reports/total?iso=${isoResponse.data[0].cca3}`);
      const fatalityRatePercent = covidResponse.data.data.fatality_rate * 100;
      
      const countryData: CountryDataInterface = {
        confirmed: covidResponse.data.data.confirmed,
        deaths: covidResponse.data.data.deaths,
        fatality_rate: fatalityRatePercent.toFixed(2),
        countryName: name,
        iso: isoResponse.data[0].cca3
      }
      setCountryData(countryData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CountryContext.Provider value={{ countryData, fetchCountryData, loading, error }}>
      {children}
    </CountryContext.Provider>
  );
};