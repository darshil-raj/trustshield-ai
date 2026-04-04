import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, FileText, Zap, Clock, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from '../components/layout/Header';
import ClaimCard from '../components/claims/ClaimCard';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { formatCurrency } from '../utils/helpers';

const filterOptions = [
  { value: 'all', label: 'All Claims' },
  { value: 'auto', label: 'Auto Claims' },
  { value: 'manual', label: 'Manual Claims' }
];

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'processing', label: 'Processing' },
  { value: 'paid', label: 'Paid' },
  { value: 'rejected', label: 'Rejected' }
];

const Claims = () => {
  const { state } = useApp();
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredClaims = state.claims.filter(claim => {
    const matchesType = filter === 'all' || claim.type === filter;
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const stats = {
    total: state.claims.length,
    auto: state.claims.filter(c => c.type === 'auto').length,
    manual: state.claims.filter(c => c.type === 'manual').length,
    processing: state.claims.filter(c => c.status === 'processing').length,
    paid: state.claims.filter(c => c.status === 'paid').length
  };

  return (
    <div>
      <Header 
        title="Verified Events & Payouts" 
        subtitle="All entries are system-generated after validation"
      />

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-dim rounded-lg">
              <FileText size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
              <p className="text-sm text-text-secondary">Total Events</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-border rounded-xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-dim rounded-lg">
              <Zap size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.auto}</p>
              <p className="text-sm text-text-secondary">Auto-Verified</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border rounded-xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning-dim rounded-lg">
              <Clock size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.processing}</p>
              <p className="text-sm text-text-secondary">Processing</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface border border-border rounded-xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-dim rounded-lg">
              <CheckCircle size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.paid}</p>
              <p className="text-sm text-text-secondary">Paid</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-text-tertiary" />
          <span className="text-sm text-text-secondary">Filter by:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${filter === option.value 
                  ? 'bg-accent text-white' 
                  : 'bg-surface border border-border text-text-secondary hover:border-border-2'}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {statusOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${statusFilter === option.value 
                  ? 'bg-accent text-white' 
                  : 'bg-surface border border-border text-text-secondary hover:border-border-2'}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Claims List */}
      {filteredClaims.length > 0 ? (
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredClaims.map((claim, index) => (
              <motion.div
                key={claim.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <ClaimCard claim={claim} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-16 bg-surface border border-border rounded-xl">
          <FileText size={48} className="text-text-tertiary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No verified events found</h3>
          <p className="text-text-secondary">
            {filter !== 'all' || statusFilter !== 'all' 
              ? 'Try adjusting your filters' 
              : 'Verified events will appear here after validation'}
          </p>
        </div>
      )}

      {/* Total Payout Summary */}
      {state.totalPayouts > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 bg-success-dim border border-success/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-success">Total Payouts Received</p>
              <p className="text-3xl font-bold text-success font-mono mt-1">
                {formatCurrency(state.totalPayouts)}
              </p>
            </div>
            <div className="p-3 bg-success/20 rounded-full">
              <CheckCircle size={32} className="text-success" />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Claims;
