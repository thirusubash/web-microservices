import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import Loading from './Loading';
import reportWebVitals from './reportWebVitals';
import Layout from './layout/Layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import store from './redux/store';
import { CssBaseline } from '@mui/material';
const App = lazy(() => import('./App'));

const Root = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#f48fb1",
      },
    },
    components: {
      MuiAccordion: {
        defaultProps: {
          square: true,
          TransitionProps: {
            unmountOnExit: true,
          },
        },
        styleOverrides: {
          root: {
            border: "1px solid rgba(255, 255, 255, .125)",
            boxShadow: "none",
            "&:not(:last-child)": {
              borderBottom: 0,
            },
            "&:before": {
              display: "none",
            },
            "&.Mui-expanded": {
              margin: "auto",
            },
            "&.Mui-disabled": {
              marginLeft: 32
            }
          },
        }
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            borderBottom: "1px solid rgba(255, 255, 255, .125)",
            minHeight: 56,
            "&.Mui-expanded": {
              minHeight: 56
            }
          },
          content: {
            alignItems: "center",
            justifyContent: "space-between",
            "&.Mui-expanded": {
              margin: "12px 0",
            },
          },
        }
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            backgroundColor: "#212121",
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          docked: {
            "& .MuiPaper-root": {
              position: "static",
            },
          },
          paper: {},
        }
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            backgroundColor: "transplant",
          },
        }
      }
    }
  });

  return (
    <React.StrictMode>
      <Suspense fallback={<Loading />}>
        <Provider store={store}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <HelmetProvider>
              <Router>
                <Layout>
                  <App />
                </Layout>
              </Router>
            </HelmetProvider>
          </ThemeProvider>
        </Provider>
      </Suspense>
    </React.StrictMode>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Root />);
}

reportWebVitals();
