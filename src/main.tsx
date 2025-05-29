import { createRoot } from 'react-dom/client'
import { store } from './services/store.tsx'
import { Provider } from 'react-redux'

import App from './App.tsx'

import "xp.css/dist/XP.css";

import './index.css'




createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)