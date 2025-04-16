import { AuthProvider } from './auth/AuthContext';
import AppRouter from './routes/AppRouter';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => (
  <AuthProvider>
    <Navbar />
    <AppRouter />
    <Footer />
  </AuthProvider>
);

export default App;
