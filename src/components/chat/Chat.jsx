import React, { useState, useRef, useEffect, } from 'react';
import Footer from '../layout/Footer';
import PageTitle from '../layout/PageTitle';
import { Container, Row, Col, Card, Form, InputGroup, Button, Modal, Dropdown, ListGroup, Image, Offcanvas } from 'react-bootstrap';
import EmojiPicker from 'emoji-picker-react';
import SimpleBar from 'simplebar-react';
import ChatSidebar from './ChatSidebar';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import user1 from '../../images/user/avatar-1.jpg';
import user2 from '../../images/user/avatar-2.jpg';
import user3 from '../../images/user/avatar-3.jpg';
import user4 from '../../images/user/avatar-4.jpg';
import user5 from '../../images/user/avatar-5.jpg';
import card1 from "../../images/card-img/card-img-1.jpg";
import card2 from "../../images/card-img/card-img-2.jpg";
import card3 from "../../images/card-img/card-img-3.jpg";
import card4 from "../../images/card-img/card-img-4.jpg";
import VoiceCall from './VoiceCall';
import VideoCall from './VideoCall';

// Sample chat data
const conversations = [
    {
        id: 1,
        name: 'John Doe',
        lastMessage: 'Check out these photos!',
        time: '10:30 AM',
        unread: 2,
        avatar: user4,
        online: true,
        status: 'Hey there! I am using DurXen.'
    },
    {
        id: 2,
        name: 'Sarah Smith',
        lastMessage: 'Meeting at 2 PM',
        time: '9:15 AM',
        unread: 0,
        avatar: user2,
        online: true
    },
    {
        id: 3,
        name: 'Team Standup',
        lastMessage: 'Mike: I\'ll be late today',
        time: 'Yesterday',
        unread: 5,
        avatar: user3,
        isGroup: true,
        members: 8
    },
    {
        id: 4,
        name: 'Alex Johnson',
        lastMessage: 'Thanks for the update!',
        time: 'Yesterday',
        unread: 0,
        avatar: user4,
        online: false
    },
    {
        id: 5,
        name: 'Marketing Team',
        lastMessage: 'New campaign draft ready for review',
        time: '7/25/23',
        unread: 0,
        avatar: user5,
        isGroup: true,
        members: 12
    },
    {
        id: 6,
        name: 'Emily Davis',
        lastMessage: 'Love the new design!',
        time: 'Today',
        unread: 1,
        avatar: user1,
        online: true
    },
    {
        id: 7,
        name: 'Michael Brown',
        lastMessage: 'Can you review this?',
        time: '11:45 AM',
        unread: 0,
        avatar: user3,
        online: false
    }, {
        id: 8,
        name: 'Kamal',
        lastMessage: 'Hello!',
        time: 'Today',
        unread: 0,
        avatar: user4,
        online: false
    },
    {
        id: 9,
        name: 'Sarah',
        lastMessage: 'See you tomorrow!',
        time: 'Yesterday',
        unread: 0,
        avatar: user2,
        online: true
    },
    {
        id: 10,
        name: 'David Wilson',
        lastMessage: 'Great work on the project',
        time: '2:30 PM',
        unread: 3,
        avatar: user5,
        online: true
    },
    {
        id: 11,
        name: 'Lisa Anderson',
        lastMessage: 'Thanks for your help!',
        time: 'Monday',
        unread: 0,
        avatar: user1,
        online: false
    },
    {
        id: 12,
        name: 'James Taylor',
        lastMessage: 'Let\'s catch up soon',
        time: 'Last week',
        unread: 0,
        avatar: user4,
        online: false
    },
    {
        id: 13,
        name: 'Jennifer White',
        lastMessage: 'Amazing photos!',
        time: '3:00 PM',
        unread: 2,
        avatar: user2,
        online: true
    },
    {
        id: 14,
        name: 'Robert Martin',
        lastMessage: 'Meeting rescheduled to 4 PM',
        time: '1:15 PM',
        unread: 1,
        avatar: user3,
        online: false
    },
    {
        id: 15,
        name: 'Design Team',
        lastMessage: 'New mockups are ready',
        time: '12:00 PM',
        unread: 4,
        avatar: user5,
        isGroup: true,
        members: 6
    }
];

