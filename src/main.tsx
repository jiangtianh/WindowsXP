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

console.log("Testing cursor URLs:");
fetch("/img/cursors/default-cursor.cur")
  .then(res => console.log("Default cursor status:", res.status))
  .catch(err => console.error("Default cursor error:", err));

fetch("/img/cursors/pointer-cursor.cur")
  .then(res => console.log("Pointer cursor status:", res.status))
  .catch(err => console.error("Pointer cursor error:", err));