import React, { createContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { postReducer } from '../reducers/postReducer';
import axios from 'axios';
import {
  ADD_POST,
  apiUrl,
  DELETE_POST,
  FIND_POST,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  UPDATE_POST,
} from '../constants/constants';

PostContextProvider.propTypes = {};
export const PostContext = createContext();

function PostContextProvider({ children }) {
  // Local state
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });

  //
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null,
  });

  // Get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      // console.log('Get all Post:', response);
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  //Add new post
  const addPost = async (newPost) => {
    try {
      console.log('NewPost:', newPost);
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({
          type: ADD_POST,
          payload: response.data.post,
        });
      }
      console.log('Data response: ', response.data);
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error.' };
    }
  };

  //Delete post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_POST,
          payload: postId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Update post
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatedPost._id}`,
        updatedPost
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_POST,
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Find post when user is updating post
  const findPost = (postId) => {
    try {
      const post = postState.posts.find((post) => post._id === postId);
      dispatch({
        type: FIND_POST,
        payload: post,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const postContextData = {
    getPosts,
    addPost,
    deletePost,
    updatePost,
    findPost,
    postState,
    showAddPostModal,
    setShowAddPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
    showToast,
    setShowToast,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;
