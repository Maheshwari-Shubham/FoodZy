import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import API_BASE_URL from '../api'
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3 text-light'>The Cart is Empty!</div>
            </div>
        )
    }
    // const handleRemove = (index)=>{
    //   console.log(index)
    //   dispatch({type:"REMOVE",index:index})
    // }

    const handleCheckOut = async () => {
        const orderData = {
            order_data: data,
            order_date: new Date().toDateString()
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/orderData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
                },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();
            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Checkout failed');
            }
            dispatch({ type: "DROP" });
        } catch (error) {
            console.error('Checkout failed:', error);
            alert(error.message || 'Checkout failed. Please try again.');
        }
    };
    

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>

            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td ><button type="button" className="btn p-0">
                                    <DeleteIcon onClick={() => dispatch({ type: "REMOVE", index: index })} />
                                </button> </td></tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-light'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>



        </div>
    )
}