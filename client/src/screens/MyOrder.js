import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
            console.warn("User email not found.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail }),
            });

            const data = await response.json();
            console.log("API Response:", data);

            if (!data.orderData || data.orderData.length === 0) {
                console.warn("No orders found.");
                setOrderData([]);
                return;
            }

            // Reverse the orders so the latest order appears first
            setOrderData(data.orderData.reverse());
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {Array.isArray(orderData) &&
                        orderData.map((orders, index) => {
                            let totalPrice = 0; // Reset total price for each order

                            return (
                                <div key={index} className="mb-4">
                                    {Array.isArray(orders) &&
                                        orders.map((item, i) => {
                                            if (item.Order_date) {
                                                totalPrice = 0; // Reset total price when a new order starts
                                                return (
                                                    <div key={`${index}-${i}`} className='mt-3'>
                                                        <hr />
                                                        <strong>Order Date: {item.Order_date}</strong>
                                                    </div>
                                                );
                                            } else {
                                                totalPrice += item.price * item.qty; // Calculate total price for this specific order

                                                return (
                                                    <div key={`${index}-${i}`} className='col-12 col-md-6 col-lg-3'>
                                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                            <img
                                                                src={item.img}
                                                                className="card-img-top"
                                                                alt="Product"
                                                                style={{ height: "120px", objectFit: "fill" }}
                                                            />
                                                            <div className="card-body">
                                                                <h5 className="card-title">{item.name}</h5>
                                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                    <span className='m-1'>Qty: {item.qty}</span>
                                                                    <span className='m-1'>Size: {item.size}</span>
                                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                        ₹{item.price}/-
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        })}

                                    {/* Display Total Price for this specific order aligned to the left */}
                                    <div className='mt-2 fw-bold fs-5 text-start'>
                                        Total Price: ₹{totalPrice}/-
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <Footer />
        </div>
    );
}
