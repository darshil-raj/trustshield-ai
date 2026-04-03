import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { appReducer, initialState, actionTypes } from './AppReducer';
import { generateDemoClaims, calculateTrustScore } from '../utils/helpers';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => {
    const saved = localStorage.getItem('trustshield_state');
    return saved ? JSON.parse(saved) : initial;
  });

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('trustshield_state', JSON.stringify(state));
  }, [state]);

  // Actions
  const setUser = useCallback((user) => {
    dispatch({ type: actionTypes.SET_USER, payload: user });
  }, []);

  const setPlan = useCallback((plan) => {
    dispatch({ type: actionTypes.SET_PLAN, payload: plan });
  }, []);

  const addClaim = useCallback((claim) => {
    dispatch({ type: actionTypes.ADD_CLAIM, payload: claim });
    dispatch({ type: actionTypes.UPDATE_PAYOUTS, payload: claim.amount });
    
    // Update trust score
    const newScore = calculateTrustScore([...state.claims, claim], state.totalPayouts + claim.amount);
    dispatch({ type: actionTypes.UPDATE_TRUST_SCORE, payload: newScore });
  }, [state.claims, state.totalPayouts]);

  const updateClaim = useCallback((id, updates) => {
    dispatch({ type: actionTypes.UPDATE_CLAIM, payload: { id, ...updates } });
  }, []);

  const addTrigger = useCallback((trigger) => {
    dispatch({ type: actionTypes.ADD_TRIGGER, payload: trigger });
  }, []);

  const addNotification = useCallback((notification) => {
    const id = Date.now().toString();
    dispatch({ 
      type: actionTypes.ADD_NOTIFICATION, 
      payload: { ...notification, id, timestamp: new Date().toISOString() }
    });
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: id });
    }, 5000);
  }, []);

  const addAlert = useCallback((alert) => {
    const id = Date.now().toString();
    dispatch({ 
      type: actionTypes.ADD_ALERT, 
      payload: { ...alert, id, timestamp: new Date().toISOString() }
    });
  }, []);

  const removeAlert = useCallback((id) => {
    dispatch({ type: actionTypes.REMOVE_ALERT, payload: id });
  }, []);

  const resetState = useCallback(() => {
    dispatch({ type: actionTypes.RESET_STATE });
    localStorage.removeItem('trustshield_state');
  }, []);

  // Initialize demo data for first-time users
  const initializeDemoData = useCallback(() => {
    const demoClaims = generateDemoClaims();
    demoClaims.forEach(claim => {
      dispatch({ type: actionTypes.ADD_CLAIM, payload: claim });
    });
    
    const totalPayout = demoClaims.reduce((sum, c) => sum + c.amount, 0);
    dispatch({ type: actionTypes.UPDATE_PAYOUTS, payload: totalPayout });
    
    const trustScore = calculateTrustScore(demoClaims, totalPayout);
    dispatch({ type: actionTypes.UPDATE_TRUST_SCORE, payload: trustScore });
  }, []);

  const value = {
    state,
    actions: {
      setUser,
      setPlan,
      addClaim,
      updateClaim,
      addTrigger,
      addNotification,
      addAlert,
      removeAlert,
      resetState,
      initializeDemoData
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
