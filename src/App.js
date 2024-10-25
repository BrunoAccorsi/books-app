import MainLayout from './components/layout/MainLayout';
import AuthProvider from './Context/AuthContext';
import './global.css';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <MainLayout>
        <LoginPage />
      </MainLayout>
    </AuthProvider>
  );
}

export default App; //
