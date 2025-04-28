import { AuthProvider } from './auth/AuthContext';
import AppRouter from './routes/AppRouter';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const App = () => (
  <AuthProvider>
    <Navbar />
    <AppRouter />
    <Footer />
  </AuthProvider>
);

export default App;
