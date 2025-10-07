import React from 'react';
import { Card, Col, Container, Row, Image } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import avatarData from '../../../data/ui/avatar.json';
import avatar1 from '../../../images/user/avatar-1.jpg';
import avatar2 from '../../../images/user/avatar-2.jpg';
import avatar3 from '../../../images/user/avatar-3.jpg';
import avatar4 from '../../../images/user/avatar-4.jpg';
import avatar5 from '../../../images/user/avatar-5.jpg';
import avatar6 from '../../../images/user/avatar-6.jpg';
import avatar7 from '../../../images/user/avatar-7.jpg';
import avatar8 from '../../../images/user/avatar-8.jpg';

// Import avatar images
const avatarImports = {
    'avatar-1.jpg': avatar1,
    'avatar-2.jpg': avatar2,
    'avatar-3.jpg': avatar3,
    'avatar-4.jpg': avatar4,
    'avatar-5.jpg': avatar5,
    'avatar-6.jpg': avatar6,
    'avatar-7.jpg': avatar7,
    'avatar-8.jpg': avatar8
};

// Helper function to get avatar image source
const getAvatarSrc = (src) => {
    const fileName = src.split('/').pop();
    return avatarImports[fileName] || src;
};

export default function Avatar() {
    return (
        <>
            <div className='page-wrapper'>
                <div className='page-content'>
                    <PageTitle pagePrTitle="UI Elements" pageTitle="Avatar" />
                    <Container fluid>
                        <Row>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Default Avatar</Card.Title>
                                        <div className='d-flex align-items-center flex-wrap gap-3'>
                                            {avatarData.defaultAvatars.map((avatar) => (
                                                <Image key={avatar.id} src={getAvatarSrc(avatar.src)} alt={avatar.alt} rounded className="avatar-img-md" />
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Avatar Rounded</Card.Title>
                                        <div className='d-flex align-items-center flex-wrap gap-3'>
                                            {avatarData.roundedAvatars.map((avatar) => (
                                                <Image key={avatar.id} src={getAvatarSrc(avatar.src)} alt={avatar.alt} roundedCircle className="avatar-img-md" />
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Avatar Border</Card.Title>
                                        <div className='d-flex align-items-center flex-wrap gap-3'>
                                            {avatarData.borderedAvatars.map((avatar) => {
                                                const isRounded = avatar.id > 3; // Last 3 avatars are rounded
                                                return (
                                                    <Image key={avatar.id} src={getAvatarSrc(avatar.src)} alt={avatar.alt} rounded={!isRounded} roundedCircle={isRounded} className={`avatar-img-md ${avatar.borderClass}`} />
                                                );
                                            })}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Avatar Sizes</Card.Title>
                                        <Row>
                                            <Col lg={4}>
                                                <div className='d-flex align-items-center flex-wrap gap-3 mb-lg-0 mb-3'>
                                                    {avatarData.avatarSizes.map((size, index) => (
                                                        <div key={index} className={`avatar avatar-${size}`}>
                                                            <Image src={getAvatarSrc(avatarData.defaultAvatars[index % 6].src)} alt="Avatar Img" rounded className="w-100 h-100" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className='d-flex align-items-center flex-wrap gap-3 mb-lg-0 mb-3'>
                                                    {avatarData.avatarSizes.map((size, index) => (
                                                        <div key={index} className={`avatar avatar-${size}`}>
                                                            <Image src={getAvatarSrc(avatarData.defaultAvatars[(index + 1) % 6].src)} alt="Avatar Img" roundedCircle className="w-100 h-100" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className='d-flex align-items-center flex-wrap gap-3'>
                                                    {avatarData.avatarSizes.map((size, index) => {
                                                        const borderColors = ['success', 'info', 'warning', 'danger', 'dark', 'secondary', 'orange', 'light'];
                                                        const isRounded = index > 3;
                                                        return (
                                                            <div key={index} className={`avatar avatar-${size} rounded avarar-border-${borderColors[index % borderColors.length]}`}>
                                                                <Image src={getAvatarSrc(avatarData.defaultAvatars[index % 6].src)} alt="Avatar Img" rounded={!isRounded} roundedCircle={isRounded} className="w-100 h-100" />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Avatar Default Icon</Card.Title>
                                        <div className='d-flex align-items-center flex-wrap gap-3'>
                                            {avatarData.defaultIcons.map((icon, index) => {
                                                const isRounded = index > 2; // Last 3 icons are rounded
                                                return (
                                                    <div key={index} className={`avatar avatar-md avatar-${icon.color} ${isRounded ? 'rounded-circle' : 'rounded'}`}>
                                                        <i className={icon.icon}></i>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Avatar Outline Icon</Card.Title>
                                        <div className='d-flex align-items-center flex-wrap gap-3'>
                                            {avatarData.outlineIcons.map((icon, index) => {
                                                const isRounded = index > 2; // Last 3 icons are rounded
                                                return (
                                                    <div key={index} className={`avatar avatar-md avatar-outline-${icon.color} ${isRounded ? 'rounded-circle' : 'rounded'}`}>
                                                        <i className={icon.icon}></i>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Avatar Soft Icon</Card.Title>
                                        <div className='d-flex align-items-center flex-wrap gap-3'>
                                            {avatarData.softIcons.map((icon, index) => {
                                                const isRounded = index > 2; // Last 3 icons are rounded
                                                return (
                                                    <div key={index} className={`avatar avatar-md avatar-soft-${icon.color} ${isRounded ? 'rounded-circle' : 'rounded'}`}>
                                                        <i className={icon.icon}></i>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Avatar Icon Size</Card.Title>
                                        <Row>
                                            <Col lg={4}>
                                                <div className='d-flex align-items-center flex-wrap gap-3 mb-lg-0 mb-3'>
                                                    {avatarData.iconSizeData.map((item, index) => {
                                                        const colors = ['primary', 'success', 'info', 'warning', 'danger', 'orange', 'dark', 'light'];
                                                        return (
                                                            <div key={index} className={`avatar avatar-${item.size} avatar-${colors[index % colors.length]} rounded`}>
                                                                <i className={item.icon}></i>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className='d-flex align-items-center flex-wrap gap-3 mb-lg-0 mb-3'>
                                                    {avatarData.iconSizeData.map((item, index) => {
                                                        const colors = ['primary', 'success', 'info', 'warning', 'danger', 'orange', 'dark', 'secondary'];
                                                        return (
                                                            <div key={index} className={`avatar avatar-${item.size} avatar-outline-${colors[index % colors.length]} rounded`}>
                                                                <i className={item.icon}></i>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className='d-flex align-items-center flex-wrap gap-3'>
                                                    {avatarData.iconSizeData.map((item, index) => {
                                                        const colors = ['primary', 'success', 'info', 'warning', 'danger', 'orange', 'dark', 'secondary'];
                                                        return (
                                                            <div key={index} className={`avatar avatar-${item.size} avatar-soft-${colors[index % colors.length]} rounded`}>
                                                                <i className={item.icon}></i>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Avatar Letter</Card.Title>
                                        <div className='d-flex align-items-center flex-wrap gap-3'>
                                            {avatarData.letters.map((letter, index) => {
                                                const isRounded = index > 2; // Last 3 letters are rounded
                                                return (
                                                    <div key={index} className={`avatar avatar-md avatar-${letter.color} ${isRounded ? 'rounded-circle' : 'rounded'} fw-semibold`}>
                                                        {letter.text}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Avatar Outline Letter</Card.Title>
                                        <div className='d-flex align-items-center flex-wrap gap-3'>
                                            {avatarData.outlineLetters.map((letter, index) => {
                                                const isRounded = index > 2; // Last 3 letters are rounded
                                                return (
                                                    <div key={index} className={`avatar avatar-md avatar-outline-${letter.color} ${isRounded ? 'rounded-circle' : 'rounded'} fw-semibold`}>
                                                        {letter.text}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Avatar Soft Letter</Card.Title>
                                        <div className='d-flex align-items-center flex-wrap gap-3'>
                                            {avatarData.softLetters.map((letter, index) => {
                                                const isRounded = index > 2; // Last 3 letters are rounded
                                                return (
                                                    <div key={index} className={`avatar avatar-md avatar-soft-${letter.color} ${isRounded ? 'rounded-circle' : 'rounded'} fw-semibold`}>
                                                        {letter.text}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Avatar Letter Size</Card.Title>
                                        <Row>
                                            <Col lg={4}>
                                                <div className='d-flex align-items-center flex-wrap gap-3 mb-lg-0 mb-3'>
                                                    {avatarData.letterSizeData.map((letter, index) => (
                                                        <div key={index} className={`avatar avatar-${letter.size} avatar-${letter.color} rounded fw-semibold`}>
                                                            {letter.text}
                                                        </div>
                                                    ))}
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className='d-flex align-items-center flex-wrap gap-3 mb-lg-0 mb-3'>
                                                    {avatarData.letterSizeData.map((letter, index) => (
                                                        <div key={index} className={`avatar avatar-${letter.size} avatar-outline-${letter.color} rounded fw-semibold`}>
                                                            {letter.text}
                                                        </div>
                                                    ))}
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className='d-flex align-items-center flex-wrap gap-3'>
                                                    {avatarData.letterSizeData.map((letter, index) => (
                                                        <div key={index} className={`avatar avatar-${letter.size} avatar-soft-${letter.color} rounded fw-semibold`}>
                                                            {letter.text}
                                                        </div>
                                                    ))}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Avatar Group</Card.Title>
                                        <Row>
                                            <Col lg={4}>
                                                <div className='avatar-group mb-lg-3 mb-2'>
                                                    {avatarData.avatarSizes.slice(0, 6).map((size, index) => (
                                                        <div key={index} className={`avatar avatar-${size}`}>
                                                            <Image src={getAvatarSrc(avatarData.defaultAvatars[index % 6].src)} alt={avatarData.defaultAvatars[index % 6].alt} rounded className="w-100 h-100" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className='avatar-group avatar-group-text mb-lg-0 mb-4'>
                                                    {avatarData.avatarSizes.slice(0, 6).map((size, index) => {
                                                        const letter = avatarData.letters[index % avatarData.letters.length];
                                                        return (
                                                            <div key={index} className={`avatar avatar-${size} avatar-${letter.color} rounded fw-semibold`}>
                                                                {letter.text}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className='avatar-group mb-lg-3 mb-2'>
                                                    {avatarData.avatarSizes.slice(0, 6).map((size, index) => (
                                                        <div key={index} className={`avatar rounded-circle avatar-${size}`}>
                                                            <Image src={getAvatarSrc(avatarData.roundedAvatars[index % 6].src)} alt={avatarData.roundedAvatars[index % 6].alt} roundedCircle className="w-100 h-100" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className='avatar-group avatar-group-text mb-lg-0 mb-4'>
                                                    {avatarData.avatarSizes.slice(0, 6).map((size, index) => {
                                                        const letter = avatarData.outlineLetters[index % avatarData.outlineLetters.length];
                                                        return (
                                                            <div key={index} className={`avatar avatar-${size} avatar-outline-${letter.color} rounded-circle fw-semibold`}>
                                                                {letter.text}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className='avatar-group mb-lg-3 mb-2'>
                                                    {avatarData.avatarSizes.slice(0, 6).map((size, index) => {
                                                        const borderColors = ['primary', 'success', 'info', 'warning', 'danger', 'dark'];
                                                        return (
                                                            <div key={index} className={`avatar rounded avatar-${size} avarar-border-${borderColors[index % borderColors.length]}`}>
                                                                <Image src={getAvatarSrc(avatarData.borderedAvatars[index % 6].src)} alt={avatarData.borderedAvatars[index % 6].alt} rounded className="w-100 h-100" />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className='avatar-group avatar-group-text'>
                                                    {avatarData.avatarSizes.slice(0, 6).map((size, index) => {
                                                        const letter = avatarData.softLetters[index % avatarData.softLetters.length];
                                                        return (
                                                            <div key={index} className={`avatar avatar-${size} avatar-soft-${letter.color} rounded-circle fw-semibold`}>
                                                                {letter.text}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        </>
    )
}
