import React, { useState } from 'react';
import { Navbar, Nav, Image, Collapse } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useSidebar } from '../../contexts/SidebarContext';

// images
import LogoDark from "../../images/logo-dark.svg";
import LogoLight from "../../images/logo-light.svg";
import LogoSm from "../../images/logo_sm.svg";

// sidebar data
import sidebarData from '../../data/sidebar/sidebar-data.json';

// Helper to normalize paths (remove trailing slashes)
const normalizePath = (path) => (path || '').replace(/\/+$/, '');

// NavItem component for rendering individual navigation items
const NavItem = ({ item, location, toggleSection, openSection, closeSidebarOnMobile }) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const isSubActive = hasSubItems && item.subItems.some((subItem) => {
    const subPath = normalizePath(subItem.path);
    return (
      location.pathname === subPath ||
      location.pathname.startsWith(`${subPath}/`)
    );
  });

  const isActive = hasSubItems
    ? isSubActive
    : (() => {
        const itemPath = normalizePath(item.path);
        return (
          location.pathname === itemPath ||
          location.pathname.startsWith(`${itemPath}/`)
        );
      })();

  return (
    <div className="nav-item">
      {hasSubItems ? (
        <>
          <Nav.Link
            onClick={() => toggleSection(item.title.toLowerCase())}
            aria-controls={`${item.title.toLowerCase()}-collapse`}
            aria-expanded={openSection === item.title.toLowerCase()}
            className={`menu-drop-btn ${isActive ? 'active' : ''}`}
          >
            <div className='drop-link-title'>
              <i className={`${item.icon} menu-icon`}></i>
              <span className="menu-text">{item.title}</span>
            </div>
            <i className="ri-arrow-down-s-line menu-arrow"></i>
          </Nav.Link>
          <Collapse className='sub-menu'
            in={openSection === item.title.toLowerCase() || isSubActive}
          >
            <div id={`${item.title.toLowerCase()}-collapse`}>
              <Nav className="flex-column">
                {item.subItems.map((subItem, subIndex) => {
                  const subPath = normalizePath(subItem.path);
                  const isSubItemActive =
                    location.pathname === subPath ||
                    location.pathname.startsWith(`${subPath}/`);

                  return (
                    <Nav.Link
                      key={subIndex}
                      as={Link}
                      to={subItem.path}
                      onClick={closeSidebarOnMobile}
                      className={isSubItemActive ? 'active' : ''}
                    >
                      {subItem.title}
                    </Nav.Link>
                  );
                })}
              </Nav>
            </div>
          </Collapse>
        </>
      ) : (
        <Nav.Link as={Link} to={item.path} onClick={closeSidebarOnMobile} className={isActive ? 'active' : ''}>
          <i className={`${item.icon} menu-icon`}></i>
          <span className='menu-text'>{item.title}</span>
        </Nav.Link>
      )}
    </div>
  );
};

// Section component for rendering each section with its items
const Section = ({ title, items, location, toggleSection, openSection, closeSidebarOnMobile }) => (
  <>
    {title && <span className='menu-title'>{title}</span>}
    {items.map((item, index) => (
      <NavItem key={index} item={item} location={location} toggleSection={toggleSection} openSection={openSection} closeSidebarOnMobile={closeSidebarOnMobile} />
    ))}
  </>
);

export default function LeftSideBar() {
  const [openSection, setOpenSection] = useState('');
  const location = useLocation();
  const { toggleSidebar, isSidebarSmall, closeSidebarOnMobile } = useSidebar();

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  return (
    <div className="left-sidebar">
      <div className='main-logo'>
        <Link to="/" className="logo-sm"><Image src={LogoSm} alt="Small Logo" height={28} /></Link>
        <Link to="/" className="logo-dark"><Image src={LogoDark} alt="Large Logo" height={28} /></Link>
        <Link to="/" className="logo-light"><Image src={LogoLight} alt="Large Logo" height={28} /></Link>
        <Link className="left-menu-icon" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
          <i className={isSidebarSmall ? 'ri-arrow-right-wide-line menu-close-icon' : 'ri-arrow-left-wide-line menu-close-icon fs-24'}></i>
        </Link>
      </div>
      <SimpleBar className='menu-simplebar'>
        <div className='leftbar-menu'>
          <Navbar expand="lg" className="flex-column align-items-start">
            <Nav className="flex-column">
              {sidebarData.sections.map((section, index) => (
                <Section key={index} title={section.title} items={section.items} location={location} toggleSection={toggleSection} openSection={openSection} closeSidebarOnMobile={closeSidebarOnMobile} />
              ))}
            </Nav>
          </Navbar>
        </div>
      </SimpleBar>
    </div>
  );
}