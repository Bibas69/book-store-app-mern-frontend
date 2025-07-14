import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGetOrdersByEmailQuery } from '../../redux/features/orders/orderApi';
import { getImgUrl } from '../../utils/getImageUrl';

export const Orders = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading, isError } = useGetOrdersByEmailQuery(currentUser.email);

  if (isLoading) return <div className="text-center mt-10 text-lg font-medium">Loading your orders...</div>;
  if (isError) return <div className="text-center mt-10 text-red-600">Failed to load orders. Please try again.</div>;

  return (
    <div className="w-full min-h-screen px-8 py-16 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">You haven't placed any orders yet.</div>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Order #{index + 1}</h2>
                <span className="text-sm text-gray-500 block">
                  Order ID: <span className="font-mono">{order._id}</span>
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {order.productsId.map((book, i) => (
                <div
                  key={i}
                  className="flex gap-4 bg-gray-100 rounded-lg p-4 shadow-sm"
                >
                  <img
                    src={getImgUrl(book.coverImage)}
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{book.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{book.category}</p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{book.description}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 line-through">${book.oldPrice || (book.newPrice + 10)}</p>
                      <p className="text-lg font-bold text-green-600">${book.newPrice}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right mt-6 border-t pt-4">
              <p className="text-lg font-semibold">
                Total: <span className="text-green-700">${order.totalPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
