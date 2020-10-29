import React from 'react';
import Main from './containers/Main';
import 'antd/dist/antd.css';

import './App.css';
import CustomAlert from './components/CustomAlert/CustomAlert';

function App() {
  return (
    <div className="App">
      <Main />
      <CustomAlert />
    </div>
  );
}

export default App;
