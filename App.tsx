// // App.js
import React from 'react';
import {Provider} from 'react-redux';
import store from './reduxtoolkit/store';
import MainContainer from './reduxtoolkit/MainContainer';

const App = () => {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
};

export default App;

// App.js


// import React from 'react';
// import { Provider } from 'react-redux';
// import store from './store';
// import CounterComponent from './CounterComponent';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <CounterComponent />
//     </Provider>
//   );
// };

// export default App;
