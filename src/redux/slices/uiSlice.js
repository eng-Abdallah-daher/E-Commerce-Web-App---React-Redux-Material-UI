import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  overlay: {
    isVisible: false,
    content: null,
    position: 'center',
    zIndex: 1000
  },
  drawer: {
    isOpen: false,
    currentMenu: 'main',
    previousMenu: null
  },
  mobileMenu: {
    isOpen: false,
    currentSection: 'menu'
  }
};
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showOverlay: (state, action) => {
      state.overlay.isVisible = true;
      state.overlay.top = action.payload.top || 0;
      state.overlay.content = action.payload.content || null;
      state.overlay.position = action.payload.position || 'center';
      state.overlay.zIndex = action.payload.zIndex || 1000;
    },
    hideOverlay: (state) => {
      state.overlay.isVisible = false;
    },
    openDrawer: (state) => {
      state.drawer.isOpen = true;
    },
    closeDrawer: (state) => {
      state.drawer.isOpen = false;
      state.drawer.currentMenu = 'main';
      state.drawer.previousMenu = null;
    },
    setDrawerMenu: (state, action) => {
      state.drawer.previousMenu = state.drawer.currentMenu;
      state.drawer.currentMenu = action.payload;
    },
    goBackInDrawer: (state) => {
      state.drawer.currentMenu = state.drawer.previousMenu || 'main';
      state.drawer.previousMenu = null;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenu.isOpen = !state.mobileMenu.isOpen;
    },
    setMobileMenuSection: (state, action) => {
      state.mobileMenu.currentSection = action.payload;
    }
  },
});
export const {
  showOverlay,
  hideOverlay,
  openDrawer,
  closeDrawer,
  setDrawerMenu,
  goBackInDrawer,
  toggleMobileMenu,
  setMobileMenuSection
} = uiSlice.actions;
export default uiSlice.reducer;