// Sample messages for each conversation
const conversationMessages = {
    1: [
        { id: 1, sender: 'them', text: 'Hey there!', time: '10:00 AM' },
        { id: 2, sender: 'me', text: 'Hi! How are you?', time: '10:02 AM' },
        { id: 3, sender: 'them', text: 'Pretty good! Just working on some new features.', time: '10:05 AM' },
        { id: 4, sender: 'me', text: 'That sounds interesting! What kind of features?', time: '10:07 AM' },
        { id: 5, sender: 'them', text: 'I\'m working on a chat application with typing indicators.', time: '10:09 AM' },
        {
            id: 6,
            sender: 'me',
            text: 'Check out these photos!',
            time: '10:03 AM',
            attachments: [
                { id: 'att1', url: card1, type: 'image/jpeg', name: 'design-1' },
                { id: 'att2', url: card2, type: 'image/jpeg', name: 'design-2' },
                { id: 'att3', url: card3, type: 'image/jpeg', name: 'design-3' },
                { id: 'att4', url: card4, type: 'image/jpeg', name: 'design-4' }
            ]
        },
        { id: 7, sender: 'them', text: 'Wow! These look amazing!', time: '10:11 AM' },
    ],
    2: [
        { id: 1, sender: 'them', text: 'Meeting at 2 PM', time: '9:15 AM' },
        { id: 2, sender: 'me', text: 'I\'ll be there!', time: '9:20 AM' },
        { id: 3, sender: 'them', text: 'Great! Don\'t forget the documents', time: '9:25 AM' },
    ],
    3: [
        { id: 1, sender: 'them', text: 'Mike: I\'ll be late today', time: 'Yesterday' },
        { id: 2, sender: 'me', text: 'No problem, we\'ll start without you.', time: 'Yesterday' },
        { id: 3, sender: 'them', text: 'Sarah: Thanks for understanding', time: 'Yesterday' },
    ],
    4: [
        { id: 1, sender: 'them', text: 'Thanks for the update!', time: 'Yesterday' },
        { id: 2, sender: 'me', text: 'You\'re welcome!', time: 'Yesterday' },
    ],
    5: [
        { id: 1, sender: 'them', text: 'New campaign draft ready for review', time: '7/25/23' },
        { id: 2, sender: 'me', text: 'Great! I\'ll check it out.', time: '7/25/23' },
        {
            id: 3,
            sender: 'them',
            text: 'Here are the mockups',
            time: '7/25/23',
            attachments: [
                { id: 'att5', url: card1, type: 'image/jpeg', name: 'campaign-1' },
                { id: 'att6', url: card2, type: 'image/jpeg', name: 'campaign-2' }
            ]
        },
    ],
    6: [
        { id: 1, sender: 'them', text: 'Love the new design!', time: 'Today' },
        { id: 2, sender: 'me', text: 'Thank you! I worked hard on it.', time: 'Today' },
        {
            id: 3,
            sender: 'me',
            text: 'What do you think about the color scheme?',
            time: 'Today',
            attachments: [
                { id: 'att7', url: card3, type: 'image/jpeg', name: 'color-scheme' }
            ]
        },
        { id: 4, sender: 'them', text: 'Perfect! The colors match our brand perfectly.', time: 'Today' },
    ],
    7: [
        { id: 1, sender: 'them', text: 'Can you review this?', time: '11:45 AM' },
        { id: 2, sender: 'me', text: 'Sure, send it over.', time: '11:50 AM' },
        {
            id: 3,
            sender: 'them',
            text: 'Here\'s the document',
            time: '11:52 AM',
            attachments: [
                { id: 'att8', url: card4, type: 'image/jpeg', name: 'document-preview' }
            ]
        },
    ],
    8: [
        { id: 1, sender: 'them', text: 'Hello!', time: 'Today' },
        { id: 2, sender: 'me', text: 'Hi Kamal! How are you?', time: 'Today' },
        { id: 3, sender: 'them', text: 'Doing great! Want to grab coffee?', time: 'Today' },
    ],
    9: [
        { id: 1, sender: 'them', text: 'See you tomorrow!', time: 'Yesterday' },
        { id: 2, sender: 'me', text: 'Looking forward to it!', time: 'Yesterday' },
    ],
    10: [
        { id: 1, sender: 'them', text: 'Great work on the project', time: '2:30 PM' },
        { id: 2, sender: 'me', text: 'Thanks! Really enjoyed working on it.', time: '2:35 PM' },
        {
            id: 3,
            sender: 'me',
            text: 'Here\'s the final version',
            time: '2:40 PM',
            attachments: [
                { id: 'att9', url: card1, type: 'image/jpeg', name: 'final-v1' },
                { id: 'att10', url: card2, type: 'image/jpeg', name: 'final-v2' },
                { id: 'att11', url: card3, type: 'image/jpeg', name: 'final-v3' }
            ]
        },
    ],
    11: [
        { id: 1, sender: 'them', text: 'Thanks for your help!', time: 'Monday' },
        { id: 2, sender: 'me', text: 'Anytime! Happy to help.', time: 'Monday' },
    ],
    12: [
        { id: 1, sender: 'them', text: 'Let\'s catch up soon', time: 'Last week' },
        { id: 2, sender: 'me', text: 'Definitely! How about next week?', time: 'Last week' },
    ],
    13: [
        { id: 1, sender: 'them', text: 'Amazing photos!', time: '3:00 PM' },
        {
            id: 2,
            sender: 'me',
            text: 'Thanks! Took them on vacation',
            time: '3:05 PM',
            attachments: [
                { id: 'att12', url: card1, type: 'image/jpeg', name: 'vacation-1' },
                { id: 'att13', url: card2, type: 'image/jpeg', name: 'vacation-2' },
                { id: 'att14', url: card3, type: 'image/jpeg', name: 'vacation-3' },
                { id: 'att15', url: card4, type: 'image/jpeg', name: 'vacation-4' }
            ]
        },
        { id: 3, sender: 'them', text: 'Wow! Beautiful locations!', time: '3:10 PM' },
    ],
    14: [
        { id: 1, sender: 'them', text: 'Meeting rescheduled to 4 PM', time: '1:15 PM' },
        { id: 2, sender: 'me', text: 'No problem, I\'ll be there.', time: '1:20 PM' },
    ],
    15: [
        { id: 1, sender: 'them', text: 'New mockups are ready', time: '12:00 PM' },
        {
            id: 2,
            sender: 'me',
            text: 'Here are the latest designs',
            time: '12:05 PM',
            attachments: [
                { id: 'att16', url: card1, type: 'image/jpeg', name: 'mockup-1' },
                { id: 'att17', url: card2, type: 'image/jpeg', name: 'mockup-2' },
                { id: 'att18', url: card3, type: 'image/jpeg', name: 'mockup-3' }
            ]
        },
        { id: 3, sender: 'them', text: 'These look fantastic!', time: '12:10 PM' },
    ],
};

