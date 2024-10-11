import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: productList.length + 1,
      name: newProductName,
      price: newProductPrice,
      description: newProductDescription,
    };
    dispatch(addProduct(newProduct));
    setNewProductName('');
    setNewProductPrice('');
    setNewProductDescription('');
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-8">Product List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {productList.map(product => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md bg-white">
            <Link to={`/product/${product.id}`} className="text-lg font-semibold text-blue-600 hover:underline">
              {product.name}
            </Link>
            <p className="text-gray-600">{product.price} THB</p>
            <p className="text-sm text-gray-500">{product.description}</p>
            <button
              onClick={() => handleRemoveProduct(product.id)}
              className="mt-4 text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              เอาออก
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-center mb-8">เพิ่มสินค้า</h2>

      <form onSubmit={handleAddProduct} className="max-w-lg mx-auto bg-gray-50 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">ชื่อสินค้า: </label>
          <input
            type="text"
            id="name"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">ราคาสินค้า : </label>
          <input
            type="text"
            id="price"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">คุณสมบัติ : </label>
          <textarea
            id="description"
            value={newProductDescription}
            onChange={(e) => setNewProductDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
        >
          เพิ่ม
        </button>
      </form>
    </div>
  );
}

export default Products;
