import { GlobalStyle } from "."
import { CountryProvider } from "./context/CountryContext"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <>
      <GlobalStyle />
      <CountryProvider>
        <HomePage/>
      </CountryProvider>
    </>
    
  )
}

export default App
