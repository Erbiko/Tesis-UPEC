// App.jsx
import { AuthProvider } from './auth/AuthContext';
import AppRouter from './routes/AppRouter';

const App = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);

export default App;
