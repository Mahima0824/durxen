import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css';
import 'remixicon/fonts/remixicon.css';
import './index.scss';
import App from './App'
import { SidebarProvider } from './contexts/SidebarContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { UIProvider } from './contexts/UIContext';
import { RTLProvider } from './contexts/RTLContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RTLProvider>
        <UIProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </UIProvider>
      </RTLProvider>
    </ThemeProvider>
  </StrictMode>,
)
