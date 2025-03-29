import { ThemeProvider } from "styled-components";
import Theme from "./styles/theme/Theme";
import GlobalStyles from "./styles/globalStyles/GlobalStyles";
import RoutesComponent from "./routes";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <RoutesComponent />
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default App
