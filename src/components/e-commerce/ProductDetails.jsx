import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Image, Form, Table, OverlayTrigger, Tooltip, ProgressBar } from 'react-bootstrap';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import PageTitle from '../layout/PageTitle';
import Footer from '../layout/Footer';
import data from '../../data/e-commerce/products.json';
import user1 from "../../images/user/avatar-1.jpg";
import user2 from "../../images/user/avatar-2.jpg";
import user3 from "../../images/user/avatar-3.jpg";
import user4 from "../../images/user/avatar-4.jpg";
import user5 from "../../images/user/avatar-5.jpg";
import img1 from "../../images/products/prod-img/img-1.png";
import img2 from "../../images/products/prod-img/img-2.png";
import img3 from "../../images/products/prod-img/img-3.png";
import img4 from "../../images/products/prod-img/img-4.png";
import img5 from "../../images/products/prod-img/img-5.png";
import img6 from "../../images/products/prod-img/img-6.png";
import img7 from "../../images/products/prod-img/img-7.png";
import img8 from "../../images/products/prod-img/img-8.png";
import img9 from "../../images/products/prod-img/img-9.png";
import img10 from "../../images/products/prod-img/img-10.png";
const productData = data.productsData.products;

const userImages = [
  user1,
  user2,
  user3,
  user4,
  user5
];
const images = {
  "img1": img1,
  "img2": img2,
  "img3": img3,
  "img4": img4,
  "img5": img5,
  "img6": img6,
  "img7": img7,
  "img8": img8,
  "img9": img9,
  "img10": img10
}
const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlist, setIsWishlist] = useState(false)

  useEffect(() => {
    if (id) {
      // Find the product in the productData array
      const foundProduct = productData.find(p => p.id === id)
      if (foundProduct) {
        setProduct(foundProduct)
      }
    } else if (productData.length > 0) {
      // If no ID is provided, show the first product
      setProduct(productData[0])
    }
    setLoading(false)
  }, [id])

  const handleBack = () => {
    navigate('/ecommerce/product')
  }

  const handleQuantityChange = (value) => {
    const newValue = quantity + value
    if (newValue >= 1 && newValue <= 10) {
      setQuantity(newValue)
    }
  }
  const productImages = [
    images[product?.image] || product?.image,
    images[product?.image] || product?.image,
    images[product?.image] || product?.image,
    images[product?.image] || product?.image
  ]

  const renderRatingStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="text-warning ri-star-fill" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="text-warning ri-star-half-fill" />)
      } else {
        stars.push(<i key={i} className="text-warning ri-star-line" />)
      }
    }
    return stars
  }

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pageTitle="Product Details" pagePrTitle="E-commerce" />

        <Container fluid>
          {loading ? (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : product ? (
            <>
              <Row>
                <Col lg={12}>
                  <Card>
                    <Card.Body>
                      <Link className="mb-4 d-block" onClick={handleBack}>
                        <i className="ri-arrow-left-line me-1" /> Back to Products
                      </Link>

                      <Row className="g-4">
                        <Col lg={5} md={6}>
                          <div className="position-relative">
                            <div className="product-image-container text-center rounded-3 overflow-hidden bg-light p-4">
                              <InnerImageZoom src={productImages[selectedImage]} zoomSrc={productImages[selectedImage]} alt={product.product} zoomType="hover" zoomScale={1.5} zoomPreload={true} />
                            </div>
                          </div>
                        </Col>

                        <Col lg={7} md={6}>
                          <div className="ps-md-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <div>
                                <div className="d-flex align-items-center mb-3 ">
                                  <Badge bg={product.status === 'In Stock' ? 'success' : product.status === 'Low Stock' ? 'warning' : 'danger'}>{product.status}</Badge>
                                  <Badge bg="soft-primary" className="ms-2">{product.category}</Badge>
                                </div>
                                <h3 className="product-title fw-bold mb-2">{product.product}</h3>
                                <p className="text-muted mb-3">
                                  <i className="ri-store-2-line me-1"></i> {product.brand || 'Brand Name'}
                                </p>
                              </div>
                              <Button variant="link" className="p-0 text-muted" onClick={() => setIsWishlist(!isWishlist)}>
                                {isWishlist ?
                                  <i className="ri-heart-fill text-danger fs-4" /> :
                                  <i className="ri-heart-line fs-4" />
                                }
                              </Button>
                            </div>

                            <div className="d-flex align-items-center mb-3">
                              <div className="d-flex align-items-center me-3">
                                <div className="me-2">
                                  {renderRatingStars(product.rating)}
                                </div>
                                <span className="fw-medium fs-12">{product.rating}</span>
                              </div>
                              <span className="text-muted fs-12 me-3">•</span>
                              <span className="text-primary fs-12">{product.sales || 0} reviews</span>
                              <span className="text-muted fs-12 mx-3">•</span>
                              <span className="text-success fs-12"><i className="ri-checkbox-circle-line me-1"></i> In stock</span>
                            </div>

                            <div className=" rounded-3 my-4">
                              <div className="d-flex align-items-center">
                                <h4 className="mb-0 me-2">${product.price.toFixed(2)}</h4>
                                {product.oldPrice && (
                                  <span className="text-decoration-line-through text-muted me-2">${product.oldPrice.toFixed(2)}</span>
                                )}
                                {product.discount && (
                                  <Badge bg="danger" className="px-2 py-1 fw-normal">Save {product.discount}%</Badge>
                                )}
                              </div>
                              <p className="text-success mb-0 small mt-1">
                                <i className="ri-truck-line me-1"></i> Free delivery on orders over $50
                              </p>
                            </div>

                            <div className=" mb-4">
                              <h6 className="fw-semibold mb-3">Choose options:</h6>
                              <Row className="g-3">
                                <Col md={4}>
                                  <div className="mb-3">
                                    <label className="form-label fw-medium mb-2">Color</label>
                                    <div className="d-flex gap-2">
                                      {['primary', 'secondary', 'success', 'danger'].map((color, index) => (
                                        <OverlayTrigger key={index} placement="top" overlay={<Tooltip id={`tooltip-${index}`}>
                                          {['Red', 'Blue', 'Green', 'Yellow', 'Purple'][index]}
                                        </Tooltip>}
                                        >
                                          <div className={`bg-${color} avatar avatar-xs rounded-circle ${selectedImage === index ? 'active' : ''}`}
                                            onClick={() => setSelectedImage(index)}
                                          >
                                            {selectedImage === index && (
                                              <i className="ri-check-line text-white"></i>
                                            )}
                                          </div>
                                        </OverlayTrigger>
                                      ))}
                                    </div>
                                  </div>
                                </Col>

                                <Col md={4}>
                                  <div className="mb-3">
                                    <label className="form-label fw-medium mb-2">Size</label>
                                    <div className="d-flex flex-wrap gap-2">
                                      {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                        <div key={size} className="rounded-pill avatar avatar-xs bg-light border-light">{size}</div>
                                      ))}
                                    </div>
                                  </div>
                                </Col>

                                <Col xs={12}>
                                  <div className="d-flex align-items-center gap-2">
                                    <label className="form-label fw-medium mb-0">Quantity</label>
                                    <div className="d-flex align-items-center">
                                      <Button variant="outline-secondary" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}><i className="ri-subtract-line"></i></Button>
                                      <Form.Control type="text" value={quantity} className="text-center w-20 mx-2" readOnly />
                                      <Button variant="outline-secondary" onClick={() => handleQuantityChange(1)} disabled={quantity >= 10}><i className="ri-add-line"></i></Button>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>

                            <div className=" d-flex flex-wrap gap-3">
                              <Button variant="primary"><i className="ri-shopping-cart-line me-2" /> Add to Cart - ${(product.price * quantity).toFixed(2)}</Button>
                              <Button variant="outline-primary">Buy Now</Button>

                              <div className="d-flex gap-2 w-100 d-md-none">
                                <Button variant="outline-secondary" className="flex-grow-1" onClick={() => setIsWishlist(!isWishlist)}>
                                  {isWishlist ? (
                                    <>
                                      <i className="ri-heart-fill text-danger me-2" />Saved</>
                                  ) : (
                                    <>
                                      <i className="ri-heart-line me-2" />Save</>
                                  )}
                                </Button>

                                <Button variant="outline-secondary"><i className="ri-share-line" /></Button>
                              </div>
                            </div>

                            {/* Sticky add to cart bar for mobile */}
                            <div className="fixed-bottom bg-white border-top d-md-none">
                              <div className="container py-2">
                                <div className="d-flex align-items-center">
                                  <div className="me-3">
                                    <h5 className="mb-0 text-primary">${product.price.toFixed(2)}</h5>
                                    {product.oldPrice && (
                                      <small className="text-decoration-line-through text-muted">${product.oldPrice.toFixed(2)}</small>
                                    )}
                                  </div>
                                  <Button variant="primary" className="flex-grow-1 py-2" size="lg"><i className="ri-shopping-cart-line me-2"/> Add to Cart</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={12}>
                  <Card>
                    <Card.Header className="bg-white">
                      <h5 className="mb-0"><i className="ri-store-2-line me-2"></i>Available Outlets</h5>
                    </Card.Header>
                    <Card.Body>
                      <Table responsive className="outlets-table mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th>Outlets</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="outlet-name">ASOS Briley Outlet - NYC</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className=" flex-grow-1 me-2">
                                  <ProgressBar variant="success" className='height-8' now={70} />
                                </div>
                                <span>478</span>
                              </div>
                            </td>
                            <td>$1,89,547</td>
                          </tr>
                          <tr>
                            <td className="outlet-name">Marco Outlet - SFT</td>
                            <td>${(product.price + 10).toFixed(2)}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-grow-1 me-2">
                                  <ProgressBar variant="danger" className='height-8' now={50} />
                                </div>
                                <span>73</span>
                              </div>
                            </td>
                            <td>$87,245</td>
                          </tr>
                          <tr>
                            <td className="outlet-name">Chariest Outlet - HY</td>
                            <td>${(product.price - 4).toFixed(2)}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className=" flex-grow-1 me-2">
                                  <ProgressBar variant="primary" className='height-8' now={60} />
                                </div>
                                <span>781</span>
                              </div>
                            </td>
                            <td>$5,87,478</td>
                          </tr>
                          <tr>
                            <td className="outlet-name">Nworld Group - India</td>
                            <td>${(product.price - 10).toFixed(2)}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className=" flex-grow-1 me-2">
                                  <ProgressBar variant="primary" className='height-8' now={80} />
                                </div>
                                <span>815</span>
                              </div>
                            </td>
                            <td>$95,781</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>

                </Col>
                <Col lg={6} md={12}>
                  {/* Product Specifications */}
                  <Card>
                    <Card.Header className="bg-white">
                      <h5 className="mb-0"><i className="ri-file-list-3-line me-2"></i>Product Specifications</h5>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={12}>
                          <Table borderless className='mb-0'>
                            <tbody>
                              <tr>
                                <td className="fw-medium text-muted">Brand</td>
                                <td>{product.brand || 'N/A'}</td>
                              </tr>
                              <tr>
                                <td className="fw-medium text-muted">Model</td>
                                <td>{product.model || product.product}</td>
                              </tr>
                              <tr>
                                <td className="fw-medium text-muted">Color</td>
                                <td>{product.color || 'Multiple Options'}</td>
                              </tr>
                              {product.wireless && (
                                <tr>
                                  <td className="fw-medium text-muted">Wireless</td>
                                  <td>{product.wireless ? 'Yes' : 'No'}</td>
                                </tr>
                              )}
                              {product.color && (
                                <tr>
                                  <td className="fw-medium text-muted">Color</td>
                                  <td>{product.color}</td>
                                </tr>
                              )}
                              {product.storage && (
                                <tr>
                                  <td className="fw-medium text-muted">Storage</td>
                                  <td>{product.storage}</td>
                                </tr>
                              )}

                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Customer Reviews */}
              <Row>
                <Col lg={12}>
                  <Card>
                    <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                      <h5 className="mb-0"><i className="ri-chat-1-line me-2"></i>Customer Reviews</h5>
                      <Button variant="outline-primary" size="sm">
                        <i className="ri-add-line me-1"></i> Write a Review
                      </Button>
                    </Card.Header>
                    <Card.Body>
                      <div className="review-summary mb-4">
                        <Row className="align-items-center">
                          <Col md={4} className="text-center border-end">
                            <h1 className="display-4 fw-bold text-primary mb-0">{product.rating}</h1>
                            <div className="rating-stars my-2">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} fs-4 me-1 text-warning`}/>
                              ))}
                            </div>
                            <p className="text-muted mb-0">{product.sales || 0} reviews</p>
                          </Col>
                          <Col md={8}>
                            <div className="ps-md-4">
                              {[5, 4, 3, 2, 1].map((star) => {
                                // Calculate percentage (mock data)
                                const percentage = star === 5 ? 65 :
                                  star === 4 ? 20 :
                                    star === 3 ? 10 :
                                      star === 2 ? 3 : 2;
                                return (
                                  <div key={star} className="d-flex align-items-center mb-2">
                                    <div className="rating-label me-2">{star} <i className="ri-star-fill text-warning"></i></div>
                                    <div className=" flex-grow-1">
                                      <ProgressBar className="height-8 " variant="warning" now={percentage}/>
                                    </div>
                                    <div className="rating-count ms-2">{percentage}%</div>
                                  </div>
                                );
                              })}
                            </div>
                          </Col>
                        </Row>
                      </div>

                      <hr />

                      {/* Individual Reviews */}
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="review-item mb-4 pb-4 border-bottom">
                          <div className="d-flex">
                            <div className="flex-shrink-0">
                              <Image src={userImages[review]} alt="User" className="rounded-circle" width={50} height={50}/>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                <h6 className="mb-0 fw-semibold">User Review {review}</h6>
                                <div className="text-warning">
                                  {[...Array(5)].map((_, i) => (
                                    <i key={i} className={`ri-star-${i < (5 - review + 3) ? 'fill' : 'line'} me-1`}/>
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted small mb-2">Posted on {new Date(Date.now() - (review * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString()}</p>
                              <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in odio vitae justo vestibulum bibendum ac in sem. Sed varius tellus et purus iaculis, eget varius est molestie.</p>
                              <div className="d-flex align-items-center">
                                <Button variant="link" size="sm" className="p-0 text-muted me-3"><i className="ri-thumb-up-line me-1"></i> Helpful (12)</Button>
                                <Button variant="link" size="sm" className="p-0 text-muted"><i className="ri-reply-line me-1"></i> Reply</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="text-center">
                        <Button variant="outline-primary">Load More Reviews</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Related Products */}
              <Row>
                <Col lg={12}>
                  <Card className="product-details-container animate-in">
                    <Card.Header className="bg-white">
                      <h5 className="mb-0"><i className="ri-stack-line me-2"></i>Related Products</h5>
                    </Card.Header>
                    <Card.Body className='pb-0'>
                      <Row className="g-4">
                        {[1, 2, 3, 4].map((item) => (
                          <Col key={item} md={3} sm={6}>
                            <Card className="product-card position-relative">
                              <div className="position-absolute top-0 end-0 m-2 z-1">
                                <Badge bg={item === 3 ? 'danger' : 'success'} className="px-2 py-1">{item === 3 ? 'Out of Stock' : 'In Stock'}</Badge>
                              </div>
                              <div className="text-center p-3 bg-light rounded-top">
                                <Image src={images[product.image] || `https://via.placeholder.com/150?text=Product+${item}`} alt={`Related Product ${item}`} className="img-fluid product-img"/>
                              </div>
                              <Card.Body>
                                <div className="d-flex align-items-center mb-2">
                                  <div className="text-warning me-1">
                                    {[...Array(5)].map((_, i) => (
                                      <i key={i} className={`ri-star-fill fs-16 ${i < 4 ? 'text-warning' : 'text-muted'}`}/>
                                    ))}
                                  </div>
                                  <span className="text-muted ms-1">4.0</span>
                                </div>
                                <h6 className="product-title text-truncate">Related Product {item}</h6>
                                <p className="text-muted small mb-3">{product.category}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <h6 className="mb-0 fw-semibold">${(product.price * 0.8).toFixed(2)}</h6>
                                  <Button variant="outline-primary" size="sm"><i className="ri-eye-line"></i></Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          ) : (
            <Row>
              <Col lg={12}>
                <Card className="product-details-container animate-in">
                  <Card.Body className="text-center p-5">
                    <i className="ri-error-warning-line text-warning display-4 mb-3"></i>
                    <h3>Product Not Found</h3>
                    <p className="text-muted">The product you are looking for does not exist or has been removed.</p>
                    <Button variant="primary" className="btn-back" onClick={handleBack}> <i className="ri-arrow-left-line me-1"></i> Back to Products</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetails;
