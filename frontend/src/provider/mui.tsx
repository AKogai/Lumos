import { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

type MuiProviderProps = {
  children: ReactNode;
};

export function MuiProvider({ children }: MuiProviderProps) {
  const theme = createTheme({
    typography: {
      fontFamily: 'Lato, sans-serif',
      h1: {
        fontFamily: 'DM Serif Display, serif'
      },
      h2: {
        fontFamily: 'DM Serif Display, serif'
      },
      h3: {
        fontFamily: 'DM Serif Display, serif'
      },
      h4: {
        fontFamily: 'DM Serif Display, serif'
      },
      h5: {
        fontFamily: 'DM Serif Display, serif'
      },
      h6: {
        fontFamily: 'DM Serif Display, serif'
      }
    }
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
