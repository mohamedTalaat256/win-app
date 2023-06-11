import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Router from './routes';
import ThemeProvider from './theme';
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { ContextProvider } from './context/ContextProvider';


export default function App() {
  return (
    <>
      <ContextProvider >
        <HelmetProvider>
          <BrowserRouter>
            <ThemeProvider >
              <ScrollToTop />
              <Router />
            </ThemeProvider>
          </BrowserRouter>
        </HelmetProvider>
      </ContextProvider>
     </>
  );
}
