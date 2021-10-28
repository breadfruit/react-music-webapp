import { GlobalStyle } from  './style';
import { IconStyle } from './assets/iconfont/iconfont'
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import route from './route/index'
import store from './store/index'
function App() {
  return (
    <HashRouter store={store}>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      {renderRoutes(route)}
    </HashRouter>
  );
}

export default App;
