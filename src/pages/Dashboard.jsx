import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  Zap,
  ArrowRight,
  Brain,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/layout/Header';
import StatCard from '../components/dashboard/StatCard';
import TriggerCard from '../components/dashboard/TriggerCard';
import AlertBanner from '../components/dashboard/AlertBanner';
import PayoutNotification from '../components/dashboard/PayoutNotification';
import IncomeLossEstimator from '../components/dashboard/IncomeLossEstimator';
import TrustScoreBreakdown from '../components/dashboard/TrustScoreBreakdown';
import BeforeAfterComparison from '../components/dashboard/BeforeAfterComparison';
import FraudShieldCard from '../components/dashboard/FraudShieldCard';
import LiveRiskMap from '../components/dashboard/LiveRiskMap';
import Button from '../components/common/Button';
import { TRIGGERS, ZONES } from '../utils/constants';
import { formatCurrency, generateId } from '../utils/helpers';

const Dashboard = () => {
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [triggers, setTriggers] = useState(TRIGGERS);
  const [simulating, setSimulating] = useState(null);
  const [showPayout, setShowPayout] = useState(false);
  const [lastClaim, setLastClaim] = useState(null);

  const userZone = ZONES.find(z => z.id === state.user?.zone);

  // Update triggers based on zone
  useEffect(() => {
    if (userZone) {
      setTriggers(prev => prev.map(t => {
        if (t.id === 'rain' && userZone.riskLevel === 'high') {
          return { ...t, currentValue: 32, status: 'active' };
        }
        return t;
      }));
    }
  }, [userZone]);

  const handleSimulateTrigger = async (triggerId) => {
    setSimulating(triggerId);
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update trigger status
    setTriggers(prev => prev.map(t => 
      t.id === triggerId 
        ? { ...t, status: 'triggered', currentValue: t.currentValue + 20 }
        : t
    ));
    
    // Get trigger details
    const trigger = triggers.find(t => t.id === triggerId);
    
    // Create claim
    const claim = {
      id: `CLM${generateId().substring(0, 6).toUpperCase()}`,
      type: 'auto',
      trigger: trigger.name,
      amount: trigger.payoutAmount,
      status: 'processing',
      date: new Date().toISOString()
    };
    
    // Add claim and alert
    actions.addClaim(claim);
    actions.addAlert({
      type: 'payout',
      title: `${trigger.name} Trigger Activated!`,
      message: `Parametric trigger threshold exceeded. Auto-claim generated.`,
      payoutAmount: trigger.payoutAmount
    });
    
    setLastClaim(claim);
    setShowPayout(true);
    setSimulating(null);
  };

  const handleClosePayout = () => {
    setShowPayout(false);
  };

  const handleViewClaims = () => {
    setShowPayout(false);
    navigate('/claims');
  };

  const activeAlertsCount = state.activeAlerts.length;

  return (
    <div>
      <Header 
        title="Dashboard" 
        subtitle={`Welcome back, ${state.user?.name?.split(' ')[0] || 'Rider'}`}
      />

      {/* Alert Banner */}
      <AnimatePresence>
        {state.activeAlerts.map(alert => (
          <AlertBanner 
            key={alert.id}
            alert={alert}
            onClose={() => actions.removeAlert(alert.id)}
          />
        ))}
      </AnimatePresence>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Weekly Premium"
          value={formatCurrency(state.selectedPlan?.weeklyPremium || 89)}
          subtitle="Auto-renews every Monday"
          icon={Wallet}
          color="accent"
        />
        
        <StatCard
          title="Total Payouts"
          value={formatCurrency(state.totalPayouts)}
          subtitle="Lifetime claims received"
          icon={Shield}
          color="success"
          trend="up"
          trendValue="+12% this month"
        />
        
        <StatCard
          title="Trust Score"
          value={`${state.trustScore}/100`}
          subtitle="Based on claim history"
          icon={TrendingUp}
          color="info"
        />
        
        <StatCard
          title="Active Alerts"
          value={activeAlertsCount}
          subtitle={activeAlertsCount > 0 ? 'Action required' : 'All clear'}
          icon={AlertTriangle}
          color={activeAlertsCount > 0 ? 'error' : 'success'}
        />
      </div>

      {/* PROPER LAYOUT: Two Column Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Income Loss Estimator */}
          <IncomeLossEstimator 
            dailyEarnings={800}
            hoursLost={3}
            payoutAmount={400}
            triggerName="Heavy Rain"
          />

          {/* 2. Live Parametric Triggers */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                <Zap size={20} className="text-accent" />
                Live Parametric Triggers
              </h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                <span className="text-sm text-text-secondary">Live</span>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {triggers.map((trigger, index) => (
                <motion.div
                  key={trigger.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TriggerCard
                    trigger={trigger}
                    onSimulate={handleSimulateTrigger}
                    isSimulating={simulating === trigger.id}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* 3. Live Risk Map - FILLS THE GAP */}
          <LiveRiskMap />

          {/* 4. Protection Impact */}
          <BeforeAfterComparison 
            lossAmount={500}
            payoutAmount={400}
            triggerName="Heavy Rain"
          />
        </div>

        {/* RIGHT COLUMN - 1/3 width */}
        <div className="space-y-6">
          {/* Fraud Shield Card */}
          <FraudShieldCard />

          {/* Trust Score Breakdown */}
          <TrustScoreBreakdown score={state.trustScore} />

          {/* Quick Actions */}
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <ArrowRight size={16} className="text-accent" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button 
                variant="secondary" 
                className="w-full justify-between"
                onClick={() => navigate('/claims')}
              >
                View Claims
                <ArrowRight size={16} />
              </Button>
              <Button 
                variant="secondary" 
                className="w-full justify-between"
                onClick={() => navigate('/analytics')}
              >
                View Analytics
                <ArrowRight size={16} />
              </Button>
              <Button 
                variant="secondary" 
                className="w-full justify-between"
                onClick={() => navigate('/fraud-shield')}
              >
                <span className="flex items-center gap-2">
                  <Lock size={16} className="text-success" />
                  Fraud Shield
                </span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          {/* Coverage Info */}
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text-primary mb-4">Current Coverage</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Plan</span>
                <span className="text-text-primary font-medium">
                  {state.selectedPlan?.name || 'Pro Shield'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Max Payout</span>
                <span className="text-text-primary font-medium">
                  {formatCurrency(state.selectedPlan?.coverageAmount || 4000)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Zone</span>
                <span className="text-text-primary font-medium">
                  {userZone?.name || 'Andheri West'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payout Notification Modal */}
      <PayoutNotification
        claim={lastClaim}
        onClose={handleClosePayout}
        onViewClaims={handleViewClaims}
      />
    </div>
  );
};

export default Dashboard;
