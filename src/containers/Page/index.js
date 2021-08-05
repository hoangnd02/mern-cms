import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../actions/page.actions";
import Input from "../../components/Input";
import Layout from "../../components/layout";
import NewModal from "../../components/UI/Modal";
import linearCategories from "../../helpers/linearCategories";

const Page = () => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  useEffect(() => {
    if (!page.loading) {
      setCreateModal(false);
      setTitle("");
      setCategoryId("");
      setDesc("");
      setType("");
      setBanners([]);
      setProducts([]);
    }
  }, [page]);

  const renderCreatePageModal = () => {
    return (
      <NewModal
        show={createModal}
        modalTitle={"Create New Page"}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              <select
                className="form-control"
                value={categoryId.name}
                onChange={onCategoryChange}
              >
                <option value="">select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <Input
                type="select"
                value={categoryId.value}
                onChange={onCategoryChange}
                options={categories}
                placeholder={"Select Category"}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Page Title"}
                className=""
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={"Page Desc"}
                className=""
              />
            </Col>
          </Row>

          {banners.length > 0
            ? banners.map((banner, index) => (
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                className="form-control"
                type="file"
                name="banners"
                onChange={handleBannerImages}
              />
            </Col>
          </Row>

          {products.length > 0
            ? products.map((product, index) => (
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                className="form-control"
                type="file"
                name="products"
                onChange={handleProductImages}
              />
            </Col>
          </Row>
        </Container>
      </NewModal>
    );
  };

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.name == e.target.value
    );
    setCategoryId(category);
    setType(category.type);
  };

  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };
  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = (e) => {
    // e.target.defaultValue();

    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId.value);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });

    dispatch(createPage(form));
  };

  return (
    <Layout sidebar>
      {page.loading ? (
        <div>
          <p>New page is loading ..... please waiting</p>
        </div>
      ) : (
        <div>
          {renderCreatePageModal()}

          <button onClick={() => setCreateModal(true)}>Create new modal</button>
        </div>
      )}
    </Layout>
  );
};

export default Page;
