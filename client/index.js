import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import App from './components/App/App'

function render( Component, flag=false ){
	Component = flag ? hot( Component ) : Component;
	ReactDOM.render(<Component/>, document.getElementById('root'));
}

render(App, true);