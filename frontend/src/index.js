import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import wholeReducer from './reducers/reducer';
import { compose, createStore } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import {BrowserRouter,Switch} from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import MainPage from './components/MainPage';
import FilePage from './components/FilePage';
import GroupPage from './components/GroupPage';
import Account from './components/Account';
import Shared from './components/Shared';
import AuthorizedRoute from './components/AuthorizedRoute';
import UnAuthorizedRoute from './components/UnAuthorizedRoute';
import Hello from './components/Hello';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';


const theme = createMuiTheme();

let store = compose(
        autoRehydrate()
    )(createStore)(wholeReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

console.log(store);

registerServiceWorker();

store.subscribe(()=>{
    //console.log();
});

persistStore(store,{}, ()=>{
    ReactDOM.render(
        <Provider store={store}>
    
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <UnAuthorizedRoute exact path="/login" component={LoginRegister}/>
                        <AuthorizedRoute exact path="/" component={MainPage}/>
                        <AuthorizedRoute exact path="/hello" component={Hello}/>
                        <AuthorizedRoute exact path="/files/myfiles" component={FilePage}/>
                        <AuthorizedRoute exact path="/groups" component={GroupPage}/>
                        <AuthorizedRoute exact path="/account" component={Account}/>
                        <AuthorizedRoute exact path="/files/shared" component={Shared}/>
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
            
        </Provider>, document.getElementById('root')
    );
});

export default store;