import React, { useState } from 'react';
import { ListGroup, Image, Badge, TabContainer, Tabs, Tab, Form, Button, Modal, Dropdown } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import user1 from '../../images/user/avatar-1.jpg';
import user2 from '../../images/user/avatar-2.jpg';
import user3 from '../../images/user/avatar-3.jpg';
import user4 from '../../images/user/avatar-4.jpg';
import user5 from '../../images/user/avatar-5.jpg';

// Sample data for groups
const sampleGroups = [
  {
    id: 'g1',
    name: 'Project Team',
    avatar: user1,
    lastMessage: 'Meeting at 3 PM',
    time: '2h',
    unread: 3,
    members: 8,
    isMuted: false
  },
  {
    id: 'g2',
    name: 'Design Squad',
    avatar: user2,
    lastMessage: 'Check the new mockups',
    time: '1d',
    unread: 0,
    members: 5,
    isMuted: true
  },
  {
    id: 'g3',
    name: 'Company Announcements',
    avatar: user3,
    lastMessage: 'Holiday schedule updated',
    time: '2d',
    unread: 12,
    members: 42,
    isMuted: false
  }
];

// Sample data for status
const sampleStatus = [
  {
    id: 's1',
    name: 'My Status',
    avatar: user4,
    time: 'Just now',
    isMe: true
  },
  {
    id: 's2',
    name: 'John Doe',
    avatar: user5,
    time: '15 minutes ago',
    isMe: false
  },
  {
    id: 's3',
    name: 'Sarah Smith',
    avatar: user5,
    time: '1 hour ago',
    isMe: false
  }
];

// Sample data for calls
const sampleCalls = [
  {
    id: 'c1',
    name: 'John Doe',
    avatar: user5,
    time: '10:30 AM',
    type: 'outgoing',
    status: 'missed',
    duration: '2:30'
  },
  {
    id: 'c2',
    name: 'Sarah Smith',
    avatar: user1,
    time: 'Yesterday',
    type: 'incoming',
    status: 'answered',
    duration: '5:45'
  },
  {
    id: 'c3',
    name: 'Project Team',
    avatar: user4,
    time: '2 days ago',
    type: 'group',
    status: 'answered',
    duration: '12:30'
  }
];

