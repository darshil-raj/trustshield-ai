import { useState } from 'react';
import { Bell, Settings, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';

const Header = ({ title, subtitle }) => {
  const { state, actions } = useApp();
  const [showSettings, setShowSettings] = useState(false);
  
  const activeAlerts = state.activeAlerts.length;

  const handleClearAlerts = () => {
    state.activeAlerts.forEach(alert => actions.removeAlert(alert.id));
  };

  return (
    <header className="flex items-center justify-between py-6 px-2">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
        {subtitle && (
          <p className="text-text-secondary mt-1">{subtitle}</p>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {activeAlerts > 0 && (
          <button 
            onClick={handleClearAlerts}
            className="flex items-center gap-2"
          >
            <Badge variant="error" className="animate-pulse cursor-pointer hover:bg-error/20">
              <X size={12} />
              {activeAlerts} Active Alert{activeAlerts > 1 ? 's' : ''}
            </Badge>
          </button>
        )}
        
        <button 
          className="p-2.5 text-text-secondary hover:text-text-primary hover:bg-surface-2 rounded-lg transition-colors relative"
          onClick={() => alert('Notifications: You have ' + state.notifications.length + ' notifications')}
        >
          <Bell size={20} />
          {state.notifications.length > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          )}
        </button>
        
        <button 
          className={`p-2.5 rounded-lg transition-colors ${showSettings ? 'bg-accent-dim text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'}`}
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Settings Dropdown */}
      {showSettings && (
        <div className="absolute top-20 right-8 w-64 bg-surface border border-border rounded-xl shadow-xl z-50 p-4">
          <h3 className="font-semibold text-text-primary mb-3">Quick Settings</h3>
          <div className="space-y-2">
            <button 
              onClick={() => { actions.resetState(); setShowSettings(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-error hover:bg-error-dim transition-colors text-sm"
            >
              Reset Demo Data
            </button>
            <div className="border-t border-border my-2" />
            <p className="text-xs text-text-tertiary px-3">TrustShield AI v1.0</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
