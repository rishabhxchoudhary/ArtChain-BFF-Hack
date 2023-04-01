import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StateContextProvider } from './Contexts/Context';
import { BrowserRouter } from 'react-router-dom';
import { createClient, Provider, dedupExchange, cacheExchange, fetchExchange } from 'urql';

const client = createClient({
  url: process.env.REACT_APP_GRAPH_QUERY_URL,
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StateContextProvider>
    <BrowserRouter>
      <Provider value={client}>
        <App />
      </Provider>
    </BrowserRouter>
  </StateContextProvider>
);