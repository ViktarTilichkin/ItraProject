import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import ReviewPage from "./pages/ReviewPage";
import Layout from "./components/Layout";
import { ThemeProvider } from "./providers/ThemeProvider";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreateReview from "./pages/CreateReviewPage";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/review/:id" element={<ReviewPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/reg" element={<RegistrationPage />}></Route>
          <Route path="/review" element={<CreateReview />}></Route>
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
