import {
	GET_POSTS,
	GET_POST,
	DELETE_POST,
	POST_ERROR,
	POST_SUBMIT_SUCCESS,
	POST_SUBMIT_FAIL,
	POST_UPDATE_SUCCESS,
	POST_UPDATE_FAIL
} from '../actions/types';

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {}
	// postSubmitted: false
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
		case POST_UPDATE_SUCCESS:
			return {
				...state,
				loading: false,
				posts: [ payload, ...state.posts ],
				post: payload
				// postSubmitted: true
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post.postId !== payload),
				loading: false
			};
		case POST_SUBMIT_FAIL:
		case POST_UPDATE_FAIL:
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
