import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        <div className='h-screen flex flex-col justify-center items-center'>
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App;
