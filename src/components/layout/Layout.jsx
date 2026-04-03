import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { AlertContainer } from '../common/Alert';
import { useApp } from '../../context/AppContext';

const Layout = () => {
  const { state, actions } = useApp();

  return (
    <div className="min-h-screen bg-background flex noise-overlay">
      <Sidebar />
      
      <main className="flex-1 lg:ml-0 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>

      {/* Alert Container */}
      <AlertContainer 
        alerts={state.notifications} 
        onRemove={actions.removeAlert}
      />
    </div>
  );
};

export default Layout;