// Typing indicators for each conversation
// Default demo: chats 2 and 5 typing ON until first interaction
const typingIndicators = {
    1: false,
    2: true,
    3: false,
    4: false,
    5: true,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
};

const Chat = React.forwardRef((props, ref) => {
    const [activeChat, setActiveChat] = useState(1);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [allConversationMessages, setAllConversationMessages] = useState(conversationMessages);
    const [allTypingIndicators, setAllTypingIndicators] = useState(typingIndicators);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showForwardModal, setShowForwardModal] = useState(false);
    /* removed unused selectedMessage state */
    const [replyTo, setReplyTo] = useState(null);
    const [forwardContacts] = useState([
        { id: 1, name: 'John Doe', avatar: user1, online: true },
        { id: 2, name: 'Sarah Smith', avatar: user2, online: true },
        { id: 4, name: 'Alex Johnson', avatar: user4, online: false },
    ]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [attachments, setAttachments] = useState([]);
    /* removed unused showEmojiPicker state */
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const profileDropdownRef = useRef(null);
    const messagesEndRef = useRef(null);
    const messageInputRef = useRef(null);
    const fileInputRef = useRef(null);

    // Initialize and cleanup Fancybox
    useEffect(() => {
        // Destroy any existing Fancybox instances
        Fancybox.destroy();

        // Add a small delay to ensure DOM is updated
        const timer = setTimeout(() => {
            // Initialize Fancybox for image gallery with unique selector
            Fancybox.bind(`[data-fancybox="chat-gallery-${activeChat}"]`, {
                Toolbar: {
                    display: {
                        left: ["infobar"],
                        middle: [],
                        right: ["iterateZoom", "slideshow", "fullscreen", "download", "thumbs", "close"]
                    }
                },
                Thumbs: {
                    autoStart: true,
                },
                infinite: true,
                wheel: "slide",
                // Add error handling
                on: {
                    error: (fancybox, slide) => {
                        console.error('Fancybox error:', slide);
                    }
                }
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            Fancybox.destroy();
        };
    }, [allConversationMessages, activeChat]); // Re-initialize when messages or activeChat changes

    // Toggle sidebar for mobile
    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const closeSidebar = () => setShowSidebar(false);

    // Get messages for active conversation
    const messages = allConversationMessages[activeChat] || [];
    const isTyping = allTypingIndicators[activeChat] || false;

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, activeChat]);

    // Close dropdown when clicking outside and clean up object URLs
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup function
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);

            // Clean up object URLs when component unmounts or attachments change
            attachments.forEach(attachment => {
                if (attachment.preview && attachment.preview.startsWith('blob:')) {
                    URL.revokeObjectURL(attachment.preview);
                }
                if (attachment.url && typeof attachment.url === 'string' && attachment.url.startsWith('blob:')) {
                    URL.revokeObjectURL(attachment.url);
                }
            });
        };
    }, [showProfileDropdown, attachments]);

    const handleEmojiClick = (emojiData) => {
        setMessage(prev => prev + emojiData.emoji);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message.trim() === '' && attachments.length === 0) return;

        // Convert files to base64 for persistent storage
        const processedAttachments = await Promise.all(
            attachments.map(async (att) => {
                if (att.file && att.type === 'image') {
                    try {
                        // Convert file to base64
                        const base64 = await convertFileToBase64(att.file);
                        return {
                            ...att,
                            url: base64,
                            name: att.name || 'image',
                            type: att.type || 'image',
                            originalFile: null // Remove file reference to prevent memory leaks
                        };
                    } catch (error) {
                        console.error('Error converting file to base64:', error);
                        return {
                            ...att,
                            url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyMEM0Ni42Mjc0IDIwIDUyIDI1LjM3MjYgNTIgMzJDNTIgMzguNjI3NCA0Ni42Mjc0IDQ0IDQwIDQ0QzMzLjM3MjYgNDQgMjggMzguNjI3NCAyOCAzMkMyOCAyNS4zNzI2IDMzLjM3MjYgMjAgNDAgMjBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCA2MEg2MFY1Nkw1MiA0OEw0NCA1Nkw0MCA1Mkw0NCA0OEw1MiA1NkwzNiA0MEwyOCA0OEwyMCA1NlY2MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+',
                            name: att.name || 'Failed to load',
                            type: att.type || 'image'
                        };
                    }
                } else {
                    return {
                        ...att,
                        url: att.preview || att.url || '#',
                        name: att.name || 'document',
                        type: att.type || 'document'
                    };
                }
            })
        );

        const currentMessages = allConversationMessages[activeChat] || [];
        const newMessage = {
            id: Math.max(...currentMessages.map(m => m.id), 0) + 1,
            sender: 'me',
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            replyTo: replyTo?.id || null,
            attachments: processedAttachments
        };

        // Update messages for the active conversation
        setAllConversationMessages(prev => ({
            ...prev,
            [activeChat]: [...(prev[activeChat] || []), newMessage]
        }));

        // Update last message in conversations list
        const conversationIndex = conversations.findIndex(c => c.id === activeChat);
        if (conversationIndex !== -1) {
            conversations[conversationIndex].lastMessage = message;
            conversations[conversationIndex].time = newMessage.time;
        }

        setMessage('');

        // Clean up attachment preview URLs
        attachments.forEach(att => {
            if (att.preview && att.preview.startsWith('blob:')) {
                URL.revokeObjectURL(att.preview);
            }
        });
        setAttachments([]);
        setReplyTo(null);

        // Simulate typing indicator from other person after 2 seconds
        setTimeout(() => {
            // Show typing in chats 4 and 5
            setAllTypingIndicators(prev => ({ 
                ...prev, 
                4: true,
                5: true 
            }));
            
            // Simulate receiving messages in chats 4 and 5 after 3 seconds
            setTimeout(() => {
                const responses4 = [
                    'Hey! How are you doing?',
                    'Did you see my last message?',
                    'Let me know when you\'re free',
                    'Great to hear from you!',
                    'Thanks for reaching out!'
                ];
                const responses5 = [
                    'Working on something new',
                    'Can you review this when you get time?',
                    'Meeting went well today',
                    'Thanks for your help earlier',
                    'Looking forward to our chat!'
                ];
                
                const randomResponse4 = responses4[Math.floor(Math.random() * responses4.length)];
                const randomResponse5 = responses5[Math.floor(Math.random() * responses5.length)];
                
                // Add message to chat 4
                const responseMessage4 = {
                    id: Math.max(...(allConversationMessages[4] || []).map(m => m.id), 0) + 1,
                    sender: 'them',
                    text: randomResponse4,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                
                // Add message to chat 5
                const responseMessage5 = {
                    id: Math.max(...(allConversationMessages[5] || []).map(m => m.id), 0) + 1,
                    sender: 'them',
                    text: randomResponse5,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                
                setAllConversationMessages(prev => ({
                    ...prev,
                    4: [...(prev[4] || []), responseMessage4],
                    5: [...(prev[5] || []), responseMessage5]
                }));
                
                // Update last message in conversations list for chat 4
                const convIndex4 = conversations.findIndex(c => c.id === 4);
                if (convIndex4 !== -1) {
                    conversations[convIndex4].lastMessage = randomResponse4;
                    conversations[convIndex4].time = responseMessage4.time;
                }
                
                // Update last message in conversations list for chat 5
                const convIndex5 = conversations.findIndex(c => c.id === 5);
                if (convIndex5 !== -1) {
                    conversations[convIndex5].lastMessage = randomResponse5;
                    conversations[convIndex5].time = responseMessage5.time;
                }
                
                // Remove typing indicator
                setAllTypingIndicators(prev => ({ 
                    ...prev, 
                    4: false,
                    5: false 
                }));
            }, 3000);
        }, 2000);
    };

    // Helper function to convert file to base64
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleCopyMessage = (text) => {
        navigator.clipboard.writeText(text);
    };

    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);

        const newAttachments = await Promise.all(
            files.map(async (file) => {
                const attachment = {
                    id: Date.now() + Math.random().toString(36).substr(2, 9),
                    file,
                    type: file.type.startsWith('image/') ? 'image' : 'document',
                    name: file.name,
                    size: file.size
                };

                // Create preview URL for images
                if (file.type.startsWith('image/')) {
                    try {
                        // Convert to base64 immediately for persistent preview
                        attachment.preview = await convertFileToBase64(file);
                    } catch (error) {
                        console.error('Error creating preview:', error);
                        attachment.preview = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyMEM0Ni42Mjc0IDIwIDUyIDI1LjM3MjYgNTIgMzJDNTIgMzguNjI3NCA0Ni42Mjc0IDQ0IDQwIDQ0QzMzLjM3MjYgNDQgMjggMzguNjI3NCAyOCAzMkMyOCAyNS4zNzI2IDMzLjM3MjYgMjAgNDAgMjBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCA2MEg2MFY1Nkw1MiA0OEw0NCA1Nkw0MCA1Mkw0NCA0OEw1MiA1NkwzNiA0MEwyOCA0OEwyMCA1NlY2MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                    }
                }

                return attachment;
            })
        );

        setAttachments([...attachments, ...newAttachments]);
    };

    const removeAttachment = (id) => {
        // No need to revoke URLs since we're using base64 now
        setAttachments(attachments.filter(att => att.id !== id));
    };

    const triggerFileInput = (type) => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = type === 'image' ? 'image/*' : type === 'document' ? '.pdf,.doc,.docx,.txt' : '*';
            fileInputRef.current.click();
        }
    };

    const handleDeleteMessage = (messageId) => {
        setAllConversationMessages(prev => ({
            ...prev,
            [activeChat]: (prev[activeChat] || []).filter(msg => msg.id !== messageId)
        }));
    };

    const handleForwardMessage = (message) => {
        setShowForwardModal(true);
    };

    const handleReplyToMessage = (message) => {
        setReplyTo(message);
        messageInputRef.current.focus();
    };

    const handleForward = () => {
        setShowForwardModal(false);
        setSelectedContacts([]);
    };

    const toggleContactSelect = (contact) => {
        if (selectedContacts.some(c => c.id === contact.id)) {
            setSelectedContacts(selectedContacts.filter(c => c.id !== contact.id));
        } else {
            setSelectedContacts([...selectedContacts, contact]);
        }
    };

    const [showVoiceCall, setShowVoiceCall] = useState(false);
    const [showVideoCall, setShowVideoCall] = useState(false);

    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeChatData = conversations.find(chat => chat.id === activeChat);
    const currentUserAvatar = user1;

    const MessageDropdown = ({ message }) => (
        <Dropdown align="end" className="message-actions">
            <Dropdown.Toggle variant="link" className="text-muted p-0 border-0 shadow-none">
                <i className="ri-more-2-fill"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleCopyMessage(message.text)}><i className="ri-file-copy-line me-2"></i> Copy</Dropdown.Item>
                <Dropdown.Item onClick={() => handleReplyToMessage(message)}><i className="ri-reply-line me-2"></i> Reply</Dropdown.Item>
                <Dropdown.Item onClick={() => handleForwardMessage(message)}><i className="ri-share-forward-line me-2"></i> Forward</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger" onClick={() => handleDeleteMessage(message.id)}><i className="ri-delete-bin-line me-2"></i> Delete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );

    // Image loading error handler
    const handleImageError = (e, att, idx) => {
        console.error('Image load error:', att.url);
        e.target.onerror = null;
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyMEM0Ni42Mjc0IDIwIDUyIDI1LjM3MjYgNTIgMzJDNTIgMzguNjI3NCA0Ni42Mjc0IDQ0IDQwIDQ0QzMzLjM3MjYgNDQgMjggMzguNjI3NCAyOCAzMkMyOCAyNS4zNzI2IDMzLjM3MjYgMjAgNDAgMjBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCA2MEg2MFY1Nkw1MiA0OEw0NCA1Nkw0MCA1Mkw0NCA0OEw1MiA1NkwzNiA0MEwyOCA0OEwyMCA1NlY2MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
        e.target.alt = 'Failed to load image';
    };

    return (
        <div className='page-wrapper'>
            <div className='page-content'>
                <PageTitle pagePrTitle="Apps" pageTitle="Chat" />
                <Container fluid className="chat-container">
                    <Card className="chat-card mb-0 overflow-hidden">
                        <Card.Body className="p-0">
                            <Row className="g-0">
                                {/* Sidebar Column - Always visible on desktop, offcanvas on mobile */}
                                <Col lg={4} xl={3} className="">
                                    {/* Mobile Offcanvas */}
                                    <div className="d-lg-none">
                                        <Offcanvas show={showSidebar} onHide={closeSidebar} className="w-40" placement="start">
                                            <Offcanvas.Header closeButton><Offcanvas.Title>Chats</Offcanvas.Title></Offcanvas.Header>
                                            <Offcanvas.Body className="p-0">
                                                <ChatSidebar
                                                    activeChat={activeChat}
                                                    setActiveChat={(id) => {
                                                        setActiveChat(id);
                                                        closeSidebar();
                                                    }}
                                                    searchTerm={searchTerm}
                                                    setSearchTerm={setSearchTerm}
                                                    filteredConversations={filteredConversations}
                                                    typingIndicators={allTypingIndicators}
                                                    onClose={closeSidebar}
                                                />
                                            </Offcanvas.Body>
                                        </Offcanvas>
                                    </div>

                                    {/* Desktop Sidebar - Only visible on lg and up */}
                                    <div className="d-none d-lg-block " >
                                        <ChatSidebar
                                            activeChat={activeChat}
                                            setActiveChat={setActiveChat}
                                            searchTerm={searchTerm}
                                            setSearchTerm={setSearchTerm}
                                            filteredConversations={filteredConversations}
                                            typingIndicators={allTypingIndicators}
                                        />
                                    </div>
                                </Col>

                                {/* Chat Area */}
                                <Col xs={12} lg={8} xl={9} >
                                <div className="d-flex flex-column h-100 position-relative"> 
                                    {/* Mobile chat header with back button */}
                                    {activeChatData && (
                                        <div className="d-flex d-lg-none align-items-center p-2 border-bottom">
                                            <Button variant="light" size="sm" className="me-2" onClick={toggleSidebar}><i className="ri-menu-2-line"></i></Button>
                                            <div className="d-flex align-items-center">
                                                <div className="position-relative me-2">
                                                    <Image src={activeChatData.avatar} roundedCircle width="36" height="36" className="border" />
                                                    {activeChatData.online && (
                                                        <span className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white" ></span>
                                                    )}
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 text-dark">{activeChatData.name}</h6>
                                                    <small className="text-muted">{activeChatData.online ? 'Online' : 'Last seen recently'}</small>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeChatData ? (
                                        <div>
                                            {/* Chat header - Desktop */}
                                            <div className="d-none d-lg-flex justify-content-between align-items-center p-3 border-bottom">
                                                <div className="d-flex align-items-center">
                                                    <div className="position-relative me-3">
                                                        <Image src={activeChatData.avatar} roundedCircle width="40" height="40" className="border" />
                                                        {activeChatData.online && (
                                                            <span className="position-absolute isOnline bottom-0 end-0 bg-success rounded-circle border border-white"></span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-0 text-dark">{activeChatData.name}</h6>
                                                        <small className="text-muted">{activeChatData.online ? 'Online' : 'Last seen recently'}</small>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center text-dark gap-4">
                                                    <i className="bi bi-telephone-outbound fs-24 cursor" onClick={() => setShowVoiceCall(true)}></i>
                                                    <div className="vr opacity-50"></div>
                                                    <i className="bi bi-camera-video fs-24 cursor" onClick={() => setShowVideoCall(true)}></i>
                                                </div>
                                            </div>

                                            {/* Chat messages */}
                                            <div className="chat-messages">
                                                <SimpleBar style={{ height: '100%' }} autoHide={false}>
                                                    <div className="d-flex flex-column p-3">
                                                        {messages.map((msg, index) => {
                                                            const isMe = msg.sender === 'me';
                                                            const replyMsg = msg.replyTo ? messages.find(m => m.id === msg.replyTo) : null;

                                                            return (
                                                                <div key={msg.id} className={`d-flex mb-3 gap-2 align-items-end ${isMe ? 'justify-content-end' : 'justify-content-start'}`}>
                                                                    {/* Avatar (left side for others) */}
                                                                    {!isMe && (
                                                                        <div className="me-2">
                                                                            <Image src={activeChatData.avatar} width={36} height={36} className={`border shadow-sm isYou`} />
                                                                        </div>
                                                                    )}

                                                                    {/* Message bubble + Dropdown aligned inline */}
                                                                    <div className={`d-flex flex-wrap ${isMe ? 'flex-row-reverse' : 'flex-row'} align-items-start gap-1 w-100`}>
                                                                        {/* Message Bubble */}
                                                                        <div className={`fs-14 max-w-80 w-auto ${isMe ? 'bg-primary text-white msg-bg-me' : 'bg-light text-dark msg-bg-you'}`} >
                                                                            {/* Reply Preview */}
                                                                            {msg.replyTo && (
                                                                                <div className={`small mb-2 p-2 rounded-3 ${isMe ? 'bg-white bg-opacity-25' : 'bg-secondary bg-opacity-10'}`}>
                                                                                    <div className="fw-semibold">Replying to {isMe ? 'You' : activeChatData.name}</div>
                                                                                    <div className="text-truncate small">
                                                                                        {replyMsg?.text || 'Message not found'}
                                                                                    </div>
                                                                                </div>
                                                                            )}

                                                                            {/* Actual message text */}
                                                                            {msg.text && <p className="mb-2">{msg.text}</p>}

                                                                            {/* Attachments with improved error handling */}
                                                                            {msg.attachments && msg.attachments.length > 0 && (
                                                                                <div className="mt-2 d-flex flex-wrap gap-2">
                                                                                    {msg.attachments.slice(0, 3).map((att, idx) => (
                                                                                        <div key={att.id || idx} className="mb-2">
                                                                                            {(att.type?.startsWith('image/') || att.type === 'image') && (
                                                                                                <div className="position-relative">
                                                                                                    <a href={att.url} data-fancybox={`chat-gallery-${activeChat}`} data-caption={att.name || `Image ${idx + 1}`} data-thumb={att.url}>
                                                                                                        <Image className="img-thumbnail chat-input-img cursor-pointer hover-zoom" src={att.url} alt={`Chat attachment ${idx + 1}`} loading="lazy"
                                                                                                            onError={(e) => handleImageError(e, att, idx)}
                                                                                                            onLoad={() => {
                                                                                                                // Re-initialize Fancybox after image loads
                                                                                                                setTimeout(() => {
                                                                                                                    Fancybox.bind(`[data-fancybox="chat-gallery-${activeChat}"]`);
                                                                                                                }, 100);
                                                                                                            }}
                                                                                                        />
                                                                                                    </a>

                                                                                                    {/* Overlay more count */}
                                                                                                    {idx === 2 && msg.attachments.length > 3 && (
                                                                                                        <a href={att.url} className="overlay-more cursor-pointer"
                                                                                                            data-fancybox={`chat-gallery-${activeChat}`}
                                                                                                            data-caption={`Image ${idx + 1} of ${msg.attachments.length}`}
                                                                                                        >
                                                                                                            +{msg.attachments.length - 3}
                                                                                                        </a>
                                                                                                    )}
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    ))}

                                                                                    {/* Hidden images for gallery (4th image onwards) */}
                                                                                    {msg.attachments.slice(3).map((att, idx) => (
                                                                                        <a key={`hidden-${att.id || idx}`} href={att.url}
                                                                                            data-fancybox={`chat-gallery-${activeChat}`}
                                                                                            data-caption={att.name || `Image ${idx + 4}`}
                                                                                            data-thumb={att.url}
                                                                                            style={{ display: 'none' }}
                                                                                        >
                                                                                            <span className="sr-only">{att.name || `Image ${idx + 4}`}</span>
                                                                                        </a>
                                                                                    ))}
                                                                                </div>
                                                                            )}

                                                                            {msg.typing && (
                                                                                <div className="typing-indicator d-flex align-items-center">
                                                                                    <small className="text-primary typing-text fw-medium">typing</small>
                                                                                    <span className="typing-dot"></span>
                                                                                    <span className="typing-dot"></span>
                                                                                    <span className="typing-dot"></span>
                                                                                </div>
                                                                            )}

                                                                            {/* Timestamp + Tick */}
                                                                            <div className="d-flex justify-content-end align-items-center gap-1 mt-1">
                                                                                <small className={isMe ? 'text-white-50' : 'text-muted'}>
                                                                                    {msg.time}
                                                                                </small>
                                                                                {isMe && <i className="ri-check-double-line text-white small" />}
                                                                            </div>
                                                                        </div>

                                                                        {/* Dropdown (beside bubble) */}
                                                                        {!msg.typing && (
                                                                            <div className="pt-1">
                                                                                <MessageDropdown message={msg} />
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    {/* Avatar (right side for "me") */}
                                                                    {isMe && (
                                                                        <div className="">
                                                                            <Image src={currentUserAvatar} width={36} height={36} className="shadow-sm isMe" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}

                                                        {/* Auto-scroll reference */}
                                                        <div ref={messagesEndRef} />
                                                        
                                                        {/* Typing indicator */}
                                                        {isTyping && (
                                                            <div className="d-flex mb-3 gap-2 align-items-end justify-content-start">
                                                                <div className="me-2">
                                                                    <Image src={activeChatData.avatar} width={36} height={36} className="border shadow-sm isYou" />
                                                                </div>
                                                                <div className="bg-light text-dark msg-bg-you fs-14 p-3 rounded-3">
                                                                    <div className="typing-indicator d-flex align-items-center">
                                                                        <small className="text-primary typing-text fw-medium">typing</small>
                                                                        <span className="typing-dot"></span>
                                                                        <span className="typing-dot"></span>
                                                                        <span className="typing-dot"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </SimpleBar>
                                            </div>

                                            {/* Message input */}
                                            <div className="p-3 border-top position-absolute bottom-0 w-100 bg-light">
                                                {/* Reply Preview */}
                                                {replyTo && (
                                                    <div className=" bg-light p-2 d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <small className="text-muted me-2">
                                                                Replying to: {replyTo.sender === 'me' ? 'You' : activeChatData.name}
                                                            </small>
                                                            <div className="text-truncate">
                                                                {replyTo.text}
                                                            </div>
                                                        </div>
                                                        <Button variant="link" size="sm" className="text-muted p-0" onClick={() => setReplyTo(null)}>
                                                            <i className="ri-close-line"></i>
                                                        </Button>
                                                    </div>
                                                )}
                                                {/* Preview attachments */}
                                                {attachments.length > 0 && (
                                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                                        {attachments.map(attachment => (
                                                            <div key={attachment.id} className="position-relative border rounded p-2 bg-white">
                                                                {attachment.type === 'image' ? (
                                                                    <Image src={attachment.preview} alt="Preview" className="img-thumbnail chat-input-img" />
                                                                ) : (
                                                                    <div className="d-flex align-items-center p-2">
                                                                        <i className="ri-file-line fs-3 me-2"></i>
                                                                        <div>
                                                                            <div className="small text-truncate">
                                                                                {attachment.name}
                                                                            </div>
                                                                            <div className="text-muted small">
                                                                                {(attachment.size / 1024).toFixed(1)} KB
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <Button variant="danger" className=" position-absolute top-0 end-0 p-0 avatar avatar-xxxs" onClick={() => removeAttachment(attachment.id)}>
                                                                    <i className="ri-delete-bin-line fs-14"></i>
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                <Form onSubmit={handleSendMessage} className="position-relative d-flex flex-md-nowrap flex-wrap-reverse gap-2">
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="" as={React.forwardRef(({ onClick }, ref) => (
                                                            <Button ref={ref} variant="gradient-primary" onClick={(e) => {
                                                                e.preventDefault();
                                                                onClick(e);
                                                            }}>
                                                                <i className="ri-emotion-line" aria-hidden="true"></i>
                                                            </Button>
                                                        ))}
                                                        />
                                                        <Dropdown.Menu className="p-0 border-0">
                                                            <Dropdown.ItemText className="p-0">
                                                                <EmojiPicker onEmojiClick={(emojiData) => {
                                                                    handleEmojiClick(emojiData);
                                                                }}
                                                                    width={300}
                                                                    height={350}
                                                                    previewConfig={{
                                                                        showPreview: false
                                                                    }}
                                                                />
                                                            </Dropdown.ItemText>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as={Button} variant="primary" className="border-end-0" aria-label="Attach file"><i className="ri-attachment-line"></i></Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => triggerFileInput('image')}><i className="ri-image-line me-2"></i> Photo or Video</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => triggerFileInput('document')}><i className="ri-file-line me-2"></i> Document</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => triggerFileInput('camera')}><i className="ri-camera-line me-2"></i> Use Camera</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    <InputGroup className=' rounded'>

                                                        <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="d-none" multiple />
                                                        <Form.Control ref={messageInputRef} type="text"  placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} className=" bg-light text-dark rounded-start   " />

                                                        <Button variant="primary" type="submit" ><i className="ri-send-plane-line"></i> <span className='ms-1 d-sm-inline-block d-none'>Send</span></Button>
                                                    </InputGroup>
                                                </Form>
                                            </div>

                                            {/* Forward Message Modal */}
                                            <Modal show={showForwardModal} centered onHide={() => setShowForwardModal(false)} className="forward-message-modal">
                                                <Modal.Header closeButton className="bg-light border-bottom-0 pb-2">
                                                    <Modal.Title className="d-flex align-items-center">
                                                        <i className="ri-share-forward-line me-2 text-primary"></i> <span>Forward Message</span>
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body className="pt-2">
                                                    <p className="mb-3 text-muted fw-light"><i className="ri-user-shared-line me-1"></i> Select contacts to forward to:</p>
                                                    <div className="contact-search mb-3">
                                                        <InputGroup className='bg-light border rounded'>
                                                            <InputGroup.Text className="border-0"><i className="ri-search-line text-muted "></i></InputGroup.Text>
                                                            <Form.Control placeholder="Search contacts..." className="border-0 bg-light" />
                                                        </InputGroup>
                                                    </div>
                                                    <ListGroup variant="flush" className="contact-list">
                                                        {forwardContacts.map(contact => (
                                                            <ListGroup.Item key={contact.id} className={`border-0 rounded mb-1 p-2 ${selectedContacts.some(c => c.id === contact.id) ? 'bg-light' : 'bg-light'}`} action onClick={() => toggleContactSelect(contact)}>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="form-check me-3">
                                                                        <input className="form-check-input border-primary" type="checkbox" id={`contact-${contact.id}`} checked={selectedContacts.some(c => c.id === contact.id)} onChange={(e) => e.stopPropagation()} />
                                                                    </div>
                                                                    <div className="position-relative me-3">
                                                                        <Image src={contact.avatar} roundedCircle width={48} height={48} className="border shadow-sm" />
                                                                        {contact.online && (
                                                                            <span className="position-absolute bottom-0 isOnline end-0 bg-success rounded-circle border border-white" />
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <h6 className="mb-0">{contact.name}</h6>
                                                                        <small className={`${contact.online ? 'text-success' : 'text-muted'}`}>
                                                                            <i className={`${contact.online ? 'ri-record-circle-fill me-1' : 'ri-time-line me-1'}`}></i>
                                                                            {contact.online ? 'Online' : 'Offline'}
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </ListGroup.Item>
                                                        ))}
                                                    </ListGroup>
                                                </Modal.Body>
                                                <Modal.Footer className="border-top-0 pt-1">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <small className="text-muted align-self-center">
                                                            {selectedContacts.length > 0 ?
                                                                `${selectedContacts.length} contact${selectedContacts.length > 1 ? 's' : ''} selected` :
                                                                'No contacts selected'}
                                                        </small>
                                                        <div>
                                                            <Button variant="light" className="me-2" onClick={() => setShowForwardModal(false)}><i className="ri-close-line me-1"></i> Cancel</Button>
                                                            <Button variant="primary" onClick={handleForward} disabled={selectedContacts.length === 0} className="px-4"><i className="ri-send-plane-fill me-1"></i> Forward</Button>
                                                        </div>
                                                    </div>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                        
                                    ) : (
                                        <div className="d-flex flex-column justify-content-center align-items-center h-100">
                                            <div className="text-center p-4">
                                                <div className="mb-4">
                                                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#dee2e6" />
                                                        <path d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z" fill="#dee2e6" />
                                                        <path d="M12 16C10.33 16 6 17.34 6 20V21C6 21.55 6.45 22 7 22H17C17.55 22 18 21.55 18 21V20C18 17.34 13.67 16 12 16ZM16 19H8V19.01C8.2 18.29 10.1 17.5 12 17.5C13.9 17.5 15.8 18.29 16 19Z" fill="#dee2e6" />
                                                    </svg>
                                                </div>
                                                <h5 className="mb-3">Select a chat to start messaging</h5>
                                                <p className="text-muted">Choose a conversation from the list or start a new one</p>
                                                <Button variant="primary" className="mt-2">New Message</Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
                {/* WhatsApp Style Call Modal */}
                <VoiceCall show={showVoiceCall} onHide={() => setShowVoiceCall(false)} contact={activeChatData || { name: 'User', avatar: user1 }}/>

                <VideoCall show={showVideoCall} onHide={() => setShowVideoCall(false)} contact={activeChatData || { name: 'User', avatar: user1 }} currentUserAvatar={user1} />
            </div>
            <Footer />
        </div>
    );
});

export default Chat;