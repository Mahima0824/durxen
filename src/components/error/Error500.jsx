import React, { useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Error500 = () => {
  const eyesRef = useRef([]);
  useEffect(() => {
    const handleMouseMove = (event) => {
      eyesRef.current.forEach((eye) => {
        if (!eye) return;
        const rect = eye.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const rad = Math.atan2(event.pageX - x, event.pageY - y);
        const rot = rad * (180 / Math.PI) * -1 + 180;

        eye.style.transform = `rotate(${rot}deg)`;
      });
    };
    

    document.body.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    document.title = `Error500 | Durxen | React Landing Page Template`;
  }, []);
  return (
    <div className="min-vh-100 d-flex align-items-center wrapper">
      <div className="auth_bg" ></div>
      <Container className="z-1">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="auth-card rounded-4 overflow-hidden">
              <div className=" p-4 text-center">
                <div className="eye-shape">
                  <h1 className="text-white fw-bold eye-number">5</h1>
                  <div className="eye" ref={(el) => (eyesRef.current[0] = el)}></div>
                  <div className="eye" ref={(el) => (eyesRef.current[1] = el)}></div>
                </div>
                <h1 className='text-white'>Internal Server Error.</h1>
                <h5 className='text-white text-opacity-75 fw-light mb-0'>We are already working to solve the problem.</h5>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Error500;
