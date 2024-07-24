import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusinessPage from "./pages/BusinessPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/general-components/NavBar";
import ProfilePage from "./pages/ProfilePage";
import ContactUsPage from "./pages/ContactUsPage";
import AddBusinessForm from "./components/general-components/AddBusinessForm";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./providers/user.context";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/add" element={<AddBusinessForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
};
export default App;
