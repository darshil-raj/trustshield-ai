export const initialState = {
  user: null,
  selectedPlan: null,
  claims: [],
  triggers: [],
  notifications: [],
  totalPayouts: 0,
  trustScore: 75,
  isOnboarded: false,
  activeAlerts: []
};

export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_PLAN: 'SET_PLAN',
  ADD_CLAIM: 'ADD_CLAIM',
  UPDATE_CLAIM: 'UPDATE_CLAIM',
  ADD_TRIGGER: 'ADD_TRIGGER',
  UPDATE_TRIGGER: 'UPDATE_TRIGGER',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  UPDATE_PAYOUTS: 'UPDATE_PAYOUTS',
  UPDATE_TRUST_SCORE: 'UPDATE_TRUST_SCORE',
  SET_ONBOARDED: 'SET_ONBOARDED',
  ADD_ALERT: 'ADD_ALERT',
  REMOVE_ALERT: 'REMOVE_ALERT',
  RESET_STATE: 'RESET_STATE'
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isOnboarded: true
      };

    case actionTypes.SET_PLAN:
      return {
        ...state,
        selectedPlan: action.payload
      };

    case actionTypes.ADD_CLAIM:
      return {
        ...state,
        claims: [action.payload, ...state.claims]
      };

    case actionTypes.UPDATE_CLAIM:
      return {
        ...state,
        claims: state.claims.map(claim =>
          claim.id === action.payload.id ? { ...claim, ...action.payload } : claim
        )
      };

    case actionTypes.ADD_TRIGGER:
      return {
        ...state,
        triggers: [action.payload, ...state.triggers]
      };

    case actionTypes.UPDATE_TRIGGER:
      return {
        ...state,
        triggers: state.triggers.map(trigger =>
          trigger.id === action.payload.id ? { ...trigger, ...action.payload } : trigger
        )
      };

    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };

    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };

    case actionTypes.UPDATE_PAYOUTS:
      return {
        ...state,
        totalPayouts: state.totalPayouts + action.payload
      };

    case actionTypes.UPDATE_TRUST_SCORE:
      return {
        ...state,
        trustScore: action.payload
      };

    case actionTypes.SET_ONBOARDED:
      return {
        ...state,
        isOnboarded: action.payload
      };

    case actionTypes.ADD_ALERT:
      return {
        ...state,
        activeAlerts: [...state.activeAlerts, action.payload]
      };

    case actionTypes.REMOVE_ALERT:
      return {
        ...state,
        activeAlerts: state.activeAlerts.filter(a => a.id !== action.payload)
      };

    case actionTypes.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};
