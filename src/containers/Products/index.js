import React, { useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input";
import Layout from "../../components/layout";
import { addProduct } from "../../actions/product.action";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";
import NewModal from "../../components/UI/Modal";

const Product = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const submitProductForm = () => {
    const form = new FormData();

    console.log(productPictures);
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let picture of productPictures) {
      form.append("productPicture", picture);
    }

    dispatch(addProduct(form));
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleProductPicture = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const renderProducts = () => {
    return (
      <Table hover style={{ fontSize: 14 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>2</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <button onClick={() => showProductDetailsModal(product)}>
                      info
                    </button>
                    {/* <button
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                      del
                    </button> */}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };
  const handleClose = () => {
    setShow(false);
  };
  const renderAddProductModal = () => (
    <NewModal
      show={show}
      handleClose={handleClose}
      modalTitle={"Add New Product"}
      onSubmit={submitProductForm}
    >
      <Input
        value={name}
        placeholder={`Product Name`}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        value={quantity}
        placeholder={`Quantity Product`}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Input
        value={price}
        placeholder={`Price Product`}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        value={description}
        placeholder={`Description Product`}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="form-control"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option> Select category</option>
        {createCategoryList(category.categories).map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {productPictures.length > 0
        ? productPictures.map((picture, index) => (
            <div key={index}>{picture.name}</div>
          ))
        : ""}
      <input
        type="file"
        name="productPicture"
        onChange={handleProductPicture}
      ></input>
    </NewModal>
  );

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };
  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <NewModal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Product;
