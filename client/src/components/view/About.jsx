import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

About.propTypes = {};

function About(props) {
  return (
    <Row className="mt-5" style={{ marginRight: 0 }}>
      <Col className="text-center">
        <Button
          variant="primary"
          href="https://github.com/HuynhNgocThuong"
          size="lg">
          Visit my github
        </Button>
      </Col>
    </Row>
  );
}

export default About;
