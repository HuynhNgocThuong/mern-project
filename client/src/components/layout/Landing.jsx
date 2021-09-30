import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
Landing.propTypes = {};

function Landing(props) {
  return <Redirect to="/login"></Redirect>;
}

export default Landing;
