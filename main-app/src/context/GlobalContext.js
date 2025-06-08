import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Context7 - Global state management for microfrontends
const GlobalContext = createContext();

// Action types
const ACTION_TYPES = {
  SET_USER: 'SET_USER',
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  UPDATE_NAVIGATION: 'UPDATE_NAVIGATION',
  SET_SHARED_DATA: 'SET_SHARED_DATA',
  MICRO_APP_LOADED: 'MICRO_APP_LOADED',
  MICRO_APP_UNLOADED: 'MICRO_APP_UNLOADED'
};

// Initial state
const initialState = {
  user: {
    id: null,
    name: '',
    email: '',
    role: 'user'
  },
  theme: 'light',
  language: 'en',
  navigation: {
    activeRoute: '/',
    breadcrumbs: []
  },
  sharedData: {},
  loadedMicroApps: [],
  microAppStates: {}
};

// Reducer
const globalReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    case ACTION_TYPES.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    
    case ACTION_TYPES.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    
    case ACTION_TYPES.UPDATE_NAVIGATION:
      return {
        ...state,
        navigation: { ...state.navigation, ...action.payload }
      };
    
    case ACTION_TYPES.SET_SHARED_DATA:
      return {
        ...state,
        sharedData: { ...state.sharedData, ...action.payload }
      };
    
    case ACTION_TYPES.MICRO_APP_LOADED:
      return {
        ...state,
        loadedMicroApps: [...state.loadedMicroApps, action.payload],
        microAppStates: {
          ...state.microAppStates,
          [action.payload]: { loaded: true, timestamp: Date.now() }
        }
      };
    
    case ACTION_TYPES.MICRO_APP_UNLOADED:
      return {
        ...state,
        loadedMicroApps: state.loadedMicroApps.filter(app => app !== action.payload),
        microAppStates: {
          ...state.microAppStates,
          [action.payload]: { loaded: false, timestamp: Date.now() }
        }
      };
    
    default:
      return state;
  }
};

// Context Provider
export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  // Actions
  const actions = {
    setUser: (userData) => dispatch({ type: ACTION_TYPES.SET_USER, payload: userData }),
    setTheme: (theme) => dispatch({ type: ACTION_TYPES.SET_THEME, payload: theme }),
    setLanguage: (language) => dispatch({ type: ACTION_TYPES.SET_LANGUAGE, payload: language }),
    updateNavigation: (navData) => dispatch({ type: ACTION_TYPES.UPDATE_NAVIGATION, payload: navData }),
    setSharedData: (data) => dispatch({ type: ACTION_TYPES.SET_SHARED_DATA, payload: data }),
    markMicroAppLoaded: (appName) => dispatch({ type: ACTION_TYPES.MICRO_APP_LOADED, payload: appName }),
    markMicroAppUnloaded: (appName) => dispatch({ type: ACTION_TYPES.MICRO_APP_UNLOADED, payload: appName })
  };

  // Make context available globally for micro apps
  useEffect(() => {
    window.__GLOBAL_CONTEXT__ = {
      state,
      actions,
      dispatch
    };
  }, [state]);

  return (
    <GlobalContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};

// Export action types for micro apps
export { ACTION_TYPES };
export default GlobalContext; 