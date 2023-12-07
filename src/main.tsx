import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SupabaseContext, SupabaseProvider } from './SupabaseContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://pqydowgqthtdvjtuiaiz.supabase.co",
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SupabaseProvider supabaseClient={supabase}>
      <App />
    </SupabaseProvider>
  </React.StrictMode>,
)
