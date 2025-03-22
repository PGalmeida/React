import React from 'react';
import ReactDOM from 'react-dom/client';
import Cadastro from './components/Cadastro';

const cadrastro = ReactDOM.createRoot(document.getElementById('cadastro'));
cadrastro.render(
  <React.StrictMode>
    <Cadastro />
  </React.StrictMode>
);

