import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import useOrder from '../Hooks/useOrder';

const Myorder = () => {

    // const [user] = useAuthState(auth);
    const [orders, isLoading, error, refetch] = useOrder();

    // const [orders,setOrders] =  useState([]);

    // const {payment_id} = useParams();
    // console.log(payment_id);

    // useEffect(() => {

    //     if (user) {
    //         fetch(`http://localhost:5000/myservice?email=${user?.email}`)
    //             .then(res => res.json())
    //             .then(data => setOrders(data));
    //     }

    // }, [user,orders]);


    const handleOrderCancle = (id) => {

        const proceed = window.confirm('Confirm delete item?');

        // console.log(id);

        if (proceed) {
            fetch(`http://localhost:5000/deleteOrder/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        refetch();
                    }
                });

        }


    }

    // console.log(orders)

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Order Name</th>
                            <th>Quentity</th>
                            <th>Price</th>
                            <th>Confirm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}

                        {
                            orders?.map((order, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{order?.partsName}</td>
                                <td>{order?.quentity}</td>
                                <td>{order?.Price} Tk</td>
                                {/* <td>{order?._id }</td> */}
                                <td>
                                    {(order.Price && order.paid) && <button className='btn btn-disabled text-green-500 mx-2'>paid</button>}
                                    {(order.Price && !order.paid) && <Link to={`payment/${order?._id}`}><button className='btn mx-2'>pay</button></Link>}
                                    < button onClick={() => handleOrderCancle(order?._id)} className='btn'>Cancle</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default Myorder;