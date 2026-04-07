import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';

function App() {
  return (
    <div className="font-tajawal text-slate-900 bg-slate-50 min-h-screen rtl" dir="rtl">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
