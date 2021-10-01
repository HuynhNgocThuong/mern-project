import { React, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../contexts/AuthContext';
import { PostContext } from '../../contexts/PostContext';
import Spinner from 'react-bootstrap/esm/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import SinglePost from '../posts/SinglePost';
import AddPostModal from '../posts/AddPostModal';
import addIcon from '../../assets/plus-circle-fill.svg';
import { OverlayTrigger, Toast, Tooltip } from 'react-bootstrap';
import UpdatePostModal from '../posts/UpdatePostModal';
Dashboard.propTypes = {};

function Dashboard(props) {
  // Context for Auth
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  // Context for Post
  const {
    getPosts,
    postState: { post, posts, postsLoading },
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  // Start: Get all posts
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);
  let body = 'null';
  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info"></Spinner>
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Wellcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button variant="primary" onClick={() => setShowAddPostModal(true)}>
              LearnIt
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        {/* md-3 
          g-4: space between colums
          mx-auto: center
          mt-3: margin top
      */}
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        {/* Open Add Post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
          <Button
            className="btn-floating"
            onClick={setShowAddPostModal.bind(this, true)}>
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }
  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      {/* After post is added, show toast */}
      <Toast
        show={show}
        style={{ position: 'fixed', top: '20%', right: '10px' }}
        className={`bg-${type} text-white`}
        onClose={() =>
          setShowToast({
            show: false,
            message: '',
            type: null,
          })
        }
        delay={3000}
        autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </>
  );
}

export default Dashboard;
