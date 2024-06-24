import { ReactNode, createContext, useState } from "react";
import { CovidApi } from "../services/api";

interface DateChartInterface {
  date: string;
}

export interface DataInterface {
  confirmed: number;
  deaths: number;
  fatality_rate: string;
}
  
interface ChartDataInterface {
  date: DateChartInterface[];
  covidData: DataInterface[];
}
  
interface DataChartContextProps {
  dataChart: ChartDataInterface;
  fetchDataForDates: (date: string, iso: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
}
  
export const DataChartContext = createContext({} as DataChartContextProps);
  
interface DataChartProviderProps {
  children: ReactNode;
}
  
export const DataChartProvider: React.FC<DataChartProviderProps> = ({ children }) => {
  const [dataChart, setDataChart] = useState<ChartDataInterface>({covidData:[],date:[]});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const getDatesArray = (dateStr: string): string[] => {
    const date = new Date(dateStr);
    const datesArray: string[] = [];
    for (let i = 0; i < 6; i++) {
      const currentDate = new Date(date);
      currentDate.setDate(date.getDate() - i);
      const formattedDate = currentDate.toISOString().split('T')[0];
      datesArray.push(formattedDate);
    }
    return datesArray;
  };
  
  const fetchDataForDates = async (date: string, iso: string) => {
    setLoading(true);
    setError(null);
    const dataArray: DataInterface[] = [];
    const dates = getDatesArray(date);
  
    for (const date of dates) {
       
      try{
        const response = await CovidApi.get(`/reports/total?date=${date}&iso=${iso}`);
        dataArray.push({
          confirmed: response.data.data.confirmed,
          deaths: response.data.data.deaths,
          fatality_rate: response.data.data.fatality_rate
        });
      } catch(err){
        setError(err as Error);
        setLoading(false);
      }
    }
    
    setDataChart({ date: dates.map(d => ({ date: d })), covidData: dataArray });
    setLoading(false);
  };

  return (
    <DataChartContext.Provider value={{ dataChart, fetchDataForDates, loading, error }}>
      {children}
    </DataChartContext.Provider>
  );
};