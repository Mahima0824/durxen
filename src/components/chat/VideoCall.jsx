import React, { useState, useEffect } from 'react';
import { Modal, Image, Button, Badge } from 'react-bootstrap';

const VideoCall = ({ show, onHide, contact, currentUserAvatar }) => {
  const [callStatus, setCallStatus] = useState('calling');
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    let interval;
    
    if (show) {
      // Start call when modal is shown
      setCallStatus('in-progress');
      
      // Start call duration timer
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      // Reset duration when modal is closed
      setDuration(0);
    }
    
    // Cleanup interval when component unmounts or show changes
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [show]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(console.log);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const ControlButton = ({ icon, label, variant = 'primary', onClick, active = false }) => (
    <Button 
      variant={active ? 'primary' : variant} 
      onClick={onClick} 
      size="sm"
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ width: '60px' }}
      aria-label={label}
      title={label}
    >
      <i className={`${icon} fs-4`}></i>
    </Button>
  );

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="video-call-modal  overflow-hidden border-0" contentClassName="bg-dark">
      <Modal.Body className="p-0 text-white position-relative rounded-3 overflow-hidden">
        {/* Main Video Stream */}
        <div className="h-100 w-100 position-relative">
          <div className="position-relative w-100 h-100">
            <Image src={contact.avatar} className={`w-100 h-100 object-fit-cover `} style={{ transition: 'opacity 0.5s ease-in-out' }} onLoad={() => setIsImageLoaded(true)} />
            {!isImageLoaded && (
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>


          {/* Call Info Bar */}
          <div className={`position-absolute top-0 start-0 w-100 p-3 d-flex justify-content-between align-items-center transition-opacity `}>
            <div className="d-flex align-items-center">
              <Badge bg="dark" className="me-2 d-flex align-items-center"><i className="ri-wifi-line me-1"></i> Excellent</Badge>
              <Badge bg="dark" className="d-flex align-items-center"><i className="ri-time-line me-1"></i> {formatTime(duration)}</Badge>
            </div>
            <Button variant="light" size="sm" className="" onClick={toggleFullscreen}>
              <i className={`ri-${isFullscreen ? 'fullscreen-exit' : 'fullscreen'}-line fs-5`}></i>
            </Button>
          </div>
        </div>

        {/* Self View */}
        {callStatus === 'in-progress' && (
          <div className="position-absolute  rounded-3 overflow-hidden shadow-lg border border-2 border-white">
            {!isVideoOn && (
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-70">
                <i className="ri-camera-off-line text-white-50"></i>
              </div>
            )}
          </div>
        )}

        {/* Call Controls */}
        <div className={`position-absolute bottom-0 start-0 w-100 p-4 d-flex  align-items-center transition-all `}>
          <div className="d-flex gap-3">
            <ControlButton icon={isMuted ? 'ri-mic-off-line' : 'ri-mic-line'} label={isMuted ? 'Unmute' : 'Mute'} onClick={() => setIsMuted(!isMuted)} variant={isMuted ? 'danger' : 'primary'} />
            <ControlButton icon={isVideoOn ? 'ri-camera-line' : 'ri-camera-off-line'} label={isVideoOn ? 'Turn off video' : 'Turn on video'} onClick={() => setIsVideoOn(!isVideoOn)} variant={isVideoOn ? 'primary' : 'danger'} />
            <Button variant="danger" onClick={onHide}><i className="ri-phone-line fs-4"></i></Button>
            <ControlButton icon={isSpeakerOn ? 'ri-volume-up-line' : 'ri-volume-mute-line'} label={isSpeakerOn ? 'Speaker on' : 'Speaker off'} onClick={() => setIsSpeakerOn(!isSpeakerOn)} variant={isSpeakerOn ? 'primary' : 'danger'} />
            <ControlButton icon="ri-settings-3-line" label="More options" variant="primary" />
          </div>
        </div>
        <div className="position-absolute end-0 w-25 h-25 rounded-top-3 overflow-hidden bottom-0">
          <Image src={currentUserAvatar} className="  w-100 h-100 object-cover" />
          {!isVideoOn && (
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-dark bg-opacity-70">
              <div className="avatar-xxl bg-dark rounded-circle d-flex align-items-center justify-content-center mb-3">
                <i className="ri-camera-off-line fs-1 text-white-50"></i>
              </div>
              <h6 className="text-white">Camera is turned off</h6>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VideoCall;