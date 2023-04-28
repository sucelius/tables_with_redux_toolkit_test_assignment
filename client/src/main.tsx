
import ReactDOM from 'react-dom/client'
import App from './App'

import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<Provider store={store}>
<SnackbarProvider maxSnack={3}>
  <BrowserRouter>
  <App />
</BrowserRouter>
</SnackbarProvider>
</Provider>
,
)
