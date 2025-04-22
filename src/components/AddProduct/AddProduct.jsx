// import React, { useState } from "react";
// import "./AddProduct.css";
// import upload_area from "../../assets/upload_area.svg";
// import axios from "axios";

// const AddProduct = () => {
//   const [image, setImage] = useState(null);
//   const [productDetails, setProductDetails] = useState({
//     name: "",
//     image: "",
//     category: "",
//     new_price: "",
//     old_price: "",
//   });

//   const imageHandler = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const changeHandler = (e) => {
//     setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
//   };

//   const Add_Product = async () => {
//     try {
//       if (!image) {
//         alert("Please select a product image.");
//         return;
//       }

//       // Upload Image
//       const formData = new FormData();
//       formData.append("image", image); // <-- Corrected key here

//       const uploadResponse = await axios.post(
//         "https://lookup-cn6m.onrender.com/add-product",
//         formData
//       );
      

//       if (uploadResponse.data.success) {
//         const product = {
//           ...productDetails,
//           image: uploadResponse.data.image_url, // attach uploaded image URL
//         };

//         // Add Product
//         const productResponse = await axios.post(
//           "https://lookup-cn6m.onrender.com/addproduct",
//           product,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (productResponse.data.success) {
//           alert("Product Added Successfully!");
//           // Reset form
//           setProductDetails({
//             name: "",
//             image: "",
//             category: "",
//             new_price: "",
//             old_price: "",
//           });
//           setImage(null);
//         } else {
//           alert("Failed to add product.");
//         }
//       } else {
//         alert("Image upload failed.");
//       }
//     } catch (error) {
//       console.error("Error adding product:", error.response || error.message);
//       alert("Something went wrong while adding the product.");
//     }
//   };

//   return (
//     <div className="add-product">
//       <div className="addproduct-itemfield">
//         <p>Product title</p>
//         <input
//           value={productDetails.name}
//           onChange={changeHandler}
//           type="text"
//           name="name"
//           placeholder="Type here"
//         />
//       </div>

//       <div className="addproduct-price">
//         <div className="addproduct-itemfield">
//           <p>Price</p>
//           <input
//             value={productDetails.old_price}
//             onChange={changeHandler}
//             type="text"
//             name="old_price"
//             placeholder="Type here"
//           />
//         </div>
//         <div className="addproduct-itemfield">
//           <p>Offer Price</p>
//           <input
//             value={productDetails.new_price}
//             onChange={changeHandler}
//             type="text"
//             name="new_price"
//             placeholder="Type here"
//           />
//         </div>
//       </div>

//       <div className="addproduct-itemfield">
//         <p>Product Category</p>
//         <select
//           value={productDetails.category}
//           onChange={changeHandler}
//           name="category"
//           className="add-product-selector"
//         >
//           <option value="">Select Category</option>
//           <option value="women">Women</option>
//           <option value="men">Men</option>
//           <option value="kid">Kid</option>
//         </select>
//       </div>

//       <div className="addproduct-itemfield">
//         <label htmlFor="file-input">
//           <img
//             src={image ? URL.createObjectURL(image) : upload_area}
//             alt=""
//             className="addproduct-thumnail-img"
//           />
//         </label>
//         <input
//           onChange={imageHandler}
//           type="file"
//           name="image"
//           id="file-input"
//           hidden
//         />
//       </div>

//       <button onClick={Add_Product} className="addproduct-btn">
//         Add
//       </button>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import axios from "axios";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
  
    const formData = new FormData();
      formData.append("image", image);
      formData.append("name", productDetails.name);
      formData.append("category", productDetails.category);
      formData.append("new_price", productDetails.new_price);
      formData.append("old_price", productDetails.old_price);
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ': ' + pair[1]);
      }
      
    try {
      if (!image) {
        alert("Please select a product image.");
        return;
      }

      // Prepare form data for image + product fields
      

      const response = await axios.post(
        "https://lookup-cn6m.onrender.com/add-product",
        formData
      );


      if (response.data.message === "Product added successfully!") {
        alert("Product Added Successfully!");
        // Reset form
        setProductDetails({
          name: "",
          category: "",
          new_price: "",
          old_price: "",
        });
        setImage(null);
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error.response || error.message);
      alert("Something went wrong while adding the product.");
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="">Select Category</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="addproduct-thumnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button onClick={Add_Product} className="addproduct-btn">
        Add
      </button>
    </div>
  );
};

export default AddProduct;