const ChatSidebar = ({
  activeChat,
  setActiveChat,
  searchTerm,
  setSearchTerm,
  filteredConversations,
  onClose = () => { }
}) => {

  // Status viewer state
  const [activeTab, setActiveTab] = useState('chat');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  return (
    <>
      <div className=" d-flex flex-column border-end" style={{ height: 'calc(100vh - 205px)' }}>
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Image src={user1} roundedCircle className="avatar avatar-md border border-2 border-white shadow-sm" />
            <Dropdown align="end">
              <Dropdown.Toggle variant="link">
                <div className='avatar avatar-md border border-2 bg-gradient-primary rounded border-white shadow-sm'><i className="ri-settings-line"></i></div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#" className="d-flex align-items-center"><i className="ri-user-line me-2"></i> Profile</Dropdown.Item>
                <Dropdown.Item href="#" className="d-flex align-items-center"><i className="ri-notification-3-line me-2"></i> Notifications</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#" className="d-flex align-items-center text-danger"><i className="ri-logout-box-line me-2"></i> Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* Search */}
          <div className="search-box position-relative">
            <div className="position-absolute start-0 top-50 translate-middle-y ms-3">
              <i className="ri-search-line" />
            </div>
            <Form.Control type="text" className="ps-5" placeholder="Search or start new chat" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <TabContainer id="chat-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="chat-tabs flex-grow-1 d-flex flex-column">
          <Tabs variant="pills" className="mb-3 border-bottom-0 px-3">
            <Tab eventKey="chat" title={<div className="d-flex flex-column align-items-center position-relative"><span>Chats</span></div>} className="position-relative" >
              <SimpleBar style={{ height: 'calc(100vh - 410px)', minHeight: 'max-content' }} className="mt-2">
                <ListGroup variant="flush" className="chat-list" >
                  {filteredConversations.map(chat => {
                    const isActive = activeChat === chat.id;
                    // Fixed typing state based on chat ID (example: typing for odd IDs)
                    const typingIds = [2, 5]; // jisme aapko typing show karna hai
                    const isTyping = typingIds.includes(chat.id);
                    const isOnline = chat.online;

                    return (
                      <ListGroup.Item key={chat.id} onClick={() => {
                        setActiveChat(chat.id);
                        onClose();
                      }} className={`chat-list-item ${isActive ? 'active-chat' : ''}  ${activeChat === chat.id ? 'bg-primary bg-opacity-10' : ''} position-relative overflow-hidden`} style={{ cursor: 'pointer' }}>
                        {/* Animated active state indicator */}
                        {isActive && (
                          <div className="position-absolute top-0 start-0 h-100 bg-primary" ></div>
                        )}

                        <div className="d-flex align-items-center py-2">
                          {/* Avatar with status */}
                          <div className="position-relative me-3">
                            <div className="avatar-wrapper">
                              <Image src={chat.avatar} roundedCircle className="avatar-md" />
                              {isOnline && (
                                <span className="position-absolute bg-success rounded-circle border border-white isOnline" />
                              )}
                            </div>
                          </div>

                          {/* Chat content */}
                          <div className="flex-grow-1 overflow-hidden">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <h6 className={`mb-0 text-truncate fw-medium ${isActive ? 'text-primary' : 'text-dark'}`} >{chat.name}</h6>
                              <div className="d-flex align-items-center">
                                <small className={`${chat.unread > 0 ? 'text-primary fw-bold' : 'text-muted'}`}>{chat.time}</small>
                              </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center" >
                                {isTyping ? (
                                  <div className="typing-indicator d-flex align-items-center">
                                    <small className="text-primary typing-text fw-medium">typing</small>
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                  </div>
                                ) : (
                                  <p className="mb-0 fs-15 text-muted text-truncate">{chat.lastMessage.length > 25 ? `${chat.lastMessage.substring(0, 25)}...` : chat.lastMessage}</p>
                                )}
                              </div>

                              <div className="d-flex align-items-center gap-2">
                                {/* Unread badge */}
                                {chat.unread > 0 && (
                                  <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle incoming-message">
                                    <small className="fs-12">{chat.unread}</small>
                                  </div>
                                )}
                                {chat.unread > 0 ? (
                                  <i className="ri-check-double-fill text-primary fs-6" />
                                ) : chat.lastMessageStatus === 'sent' ? (
                                  <i className="ri-check-line text-muted fs-6" />
                                ) : chat.lastMessageStatus === 'delivered' ? (
                                  <i className="ri-check-double-line text-muted fs-6" />
                                ) : (
                                  <i className="ri-check-double-fill text-muted fs-6" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </ListGroup.Item>
                    );
                  })}

                  {filteredConversations.length === 0 && (
                    <div className="text-center py-5 empty-chat">
                      <div className="empty-state-icon mb-3"><i className="ri-chat-3-line"></i></div>
                      <h6 className="mb-2">No conversations yet</h6>
                      <p className="text-muted mb-3">Your conversations will appear here</p>
                      <Button variant="outline-primary" size="sm" className="rounded-pill px-3"><i className="ri-add-line me-1"></i> Start New Chat</Button>
                    </div>
                  )}
                </ListGroup>
              </SimpleBar>
            </Tab>

            <Tab eventKey="groups" title={
              <div className="d-flex flex-column align-items-center position-relative">
                <span>Groups</span>
              </div>
            }>
              <SimpleBar style={{ maxHeight: 'calc(100vh - 250px)' }} className="mt-2">
                <div className="p-3">
                  <Button variant="outline-primary" size="sm" className="w-100 mb-3 d-flex align-items-center justify-content-center" onClick={() => setShowCreateGroup(true)}><i className="ri-add-line me-2"></i> Create New Group</Button>
                </div>
                <ListGroup variant="flush" className="pe-2">
                  {sampleGroups.map(group => (
                    <ListGroup.Item key={group.id} className="border-0 rounded-3 p-3 mb-2 ">
                      <div className="d-flex align-items-center">
                        <div className="position-relative me-3">
                          <div className="avatar-group"><Image src={group.avatar} roundedCircle className="avatar avatar-md border border-2 border-white shadow-sm" /></div>
                          {group.unread > 0 && (
                            <Badge bg="danger" className="position-absolute p-1 rounded-circle fs-10 top-0 end-0 ">{group.unread}</Badge>
                          )}
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <h6 className="mb-0 text-truncate fw-medium">{group.name}</h6>
                            <small className="text-muted">{group.time}</small>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-0 text-muted text-truncate">{group.lastMessage}</p>
                            <div className="d-flex align-items-center">
                              <i className="ri-group-line text-muted me-1"></i><small className="text-muted">{group.members}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </SimpleBar>
            </Tab>
            <Tab eventKey="calls" title={<div className="d-flex flex-column align-items-center"><span>Calls</span></div>}>
              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h6 className="mb-0">Recent Calls</h6>
                  <Button variant="link" size="sm" className="text-decoration-none p-0"><i className="ri-search-line"></i></Button>
                </div>

                <div className="d-flex justify-content-around mb-4">
                  <Button variant="outline-primary" size="sm" className="rounded-pill"><i className="ri-phone-line me-1"></i> New Call</Button>
                  <Button variant="outline-secondary" size="sm" className="rounded-pill"><i className="ri-video-add-line me-1"></i> New Video</Button>
                </div>

                <ListGroup variant="flush" className="pe-2">
                  {sampleCalls.map((call, index) => (
                    <ListGroup.Item key={call.id} className="border-0 rounded-3 p-3 mb-2 ">
                      <div className="d-flex align-items-center">
                        <div className="position-relative me-3">
                          <Image src={call.avatar} roundedCircle className="avatar avatar-md border border-2 border-white shadow-sm" />
                          {call.type === 'group' && (
                            <i className="ri-group-2-fill position-absolute bottom-0 end-0 translate-middle bg-white rounded-circle p-1 text-primary"></i>
                          )}
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <h6 className="mb-0">{call.name}</h6>
                            <div className="d-flex align-items-center">
                              {call.status === 'missed' && (
                                <i className="ri-arrow-left-down-line text-danger me-1"></i>
                              )}
                              <small className={`${call.status === 'missed' ? 'text-danger' : 'text-muted'}`}>{call.time}</small>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <i className={`me-1 ${call.type === 'incoming' ? 'ri-arrow-left-down-line' : 'ri-arrow-right-up-line'} ${call.status === 'missed' ? 'text-danger' : 'text-muted'
                                }`} ></i>
                              <small className={`${call.status === 'missed' ? 'text-danger' : 'text-muted'}`}>{call.status === 'missed' ? 'Missed' : call.duration}</small>
                            </div>
                            {call.status !== 'missed' && (
                              <Button variant="link" size="sm" className="p-0 text-muted"><i className="ri-phone-line"></i></Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Tab>
          </Tabs>
        </TabContainer>

        {/* Create Group Modal */}
        <Modal show={showCreateGroup} onHide={() => setShowCreateGroup(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create New Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Group Name</Form.Label>
                <Form.Control type="text" placeholder="Enter group name" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Add Participants</Form.Label>
                <div className="border rounded p-2">
                  {sampleStatus.filter(s => !s.isMe).map(user => (
                    <div key={user.id} className="form-check">
                      <Form.Check type="checkbox" id={`user-${user.id}`} label={
                        <div className="d-flex align-items-center">
                          <Image src={user.avatar} roundedCircle className="avatar avatar-xs me-2" />
                          {user.name}
                        </div>
                      }
                      />
                    </div>
                  ))}
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateGroup(false)}>Cancel</Button>
            <Button variant="primary" disabled={!newGroupName.trim()} onClick={() => {
              setShowCreateGroup(false);
              setNewGroupName('');
            }}>
              Create Group
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ChatSidebar;
