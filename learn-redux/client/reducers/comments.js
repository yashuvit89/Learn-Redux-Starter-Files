// reducer takes two things
// 1. action 2. current state

// Every time action is dispatched -> 
// 	-> every reducer runs
function comments(state = [], action) {
	if(typeof action.postId !== 'undefined') {
		return {
			// take current state
			...state,
			// overwrite this post with new one
			// Redux composition - pass only particular post state
			[action.postId]: postComments(state[action.postId], action)
		}
	}
	return state;
}

// Redux composition pattern 
function postComments(state = [], action) {
	switch(action.type) {
		case 'ADD_COMMENT': 
			// return new state with new comment
			return [
				...state, {
					user: action.author,
					text: action.comment
				}]
		case 'REMOVE_COMMENT': 
			// return new state with deleted comment
			return [
				// from the start to the one we want to delete
				...state.slice(0, action.i),
				// after the delete
				...state.slice(action.i+1)
			];
		default:
			return state;
	}
	return state;
}

export default comments;