import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [userToken, setUserToken] = useState("");
  const navigate = useNavigate();

  // Get user token (for authorization)
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate("/login");
    } else {
      currentUser.getIdToken().then((token) => setUserToken(token));
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!title || !price) {
      alert("Please fill all fields");
      return;
    }

    const productData = {
      title,
      price,
      image: preview || "",
      token: userToken,
    };

    if (editId) {
      await updateDoc(doc(db, "products", editId), productData);
      setEditId(null);
    } else {
      await addDoc(collection(db, "products"), productData);
    }

    setTitle("");
    setPrice("");
    setImage("");
    setPreview(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setTitle(product.title);
    setPrice(product.price);
    setPreview(product.image);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4 shadow-lg rounded-4"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <h3 className="text-center text-primary mb-4">
          {editId ? "Edit Product" : "Add Product"}
        </h3>
        <form onSubmit={handleAddProduct}>
          <div className="mb-3">
            <label>Title</label>
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
            />
          </div>
          <div className="mb-3">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
            />
          </div>
          <div className="mb-3">
            <label>Upload Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          {preview && (
            <div className="text-center mb-3">
              <img
                src={preview}
                alt="Preview"
                style={{ width: "120px", height: "120px", borderRadius: "10px" }}
              />
            </div>
          )}

          <button className="btn btn-primary w-100" type="submit">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="row mt-5">
        <h4 className="text-center text-primary mb-4">Product List</h4>
        {products.map((p) => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card shadow-sm p-3 rounded-4">
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
              <h5 className="mt-3">{p.title}</h5>
              <p>₹{p.price}</p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(p)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
