import { GET_POSTS, GET_POST, POST_ERROR, POST_SUBMIT_SUCCESS, POST_SUBMIT_FAIL } from '../actions/types';

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false
			};
		case GET_POST:
			return {
				...state,
				post: payload,
				loading: false
			};
		case POST_SUBMIT_SUCCESS:
			return {
				...state,
				loading: false,
				posts: [ payload, ...state.posts ]
			};
		case POST_SUBMIT_FAIL:
		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};

		default:
			return state;
	}
}
