import { createStore, compose} from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';

// import static data
import comments from './data/comments';
import posts from './data/posts';

// create an object for the default data
const defaultState = {
	comments,
	posts
};

// Redux Dev Tools
const enhancers = compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

// export history object instead of browserHistory
export const history = syncHistoryWithStore(browserHistory, store);


// HOT reloading reducers - no need to refresh in changes in reducers
if(module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer);
	})
}

export default store;
