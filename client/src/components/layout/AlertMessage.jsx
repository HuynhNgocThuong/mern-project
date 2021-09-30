import React from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

AlertMessage.propTypes = {
  info: PropTypes.object,
};
function AlertMessage(props) {
  const { info } = props;
  console.log('props: ', info);
  return info === null ? null : (
    <Alert variant={info.type}>{info.message}</Alert>
  );
}

export default AlertMessage;
