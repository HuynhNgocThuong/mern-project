import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import playIcon from '../../assets/play-btn.svg';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
import { PostContext } from '../../contexts/PostContext';
import { Button } from 'react-bootstrap';
ActionButtons.propTypes = {};

function ActionButtons(props) {
  const { url, _id } = props;

  const {
    postState,
    deletePost,
    findPost,
    showUpdatePostModal,
    setShowUpdatePostModal,
  } = useContext(PostContext);

  const choosePost = (postId) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  };
  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="32" htight="32" />
      </Button>
      <Button
        className="post-button"
        target="_blank"
        onClick={() => choosePost(_id)}>
        <img src={editIcon} alt="edit" width="32" htight="32" />
      </Button>
      <Button
        className="post-button"
        target="_blank"
        onClick={() => deletePost(_id)}>
        <img src={deleteIcon} alt="delete" width="32" htight="32" />
      </Button>
    </>
  );
}

export default ActionButtons;
