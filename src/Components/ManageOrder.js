import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useOrder from '../Hooks/useOrder';
import ConfirmModal from './ConfirmModal';
import Loading from './Loading';

const ManageOrder = () => {

    // const [orders, isLoading, error,] = useOrder();
    const [orderDelete, setOrderDelete] = useState(null);
    const [approveOrder, setApproveOrder] = useState(null);
    const [cencleLoader, setCencleLoader] = useState(false);
    const [approveLoader, setApproveLoader] = useState(false);

    const { isLoading, error, data: orders, refetch } = useQuery({
        queryKey: ['orders', true],
        queryFn: () =>
            fetch(`http://localhost:5000/orders`).then(
                (res) => res.json(),
            ),
    })

    // console.log(approveOrder);


    const handleOrderCancle = (id) => {
        setCencleLoader(true)

        fetch(`http://localhost:5000/deleteOrder/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCencleLoader(false);
                    refetch();
                    // console.log(data.success);
                }
            });
        setOrderDelete(null);


    }

    const hsndleStatus = (id) => {

        setApproveLoader(true)
        fetch(`http://localhost:5000/status/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if (data?.result?.modifiedCount > 0) {
                    console.log(data?.result);
                    setApproveLoader(false);
                    refetch();
                }

            });
        setApproveOrder(null);


    }

    // const navigate = useNavigate();

    // const showDetail = id => {
    //     const path = `payment/${id}`;
    //     navigate(path);
    //     // <Navigate to='payment' replace = { true} />
    //     // navigate("/session-timed-out");
    // }

    if (isLoading) {
        return <Loading></Loading>
    }

    if (error) {
        console.log(error);
    }

    // let paid = false;


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
                                <tr key={order?._id}>

                                    <th>{index + 1}</th>
                                    <td>{order?.partsName}</td>
                                    <td>{order?.quentity}</td>
                                    {/* <td>{order?.status}</td> */}
                                    <td className='font-medium'>{order?.price} Tk</td>

                                    <td>

                                        {
                                            (order?.Price && order?.paid) ?
                                                <>
                                                    {
                                                        (order?.status === "shipped") ?
                                                            <Link ><button className='btn btn-disabled'>Shiped</button></Link>

                                                            :
                                                            <>
                                                                <Link ><button className='btn  btn-disabled'>pending</button></Link>
                                                                <label for="my-modal-6" onClick={() => setApproveOrder(order)} className={`btn btn-outline btn-success disabled mx-2 ${approveLoader && "loading"}`}> approved</label>
                                                            </>


                                                    }

                                                </>
                                                :
                                                <>
                                                    <Link ><button className='btn  btn-disabled'>Unpaid</button></Link>
                                                    <label for="my-modal-6" onClick={() => setOrderDelete(order)} className={`btn btn-outline btn-error mx-2 ${cencleLoader && "loading"}`}>Cancle</label>
                                                </>




                                        }


                                    </td>

                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                orderDelete && <ConfirmModal
                    type={false}
                    btn='DELETE'
                    msg='Are you sure delete this items !!'
                    services={orderDelete}
                    // setDelete={setOrderDelete}
                    handle={handleOrderCancle}
                ></ConfirmModal>

            }
            {
                approveOrder && <ConfirmModal
                    type={false}
                    btn='Approve'
                    msg='Are you sure delete this items !!'
                    services={approveOrder}
                    handle={hsndleStatus}
                >APP</ConfirmModal>

            }
        </div>
    );
};

export default ManageOrder;