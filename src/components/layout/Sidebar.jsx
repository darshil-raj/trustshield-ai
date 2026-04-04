import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Calculator, 
  Shield, 
  Lock,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useState } from 'react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/claims', label: 'Verified Events', icon: FileText },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/calculator', label: 'Calculator', icon: Calculator },
  { path: '/fraud-shield', label: 'Fraud Shield', icon: Lock },
];

const Sidebar = () => {
  const { state, actions } = useApp();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const activeClaims = state.claims.filter(c => c.status === 'processing').length;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-surface border border-border rounded-lg text-text-primary"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: mobileOpen ? 0 : '-100%',
        }}
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-surface border-r border-border
          flex flex-col
          lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <Shield className="text-white" size={20} />
            </div>
            <div>
              <h1 className="font-bold text-lg text-text-primary">TrustShield</h1>
              <p className="text-xs text-text-tertiary uppercase tracking-wider">Verify Reality</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="px-3 py-2 text-xs font-medium text-text-tertiary uppercase tracking-wider">
            Main Menu
          </p>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-accent-dim text-accent border border-accent/20' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                  }
                `}
              >
                <Icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.path === '/claims' && activeClaims > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-accent text-white rounded-full">
                    {activeClaims}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-border">
          {state.user ? (
            <div className="flex items-center gap-3 p-3 bg-surface-2 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-white font-medium">
                {state.user.avatar || state.user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {state.user.name}
                </p>
                <p className="text-xs text-text-tertiary capitalize">
                  {state.user.platform}
                </p>
              </div>
              <button 
                onClick={actions.resetState}
                className="p-1.5 text-text-tertiary hover:text-error transition-colors"
                title="Reset Demo"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="text-center py-2">
              <p className="text-sm text-text-tertiary">Not registered</p>
              <NavLink 
                to="/" 
                className="text-sm text-accent hover:underline"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </NavLink>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
