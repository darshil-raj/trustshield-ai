import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Briefcase, MapPin, Clock, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import { ZONES, PLATFORMS, WORK_HOURS, DEMO_USER } from '../utils/constants';

const steps = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'work', label: 'Work Details', icon: Briefcase },
  { id: 'confirm', label: 'Confirm', icon: CheckCircle }
];

const Registration = () => {
  const navigate = useNavigate();
  const { actions } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    platform: '',
    zone: '',
    workHours: ''
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
    }
    
    if (step === 1) {
      if (!formData.platform) newErrors.platform = 'Platform is required';
      if (!formData.zone) newErrors.zone = 'Zone is required';
      if (!formData.workHours) newErrors.workHours = 'Work hours is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = {
      ...formData,
      avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    
    actions.setUser(userData);
    actions.addNotification({
      type: 'success',
      title: 'Welcome to TrustShield!',
      message: 'Your profile has been created successfully.'
    });
    
    navigate('/plans');
  };

  const fillDemoData = () => {
    setFormData({
      name: DEMO_USER.name,
      platform: DEMO_USER.platform,
      zone: DEMO_USER.zone,
      workHours: DEMO_USER.workHours
    });
    setErrors({});
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const platformOptions = PLATFORMS.map(p => ({ value: p.id, label: p.name }));
  const zoneOptions = ZONES.map(z => ({ value: z.id, label: `${z.name}, ${z.city}` }));
  const hoursOptions = WORK_HOURS.map(h => ({ value: h.value, label: h.label }));

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-4">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">TrustShield AI</h1>
          <p className="text-text-secondary">AI-powered Real-World Claim Verification</p>
          <p className="text-xs text-text-tertiary mt-2">We verify real conditions before approving payouts</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`
                  flex items-center gap-2 px-4 py-2 rounded-full
                  ${isActive ? 'bg-accent text-white' : 
                    isCompleted ? 'bg-success-dim text-success' : 'bg-surface text-text-tertiary'}
                `}>
                  <Icon size={18} />
                  <span className="text-sm font-medium hidden sm:inline">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-8 h-0.5 mx-2
                    ${isCompleted ? 'bg-success' : 'bg-border'}
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-surface border border-border rounded-2xl p-8"
        >
          {/* Step 1: Personal Info */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-text-primary">Initialize Verification Profile</h2>
                <p className="text-text-secondary mt-1">Set up your real-time validation profile</p>
              </div>
              
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                error={errors.name}
                icon={User}
              />
            </div>
          )}

          {/* Step 2: Work Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-text-primary">Work Details</h2>
                <p className="text-text-secondary mt-1">Tell us about your gig work</p>
              </div>
              
              <Select
                label="Delivery Platform"
                placeholder="Select your platform"
                options={platformOptions}
                value={formData.platform}
                onChange={(e) => updateField('platform', e.target.value)}
                error={errors.platform}
              />
              
              <Select
                label="Work Zone"
                placeholder="Select your zone"
                options={zoneOptions}
                value={formData.zone}
                onChange={(e) => updateField('zone', e.target.value)}
                error={errors.zone}
                icon={MapPin}
              />
              
              <Select
                label="Work Hours"
                placeholder="Select your work hours"
                options={hoursOptions}
                value={formData.workHours}
                onChange={(e) => updateField('workHours', e.target.value)}
                error={errors.workHours}
                icon={Clock}
              />
            </div>
          )}

          {/* Step 3: Confirm */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-text-primary">Confirm Details</h2>
                <p className="text-text-secondary mt-1">Review your information</p>
              </div>
              
              <div className="bg-surface-2 rounded-xl p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Name</span>
                  <span className="text-text-primary font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Platform</span>
                  <span className="text-text-primary font-medium capitalize">{formData.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Zone</span>
                  <span className="text-text-primary font-medium">
                    {ZONES.find(z => z.id === formData.zone)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Work Hours</span>
                  <span className="text-text-primary font-medium">
                    {WORK_HOURS.find(h => h.value === formData.workHours)?.label}
                  </span>
                </div>
              </div>
              
              <div className="bg-accent-dim rounded-xl p-4 border border-accent/20">
                <p className="text-sm text-accent text-center">
                  Next: Select your insurance plan
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            {currentStep > 0 && (
              <Button variant="secondary" className="flex-1" onClick={handleBack}>
                Back
              </Button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <Button 
                variant="primary" 
                className="flex-1" 
                onClick={handleNext}
                icon={ArrowRight}
              >
                Start Verification
              </Button>
            ) : (
              <Button 
                variant="primary" 
                className="flex-1" 
                onClick={handleSubmit}
                loading={isLoading}
                icon={ArrowRight}
              >
                Complete Registration
              </Button>
            )}
          </div>
        </motion.div>

        {/* Demo Data Button */}
        <div className="text-center mt-6">
          <button 
            onClick={fillDemoData}
            className="text-sm text-text-tertiary hover:text-accent transition-colors"
          >
            Fill demo data for testing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
