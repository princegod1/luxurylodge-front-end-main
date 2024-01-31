import { createStore } from 'redux';
import Cookies from 'js-cookie';

// Action types
const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
const TOGGLE_MENU = 'TOGGLE_MENU';
const CLOSE_MENU = 'CLOSE_MENU'; 

// Action creators
export const toggleDarkMode = () => ({ type: TOGGLE_DARK_MODE });
export const toggleMenu = () => ({ type: TOGGLE_MENU });
export const closeMenu = () => ({ type: CLOSE_MENU }); // Add this action creator

// Initial state
const initialState = {
  darkMode: Cookies.get('darkMode') === 'true',
  isMenuOpen: false,
  cardData: [
    { id: 1, icon: 'wifi', title: 'WIFI' },
    { id: 2, icon: 'biking', title: 'Biking' },
    { id: 3, icon: 'swimmer', title: 'POOL' },
    { id: 4, icon: 'parking', title: 'PARKING' },
    { id: 5, icon: 'wine', title: 'BAR' },
    { id: 6, icon: 'music', title: 'MUSIC' },
    { id: 7, icon: 'bed', title: 'ROOMS' },
  ],
};



// craete a pop up message to tell a user how are cookies handle in this website to make things legal 


// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      // Toggle darkMode and update the cookie
      Cookies.set('darkMode', !state.darkMode, { expires: 365 }); // Set cookie to expire in 365 days
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    case CLOSE_MENU: // Handle CLOSE_MENU action
      return {
        ...state,
        isMenuOpen: false,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;