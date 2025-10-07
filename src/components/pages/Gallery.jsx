import React, { useEffect, useState } from 'react';
import PageTitle from '../layout/PageTitle';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import img1 from "../../images/gallery/img1.jpg";
import img2 from "../../images/gallery/img2.jpg";
import img3 from "../../images/gallery/img3.jpg";
import img4 from "../../images/gallery/img4.jpg";
import img5 from "../../images/gallery/img5.jpg";
import img6 from "../../images/gallery/img6.jpg";
import img7 from "../../images/gallery/img7.jpg";
import img8 from "../../images/gallery/img8.jpg";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Footer from '../layout/Footer';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const galleryItems = [
    { id: 1, category: 'nature', image: img1 },
    { id: 2, category: 'architecture', image: img5 },
    { id: 3, category: 'travel', image: img7 },
    { id: 4, category: 'food', image: img8 },
    { id: 5, category: 'animals', image: img6 },
    { id: 6, category: 'fashion', image: img3 },
    { id: 7, category: 'nature', image: img1 },
    { id: 8, category: 'architecture', image: img2 },
    { id: 9, category: 'travel', image: img4 },
    { id: 10, category: 'nature', image: img1 },
    { id: 11, category: 'architecture', image: img5 },
    { id: 12, category: 'travel', image: img7 },
    { id: 13, category: 'food', image: img8 },
    { id: 14, category: 'animals', image: img6 },
    { id: 15, category: 'fashion', image: img3 },
    { id: 16, category: 'nature', image: img1 },
    { id: 17, category: 'architecture', image: img2 },
    { id: 18, category: 'travel', image: img4 },
  ];

  const categories = ['all', ...new Set(galleryItems.map(item => item.category))];

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter(item => item.category === activeFilter);
  useEffect(() => {
    // Destroy any existing instances
    Fancybox.destroy();

    // Initialize Fancybox with custom options
    Fancybox.bind('[data-fancybox="gallery"]', {
      Toolbar: {
        display: {
          left: ["infobar"],
          middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW", "flipX", "flipY",],
          right: ["slideshow", "fullscreen", "download", "thumbs", "close"]
        }
      },
      Thumbs: {
        autoStart: true,
        axis: 'x'
      },
      infinite: true,
      wheel: "slide",
      touch: {
        vertical: true,
        momentum: true
      },
      showClass: "fancybox-fadeIn",
      hideClass: "fancybox-fadeOut",
      contentClick: "iterateZoom",
      contentWheel: "zoom",
      caption: function (fancybox, carousel, slide) {
        return (
          `${slide.caption || slide.alt || 'Gallery Image'}<br/>
                    <small class="text-muted">${slide.index + 1} of ${carousel.slides.length}</small>`
        );
      }
    });

    return () => {
      Fancybox.destroy();
    };
  }, [filteredItems]);


  return (
    <div className="page-wrapper">
      <div className="page-content">
        <PageTitle pageTitle="Gallery" pagePrTitle="Pages" />
        <Container fluid>
          <Row>
            <Col lg={12}>
              {/* Filter Buttons */}
              <div className='d-flex flex-column gap-5 min-vh-100 '>
                <div className="text-center ">
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    {categories.map((category, index) => (
                      <Button key={index} variant={activeFilter === category ? 'gradient-primary' : 'soft-primary'} className='text-capitalize fw-semibold' onClick={() => setActiveFilter(category)}>{category}</Button>
                    ))}
                  </div>
                </div>

                <div className="gallery-masonry flex-grow-1">
                  {filteredItems.map((item, index) => (
                    <Card key={item.id} className="gallery-card">
                      <Card.Img src={item.image} alt={item.title} className="img-fluid" />
                      <div className="card-img-overlay">
                        <a href={item.image} data-fancybox="gallery" data-caption={`<strong>${item.title || `Image ${index + 1}`}</strong><br/>${item.description || 'Gallery image'}`} data-thumb={item.image} className="btn btn-light btn-sm">
                          <i className="ri-eye-line me-1"></i>View
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>



                {/* Load More */}
                <div className="text-center mb-5">
                  <Button variant="gradient-primary" size="lg" onClick={() => setActiveFilter('all')} disabled={activeFilter === 'all'} ><Spinner animation="border" className='me-2' role="status" size='sm' />Load More</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default Gallery;
