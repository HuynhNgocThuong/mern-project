import {
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from '../constants/constants';
export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // posts is list post
    case POSTS_LOADED_SUCCESS:
      // Payload is list post getted
      return {
        ...state,
        posts: payload,
        postsLoading: false,
      };
    // Asign posts is empty
    case POSTS_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postsLoading: false,
      };
    // Payload is a new post create
    case ADD_POST:
      return {
        ...state,
        posts: [state.posts, payload],
      };
    // Payload is a postId
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((posts) => posts._id !== payload),
      };
    case UPDATE_POST:
      const newPost = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );
      return {
        ...state,
        posts: newPost,
      };
    case FIND_POST:
      return {
        ...state,
        post: payload,
      };
    default:
      return state;
  }
};
