import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { ContextProvider } from './context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {


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
      <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />

    </>
  );
}

export default App;
