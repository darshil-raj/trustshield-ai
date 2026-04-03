import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from './context/AppContext';
import Layout from './components/layout/Layout';
import Registration from './pages/Registration';
import PlanSelection from './pages/PlanSelection';
import Dashboard from './pages/Dashboard';
import Claims from './pages/Claims';
import Analytics from './pages/Analytics';
import Calculator from './pages/Calculator';
import FraudShield from './pages/FraudShield';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { state } = useApp();
  const location = useLocation();

  if (!state.isOnboarded) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!state.selectedPlan && location.pathname !== '/plans') {
    return <Navigate to="/plans" replace />;
  }

  return children;
};

// Page transition wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={
          <PageTransition>
            <Registration />
          </PageTransition>
        } />
        
        <Route path="/plans" element={
          <ProtectedRoute>
            <PageTransition>
              <PlanSelection />
            </PageTransition>
          </ProtectedRoute>
        } />

        {/* Protected Routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <PageTransition>
                <Dashboard />
              </PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="/claims" element={
            <ProtectedRoute>
              <PageTransition>
                <Claims />
              </PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="/analytics" element={
            <ProtectedRoute>
              <PageTransition>
                <Analytics />
              </PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="/calculator" element={
            <ProtectedRoute>
              <PageTransition>
                <Calculator />
              </PageTransition>
            </ProtectedRoute>
          } />
          
          <Route path="/fraud-shield" element={
            <ProtectedRoute>
              <PageTransition>
                <FraudShield />
              </PageTransition>
            </ProtectedRoute>
          } />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
