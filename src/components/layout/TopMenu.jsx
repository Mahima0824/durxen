import React, { useState } from "react";
import { Dropdown, Form, DropdownButton, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import TopbarData from './topbar-data.json';
import SimpleBar from "simplebar-react";
import { useSidebar } from "../../contexts/SidebarContext";

// images
import UserImg from '../../images/user/avatar-1.jpg';
import FlagEn from '../../images/flag/english.png';
import FlagEs from '../../images/flag/spanish.png';
import FlagFr from '../../images/flag/france.png';
import FlagDe from '../../images/flag/german.png';
import FlagJp from '../../images/flag/japanese.png';

const languages = [
    { id: "en", name: "English", flag: FlagEn },
    { id: "es", name: "Spanish", flag: FlagEs },
    { id: "fr", name: "French", flag: FlagFr },
    { id: "de", name: "German", flag: FlagDe },
    { id: "jp", name: "Japanese", flag: FlagJp },
];

export default function TopMenu() {
    const [isFullscreen, setIsFullscreen] = useState(false);
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
    // Language selection
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const handleSelect = (langId) => {
        const selected = languages.find((lang) => lang.id === langId);
        setSelectedLanguage(selected);
    };

    // Get sidebar state and handlers from context
    const {
        isSidebarSmall,
        toggleSidebar: handleToggle
    } = useSidebar();

    return (
        <>
            <div className="topbar">
                <div className="topbar-content">
                    <div className="top-left-content">
                        <Link className="text-dark top-menu-icon" onClick={handleToggle}>
                            {isSidebarSmall ? (
                                <i className="ri-arrow-right-wide-line menu-close-icon"></i>
                            ) : (
                                <i className="ri-menu-2-fill menu-open-icon"></i>
                            )}
                        </Link>
                        <div className="topbar-search d-none d-md-block">
                            <div className="topbar-search-input">
                                <Form.Control type="text" placeholder="Search..." className="rounded-pill" id="top-search-lg" name="top-search-lg" />
                                <i className="ri-search-2-line top-search-icon"></i>
                            </div>
                        </div>
                    </div>
                    <div className="top-right-content">
                        <DropdownButton className="topbar-icon drop-menu-lg d-md-none d-block" variant="link" align="end"
                            title={
                                <div className="avatar avatar-sm">
                                    <i className="ri-search-2-line top-search-icon"></i>
                                </div>
                            }
                            id="dropdown-menu-align-end"
                        >
                            <div className="dropdown-header d-flex align-items-center justify-content-between p-0">
                                <Form.Control type="text" placeholder="Search..." className="rounded-pill" id="top-search-sm" name="top-search-sm" />
                            </div>
                        </DropdownButton>

                        <div className="topbar-icon drop-item-with-icon" onClick={toggleFullscreen}>
                            <i className={`ri-${isFullscreen ? 'fullscreen-exit' : 'fullscreen'}-line avatar avatar-sm cursor fs-5`}></i>
                        </div>
                        <DropdownButton className="topbar-icon drop-item-with-icon d-none d-md-block" variant="link" align="end"
                            title={
                                <div className="avatar avatar-sm">
                                    <img src={selectedLanguage.flag} alt={selectedLanguage.name} className="top-flag-img" />
                                </div>
                            }
                            id="language-dropdown"
                        >
                            {languages.map((lang) => (
                                <Dropdown.Item key={lang.id} eventKey={lang.id} onClick={() => handleSelect(lang.id)}>
                                    <img src={lang.flag} alt={lang.name} className="rounded-2 avatar-img-xxxs top-user-img" />{" "}
                                    {lang.name}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                        <DropdownButton className="topbar-icon drop-menu-lg d-none d-md-block" variant="link" align="end"
                            title={
                                <div className="avatar avatar-sm top-msg-noti">
                                    <i className="bi bi-chat"></i>
                                </div>
                            }
                            id="dropdown-menu-align-end"
                        >
                            <div className="dropdown-header d-flex align-items-center justify-content-between mb-1 px-0">
                                <h6 className="fs-18 mb-0">Chat Notifications</h6>
                                <Link to="" className="text-muted d-block lh-1"><i className="ri-settings-line fs-20"></i></Link>
                            </div>
                            <SimpleBar style={{ maxHeight: 320 }}>
                                {TopbarData.chatListData.map((data, i) =>
                                    <Dropdown.Item className="drop-noti-item" key={i}>
                                        <div className="d-flex">
                                            <div className="flex-shrink-0">
                                                <img src={require(`../../images/user/${data.userImg}`)} alt="" className='avatar-img-sm rounded-circle png-img-shadow-xs' />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1">{data.userName}</h6>
                                                <p className="text-muted fs-14 mb-0">{data.chatMsg}</p>
                                            </div>
                                            <h6 className="fs-13 text-nowrap text-muted ms-2 mt-1 mb-0">{data.chatTime}</h6>
                                        </div>
                                    </Dropdown.Item>
                                )}
                            </SimpleBar>
                            <Dropdown.Divider />
                            <Button variant="soft-primary" size="sm" className="w-100">View Chat</Button>
                        </DropdownButton>
                        <DropdownButton className="topbar-icon drop-menu-lg" variant="link" align="end"
                            title={
                                <div className="avatar avatar-sm top-msg-noti">
                                    <i className="bi bi-bell"></i>
                                </div>
                            }
                            id="dropdown-menu-align-end"
                        >
                            <div className="dropdown-header d-flex align-items-center justify-content-between mb-1 px-0">
                                <h6 className="fs-18 mb-0">Notifications (2)</h6>
                                <Link to="" className="text-muted d-block lh-1"><i className="ri-settings-line fs-20"></i></Link>
                            </div>
                            <SimpleBar style={{ maxHeight: 320 }}>
                                {TopbarData.notiListData.map((data, i) =>
                                    <Dropdown.Item className="drop-noti-item" key={i}>
                                        <div className="d-flex">
                                            <div className="flex-shrink-0">
                                                <div className={`avatar avatar-sm bg-soft-${data.avatarColor} text-${data.avatarColor} rounded border border-soft-${data.avatarColor}`}>
                                                    <i className={`bi ${data.notiName}`}></i>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1">{data.notiTitle}</h6>
                                                <p className="text-muted fs-14 mb-0">{data.notiDes}</p>
                                            </div>
                                            <h6 className="fs-13 text-nowrap text-muted ms-2 mt-1 mb-0">{data.notiTime}</h6>
                                        </div>
                                    </Dropdown.Item>
                                )}
                            </SimpleBar>
                            <Dropdown.Divider />
                            <Button variant="soft-primary" size="sm" className="w-100">View All Notifications</Button>
                        </DropdownButton>
                        <DropdownButton className="topbar-user-drop drop-item-with-icon" variant="link" align="end"
                            title={
                                <div className="topbar-user">
                                    <Image src={UserImg} alt="" className="rounded-circle avatar-img-sm top-user-img" />
                                    <span className="topbar-user-name">Harriet Sykes</span>
                                </div>
                            }
                            id="dropdown-menu-align-end"
                        >
                            <Dropdown.Header>
                                <div className="d-flex align-items-center">
                                    <Image src={UserImg} alt="avatar-img" rounded className="avatar-img-sm me-2" />
                                    <div>
                                        <h6 className='d-block mb-0'>Harriet Sykes</h6>
                                        <p className='text-muted fw-normal fs-14 mb-0'>Founder</p>
                                    </div>
                                </div>
                            </Dropdown.Header>
                            <Dropdown.Item eventKey="1"><i className="ri-user-line drop-icon"></i> Profile</Dropdown.Item>
                            <Dropdown.Item eventKey="2"><i className="ri-puzzle-2-line drop-icon"></i> Integration</Dropdown.Item>
                            <Dropdown.Item eventKey="3"><i className="ri-settings-line drop-icon"></i> Setting</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4"><i className="ri-bar-chart-line drop-icon"></i> Analytics</Dropdown.Item>
                            <Dropdown.Item eventKey="5"><i className="ri-customer-service-2-line drop-icon"></i> Support</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as={Link} to="/auth/sign_in" eventKey="6"><i className="ri-logout-circle-r-line drop-icon"></i> Logout</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </div>
        </>
    )
}
