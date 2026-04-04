import { motion } from 'framer-motion';
import { Shield, CheckCircle, MapPin, Activity, Wifi, AlertTriangle, Brain, Lock } from 'lucide-react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

const verificationSignals = [
  {
    icon: MapPin,
    label: 'GPS Location',
    status: 'verified',
    message: 'GPS matches delivery zone',
    detail: 'Andheri West, Mumbai - Verified'
  },
  {
    icon: Activity,
    label: 'Movement Pattern',
    status: 'verified',
    message: 'Movement pattern consistent',
    detail: 'Typical delivery route behavior detected'
  },
  {
    icon: Wifi,
    label: 'Network Signal',
    status: 'warning',
    message: 'Network signal unstable',
    detail: 'Expected during heavy rainfall'
  },
  {
    icon: Brain,
    label: 'Claim Pattern',
    status: 'verified',
    message: 'No suspicious claim patterns',
    detail: 'Historical claim behavior normal'
  }
];

const FraudShield = () => {
  const overallStatus = 'low';
  const riskScore = 12;

  return (
    <div>
      <Header 
        title="Fraud Shield Analysis" 
        subtitle="We do not rely on a single signal. Every claim is cross-verified using multiple real-world data sources."
      />

      {/* Main Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-br from-success-dim/50 to-surface border border-success/30 rounded-2xl p-8 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-success/20 rounded-2xl border-2 border-success/30">
                <Shield size={40} className="text-success" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-text-primary">Fraud Risk Analysis</h2>
                  <Badge variant="success" className="text-sm">
                    <Lock size={12} />
                    SECURE
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-success rounded-full animate-pulse" />
                  <span className="text-success font-semibold text-lg">LOW RISK</span>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-text-secondary mb-1">Risk Score</p>
              <p className="text-5xl font-bold text-success font-mono">{riskScore}</p>
              <p className="text-xs text-text-tertiary">out of 100 (lower is better)</p>
            </div>
          </div>

          {/* Key Message */}
          <div className="mt-8 p-4 bg-surface/50 rounded-xl border border-success/20">
            <p className="text-text-primary text-center">
              <span className="text-success font-semibold">Don't trust claims. Verify reality.</span>
              {' '}Detects spoofing before payout approval.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Verification Signals Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {verificationSignals.map((signal, index) => {
          const Icon = signal.icon;
          const isVerified = signal.status === 'verified';
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${isVerified ? 'bg-success' : 'bg-warning'}`} />
                
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${isVerified ? 'bg-success-dim' : 'bg-warning-dim'}`}>
                    <Icon size={22} className={isVerified ? 'text-success' : 'text-warning'} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-text-primary">{signal.label}</h4>
                      {isVerified ? (
                        <CheckCircle size={18} className="text-success" />
                      ) : (
                        <AlertTriangle size={18} className="text-warning" />
                      )}
                    </div>
                    
                    <p className={`text-sm font-medium ${isVerified ? 'text-success' : 'text-warning'}`}>
                      {signal.message}
                    </p>
                    <p className="text-xs text-text-tertiary mt-1">{signal.detail}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
            <Brain size={20} className="text-accent" />
            How Multi-Signal Verification Works
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-dim rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent font-bold">1</span>
              </div>
              <h4 className="font-medium text-text-primary mb-2">Data Collection</h4>
              <p className="text-sm text-text-secondary">
                We gather GPS, weather API, network signals, and movement patterns in real-time.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-dim rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent font-bold">2</span>
              </div>
              <h4 className="font-medium text-text-primary mb-2">AI Analysis</h4>
              <p className="text-sm text-text-secondary">
                Our AI cross-references multiple signals to verify claim authenticity.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-dim rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent font-bold">3</span>
              </div>
              <h4 className="font-medium text-text-primary mb-2">Instant Decision</h4>
              <p className="text-sm text-text-secondary">
                Legitimate claims are approved instantly. Suspicious patterns are flagged.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-2 rounded-full border border-border">
          <Lock size={14} className="text-success" />
          <span className="text-sm text-text-secondary">
            Bank-grade security • ISO 27001 certified • GDPR compliant
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default FraudShield;
