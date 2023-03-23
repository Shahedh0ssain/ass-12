import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useOrder from '../Hooks/useOrder';
import ConfirmModal from './ConfirmModal';
import Loading from './Loading';

const ManageOrder = () => {

    // const [orders, isLoading, error,] = useOrder();
    const [orderDelete, setOrderDelete] = useState(null);

    const { isLoading, error, data: orders, } = useQuery({
        queryKey: ['orders', true],
        queryFn: () =>
            fetch(`http://localhost:5000/orders`).then(
                (res) => res.json(),
            ),
    })

    // console.log(orders)


    const handleOrderCancle = (id) => {
        // console.log(id);

        fetch(`http://localhost:5000/deleteOrder/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => console.log(data));
        setOrderDelete(null);

    }

    const navigate = useNavigate();

    const showDetail = id => {
        const path = `payment/${id}`;
        navigate(path);
        // <Navigate to='payment' replace = { true} />
        // navigate("/session-timed-out");
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    if (error) {
        console.log(error);
    }

    let paid = false;


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Order Name</th>
                            <th>Quentity</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}

                        {
                            orders?.map((order, index) =>
                                //    key = {order._id} 
                                <tr key={order?._id}>

                                    <th>{index + 1}</th>
                                    <td>{order?.partsName}</td>
                                    <td>{order?.quentity}</td>
                                    <td className='font-medium'>{order?.price} Tk</td>
                                    {/* <td>{order?._id }</td> */}
                                    {/* <td> <Link to={order?._id}><button className='btn btn-outline btn-success'>pay</button></Link>  <button onClick={() => handleOrderCancle(order?._id)} className='btn btn-outline btn-error'>Cancle</button> </td> */}
                                    <td>

                                        {/* <button onClick={() => showDetail(order?._id)} className='btn btn-outline btn-success'>pay</button> */}
                                        {
                                            !paid ?
                                                <>
                                                    <Link ><button className='btn btn-outline btn-success'>Confirm</button></Link>
                                                    <label for="my-modal-6" onClick={() => setOrderDelete(order)} className='btn btn-outline btn-error  mx-2'>Cancle</label>
                                                </>

                                                :
                                                <Link ><button className='btn btn-outline btn-success disabled:'>paid</button></Link>


                                        }

                                        {/* {
                                            paid ?
                                                <label for="my-modal-6" onClick={() => setOrderDelete(order)} className='btn btn-outline btn-error  mx-2'>Cancle</label>
                                                :
                                        }      <label for="my-modal-6" onClick={() => setOrderDelete(order)} className='btn btn-outline btn-error  mx-2'>Cancle</label> */}

                                        {/* <label for="my-modal-6" onClick={() => setServiceDelete(service)} className="btn "> */}

                                    </td>

                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                orderDelete && <ConfirmModal
                    type={false}
                    services={orderDelete}
                    // setDelete={setOrderDelete}
                    handle={handleOrderCancle}
                ></ConfirmModal>

            }
        </div>
    );
};

export default ManageOrder;