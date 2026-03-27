import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReferralPost from './pages/ReferralPost';
import PrivateRoute from './components/PrivateRoute';

import MyApplications from './pages/MyApplications';
import ActiveReferralsPage from './pages/ActiveReferralsPage';
import SettingsLayout from './pages/SettingsLayout';
import AccountSettings from './pages/settings/AccountSettings';
import PrivacySettings from './pages/settings/PrivacySettings';
import ViewProfile from './pages/ViewProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="view-profile" element={<ViewProfile />} />
          <Route path="referral-posts" element={<ReferralPost />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="referrals" element={<ActiveReferralsPage />} />
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<AccountSettings />} />
            <Route path="privacy" element={<PrivacySettings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
