import React, { useState, useEffect } from 'react';
import { Modal, Image, Button } from 'react-bootstrap';

const VoiceCall = ({ show, onHide, contact }) => {
    const [callStatus, setCallStatus] = useState('calling');
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeakerOn, setIsSpeakerOn] = useState(true);
    const [isMinimized, setIsMinimized] = useState(false);

    // Auto-answer after 2 seconds
    useEffect(() => {
        let timer;
        if (show && callStatus === 'calling') {
            timer = setTimeout(() => {
                setCallStatus('in-progress');
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [show, callStatus]);

    // Update call duration
    useEffect(() => {
        let interval;
        if (callStatus === 'in-progress') {
            interval = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [callStatus]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleEndCall = () => {
        setCallStatus('ended');
        setTimeout(() => {
            onHide();
            setCallStatus('calling');
            setDuration(0);
        }, 1000);
    };

    const toggleMute = () => setIsMuted(!isMuted);
    const toggleSpeaker = () => setIsSpeakerOn(!isSpeakerOn);
    const toggleMinimize = () => setIsMinimized(!isMinimized);

    const ControlButton = ({ icon, label, variant = 'primary', onClick, active = false }) => (
        <Button variant={active ? 'primary' : variant} onClick={onClick} size="sm" className=" "><i className={`ri-${icon} fs-4`}></i></Button>
    );

    if (isMinimized) {
        return (
            <div className="position-fixed bottom-0 end-0 m-3 bg-dark rounded-3 shadow-lg overflow-hidden" >
                <div className="d-flex align-items-center p-2 bg-primary bg-opacity-10">
                    <Image src={contact?.avatar || '/default-avatar.png'} roundedCircle width={40} height={40} className="border border-2 border-primary" />
                    <div className="ms-2 flex-grow-1">
                        <div className="text-truncate fw-medium">{contact?.name || 'Calling...'}</div>
                        <div className="small text-muted">{formatTime(duration)}</div>
                    </div>
                    <Button variant="link" className="text-white" onClick={toggleMinimize}><i className="ri-arrow-up-s-line fs-4"></i></Button>
                </div>
            </div>
        );
    }

    return (
        <Modal show={show} onHide={handleEndCall} centered className="voice-call-modal" contentClassName="bg-dark border-0 rounded-4 overflow-hidden">
            <Modal.Body className="p-0 text-white position-relative">
                <div className="d-flex flex-column align-items-center p-4 text-center h-500" style={{ minHeight: '500px' }}>
                    {/* Caller Info */}
                    <div className="position-relative mb-4">
                        <div className="position-relative">
                            <Image src={contact?.avatar || '/default-avatar.png'} roundedCircle width={150} height={150} className={`border border-4 ${callStatus === 'in-progress' ? 'border-success' : 'border-warning'}`} />
                            {callStatus === 'calling' && (
                                <div className="position-absolute top-0 start-0 w-100 h-100 rounded-circle pulse-ring"></div>
                            )}
                        </div>
                    </div>

                    <h3 className="mb-1">{contact?.name || 'Calling...'}</h3>
                    <p className="text-muted mb-4">
                        {callStatus === 'calling'
                            ? 'Calling...'
                            : callStatus === 'in-progress'
                                ? formatTime(duration)
                                : 'Call ended'}
                    </p>

                    {/* Volume Visualization */}
                    {callStatus === 'in-progress' && (
                        <div className="w-100 px-5 mb-4">
                            <div className="d-flex justify-content-center gap-1" >
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className={`bg-${isMuted ? 'danger' : 'primary'} rounded-1`}
                                        style={{
                                            width: '4px',
                                            height: `${isMuted ? 5 : Math.random() * 20 + 5}px`,
                                            transition: 'all 0.3s ease',
                                            opacity: isMuted ? 0.5 : 1
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Call Controls */}
                    <div className="position-absolute bottom-0 start-0 w-100 p-4 d-flex justify-content-center align-items-center">
                        <div className="d-flex gap-3">
                            <ControlButton icon={isMuted ? 'mic-off-line' : 'mic-line'} label={isMuted ? 'Unmute' : 'Mute'} onClick={toggleMute} variant={isMuted ? 'danger' : 'light'} />
                            <Button variant="danger" className="" onClick={handleEndCall}><i className="ri-phone-line fs-4"></i></Button>
                            
                            <ControlButton icon={isSpeakerOn ? 'volume-up-line' : 'volume-mute-line'} label={isSpeakerOn ? 'Speaker' : 'Mute'} onClick={toggleSpeaker} variant={isSpeakerOn ? 'primary' : 'light'} />
                            <ControlButton icon="subtract-line" label="Minimize" onClick={toggleMinimize} variant="light" />
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default VoiceCall;
