import React, { FC, useEffect } from 'react';
import ReactModal from 'react-modal';

import './styles/app.scss';
import Home from './pages/Home';

const App: FC = () => {
  useEffect(() => {
    ReactModal.setAppElement('#root');
  }, []);

  return (
    <Home />
  );
}

export default App;
