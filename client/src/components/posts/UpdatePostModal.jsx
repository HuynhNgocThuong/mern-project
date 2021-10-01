import { React } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useState, useEffect } from 'react';
import { PostContext } from '../../contexts/PostContext';
UpdatePostModal.propTypes = {};

function UpdatePostModal(props) {
  //Context
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  //Local state
  const [updatedPost, setUpdatedPost] = useState(post);

  useEffect(() => setUpdatedPost(post), [post]);

  //Function binding data
  function onChangeUpdatedPostForm(event) {
    setUpdatedPost({
      ...updatedPost,
      [event.target.name]: event.target.value,
    });
  }

  //Close Dialog
  function closeDialog() {
    resetAddPostData();
  }

  //Reset form create post
  function resetAddPostData() {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  }

  //Submit to create post
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowUpdatePostModal();
    setShowToast({
      show: true,
      message: message,
      type: success ? 'success' : 'danger',
    });
  };

  const { title, url, description, status } = updatedPost;

  return (
    //   Dialog always load but is hided when click closeDialog -> when open again need to reload post for new update item
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatedPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="my-3"
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="my-3"
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatedPostForm}>
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UpdatePostModal;
