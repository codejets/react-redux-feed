import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import createStore from '../../store';

export default function Provider ({ story }) {
  var store = createStore();
  return (
    <ReduxProvider store={store}>
        {story}
    </ReduxProvider>
  );
}
