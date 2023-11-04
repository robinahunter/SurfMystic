import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from './components/App'
import './index.css'

import { ThemeProvider } from "@material-tailwind/react";
 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </Router>,
)
