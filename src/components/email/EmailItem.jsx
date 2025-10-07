import React from 'react'
import { Badge, Button, Form, Image, ListGroup } from 'react-bootstrap';
import avatar1 from '../../images/user/avatar-1.jpg';
import avatar2 from '../../images/user/avatar-2.jpg';
import avatar3 from '../../images/user/avatar-3.jpg';
import avatar4 from '../../images/user/avatar-4.jpg';
import avatar5 from '../../images/user/avatar-5.jpg';
import avatar6 from '../../images/user/avatar-6.jpg';
import avatar7 from '../../images/user/avatar-7.jpg';
import avatar8 from '../../images/user/avatar-8.jpg';

const EmailItem = ({ email, onStar, onSelect, selected, onViewDetail }) => {
    const images = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8];
   
       const getCategoryColor = (category) => {
           const colors = {
               Work: 'primary',
               Social: 'info',
               Updates: 'warning',
               Promotions: 'success',
               Personal: 'danger',
               Support: 'secondary',
               Entertainment: 'dark'
           };
           return colors[category] || 'secondary';
       };
   
       return (
           <ListGroup.Item className="py-3 border-0 border-bottom">
               <div className="email-item d-flex align-items-center">
                   {/* Checkbox and Star */}
                   <div className="d-flex gap-3 align-items-center me-3">
                       <Form.Check className="" checked={selected}
                           onChange={(e) => {
                               e.stopPropagation();
                               onSelect(email.id);
                           }}
                       />
                       <div className="star-icon rounded-circle" onClick={(e) => {
                           e.stopPropagation();
                           onStar(email.id);
                       }}>
                           {email.starred ? (
                               <i className="bi bi-star-fill text-primary" />
                           ) : (
                               <i className="bi bi-star text-muted opacity-50" />
                           )}
                       </div>
                   </div>
   
                   {/* Email Content */}
                   <div className="d-flex flex-fill overflow-hidden" onClick={() => onViewDetail(email)}>
                       <div className="d-flex align-items-center w-100">
                           {/* Sender Avatar */}
                           <div className="position-relative me-3">
                               <Image src={images[email.id % images.length]} alt={email.sender} className="avatar avatar-img-sm rounded-circle"/>
                               {email.unread && (
                                   <span className="position-absolute top-0 end-0 translate-middle p-1 bg-primary border border-2 border-white rounded-circle">
                                       <span className="visually-hidden">Unread</span>
                                   </span>
                               )}
                           </div>
   
                           {/* Email Details */}
                           <div className="d-flex flex-column flex-fill overflow-hidden">
                               <div className="d-flex align-items-center mb-1">
                                   <span className={`fw-medium me-2 text-truncate ${email.unread ? 'text-dark' : 'text-muted'}`}>
                                       {email.sender}
                                   </span>
   
                                   <div className="ms-auto d-flex gap-2 align-items-center">
                                       <Badge bg={`soft-${getCategoryColor(email.category)}`}>{email.category}</Badge>
                                       <small className="text-muted text-nowrap">{email.time}</small>
                                       {email.hasAttachment && (
                                           <i className="ri-attachment-2 ms-2 text-muted" />
                                       )}
                                   </div>
                               </div>
   
                               <div className="d-flex align-items-center email-text-content">
                                   <p className="mb-0 fs-14 email-text">
                                       <span className={`${email.unread ? '' : ''} text-dark`}>{email.subject}</span>
                                       <span className="text-muted ms-2 d-none d-md-inline">- {email.preview}</span>
                                   </p>
                                   {/* Action Buttons */}
                                   <div className="email-action-icon d-flex align-items-center">
                                       <Button variant="link" size="sm" className="p-1 text-muted" title="Archive"><i className="ri-archive-line" /></Button>
                                       <Button variant="link" size="sm" className="p-1 text-muted" title="Delete"><i className="ri-delete-bin-line" /></Button>
                                       <Button variant="link" size="sm" className="p-1 text-muted" title="Mark as unread"><i className="ri-mail-line" /></Button>
                                       <Button variant="link" size="sm" className="p-1 text-muted" title="Snooze"><i className="ri-time-line" /></Button>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </ListGroup.Item>
       );
   };

export default EmailItem;
