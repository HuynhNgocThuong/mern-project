import { React } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';
AddPostModal.propTypes = {};

function AddPostModal(props) {
  //Context
  const { showAddPostModal, setShowAddPostModal, setShowToast, addPost } =
    useContext(PostContext);

  //Local state
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    url: '',
    status: 'TO LEARN',
  });

  //Function binding data
  function onChangeNewPostForm(event) {
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value,
    });
  }

  //Close Dialog
  function closeDialog() {
    resetAddPostData();
  }

  //Reset form create post
  function resetAddPostData() {
    setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' });
    setShowAddPostModal(false);
  }

  //Submit to create post
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    resetAddPostData();
    setShowToast({
      show: true,
      message: message,
      type: success ? 'success' : 'danger',
    });
  };

  const { title, url, description } = newPost;

  return (
    <Modal show={showAddPostModal} animation={false} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
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
              onChange={onChangeNewPostForm}
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
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="my-3"
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={onChangeNewPostForm}
            />
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

export default AddPostModal;
