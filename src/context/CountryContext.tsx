import { createContext, useState, ReactNode } from 'react';
import { CovidApi, IsoApi } from '../services/api';

interface CountryData {
  confirmed: number;
  deaths: number;
  region: {
    name: string;
  };
}

interface CountryContextProps {
  countryData: CountryData | null;
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
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCountryData = async (countryName: string) => {
    setLoading(true);
    setError(null);

    try {
      const isoResponse = await IsoApi.get(`/name/${countryName}`);
      
      const covidResponse = await CovidApi(`/reports/total?iso=${isoResponse.data[0].cca3}`);
      setCountryData(covidResponse.data);
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