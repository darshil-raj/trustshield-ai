import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  Wallet, 
  Shield,
  BarChart3,
  Activity
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import { formatCurrency } from '../utils/helpers';

// Simple bar chart component
const SimpleBarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="flex items-end gap-3 h-40">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-2">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(item.value / maxValue) * 100}%` }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="w-full bg-accent/20 rounded-t-lg relative group"
          >
            <div 
              className="absolute bottom-0 left-0 right-0 bg-accent rounded-t-lg transition-all group-hover:bg-accent-hover"
              style={{ height: '100%' }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-2 px-2 py-1 rounded text-xs whitespace-nowrap">
              {formatCurrency(item.value)}
            </div>
          </motion.div>
          <span className="text-xs text-text-tertiary">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// Circular progress component
const CircularProgress = ({ value, label, color = 'accent' }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  const colors = {
    accent: 'stroke-accent',
    success: 'stroke-success',
    warning: 'stroke-warning',
    error: 'stroke-error'
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-surface-2"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className={colors[color]}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-text-primary">{value}%</span>
        </div>
      </div>
      <span className="text-sm text-text-secondary mt-2">{label}</span>
    </div>
  );
};

const Analytics = () => {
  const { state } = useApp();

  // Mock data for charts
  const weeklyData = [
    { label: 'Week 1', value: 400 },
    { label: 'Week 2', value: 0 },
    { label: 'Week 3', value: 300 },
    { label: 'Week 4', value: 0 }
  ];

  const monthlyData = [
    { label: 'Jan', value: 700 },
    { label: 'Feb', value: 400 },
    { label: 'Mar', value: 1050 },
    { label: 'Apr', value: state.totalPayouts }
  ];

  const triggerStats = [
    { name: 'Heavy Rain', count: 2, amount: 800 },
    { name: 'High AQI', count: 1, amount: 300 },
    { name: 'Extreme Heat', count: 1, amount: 350 },
    { name: 'Curfew', count: 0, amount: 0 }
  ];

  return (
    <div>
      <Header 
        title="Analytics Dashboard" 
        subtitle="Insights into your protection and claims"
      />

      {/* Key Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <Wallet size={24} className="text-accent mx-auto mb-3" />
          <p className="text-3xl font-bold text-text-primary font-mono">
            {formatCurrency(state.totalPayouts)}
          </p>
          <p className="text-sm text-text-secondary mt-1">Total Protected</p>
        </Card>

        <Card className="text-center">
          <Activity size={24} className="text-success mx-auto mb-3" />
          <p className="text-3xl font-bold text-text-primary">{state.claims.length}</p>
          <p className="text-sm text-text-secondary mt-1">Claims Filed</p>
        </Card>

        <Card className="text-center">
          <Calendar size={24} className="text-info mx-auto mb-3" />
          <p className="text-3xl font-bold text-text-primary">12</p>
          <p className="text-sm text-text-secondary mt-1">Weeks Covered</p>
        </Card>

        <Card className="text-center">
          <Shield size={24} className="text-warning mx-auto mb-3" />
          <p className="text-3xl font-bold text-text-primary">{state.trustScore}</p>
          <p className="text-sm text-text-secondary mt-1">Trust Score</p>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Payouts */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 size={20} className="text-accent" />
              <h3 className="font-semibold text-text-primary">Weekly Payouts</h3>
            </div>
            <span className="text-sm text-text-tertiary">This Month</span>
          </div>
          <SimpleBarChart data={weeklyData} />
        </Card>

        {/* Monthly Trend */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp size={20} className="text-accent" />
              <h3 className="font-semibold text-text-primary">Monthly Trend</h3>
            </div>
            <span className="text-sm text-text-tertiary">Last 4 Months</span>
          </div>
          <SimpleBarChart data={monthlyData} />
        </Card>
      </div>

      {/* Trigger Breakdown & Risk Metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Trigger Statistics */}
        <Card>
          <h3 className="font-semibold text-text-primary mb-6">Claims by Trigger</h3>
          <div className="space-y-4">
            {triggerStats.map((trigger, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-surface-2 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-3 h-3 rounded-full
                    ${trigger.count > 0 ? 'bg-accent' : 'bg-text-tertiary'}
                  `} />
                  <span className="text-text-primary">{trigger.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-secondary">
                    {trigger.count} claim{trigger.count !== 1 ? 's' : ''}
                  </span>
                  <span className="text-sm font-mono font-medium text-text-primary w-20 text-right">
                    {formatCurrency(trigger.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Risk Metrics */}
        <Card>
          <h3 className="font-semibold text-text-primary mb-6">Risk Metrics</h3>
          <div className="grid grid-cols-2 gap-6">
            <CircularProgress 
              value={state.trustScore} 
              label="Trust Score" 
              color={state.trustScore > 80 ? 'success' : state.trustScore > 60 ? 'warning' : 'error'}
            />
            <CircularProgress 
              value={75} 
              label="Zone Safety" 
              color="success"
            />
            <CircularProgress 
              value={60} 
              label="Claim Success" 
              color="accent"
            />
            <CircularProgress 
              value={85} 
              label="Response Time" 
              color="success"
            />
          </div>
        </Card>
      </div>

      {/* Summary Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-gradient-to-r from-accent/10 to-accent-hover/10 border border-accent/20 rounded-xl p-6"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-text-primary">Your Protection Summary</h4>
            <p className="text-sm text-text-secondary mt-1">
              You've been protected for 12 weeks with {state.claims.length} successful claims.
              Your trust score is {state.trustScore > 80 ? 'excellent' : 'good'}.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-text-secondary">Total Value Protected</p>
            <p className="text-2xl font-bold text-accent font-mono">
              {formatCurrency(state.totalPayouts + (state.selectedPlan?.coverageAmount || 4000) * 12)}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
