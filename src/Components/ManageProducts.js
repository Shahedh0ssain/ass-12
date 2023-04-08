import React, { useState } from 'react';
import { useQuery } from 'react-query';
import useProducts from '../Hooks/useProduct';
import ConfirmModal from './ConfirmModal';
import Loading from './Loading';
import ManageAll from './ManageAll';

const ManageProducts = () => {


    // const { isLoading, error,refetch, data: services } = useQuery({
    //     queryKey: ['Alldata'],
    //     queryFn: () =>
    //         fetch(`https://ass-backend-12-copy.onrender.com/all-services`).then(
    //             (res) => res.json(),
    //         ),
    // })

    const [page, setPage] = useState(0);
    const [data, isLoading, error] = useProducts(page, 8);
    const [serviceDelete, setServiceDelete] = useState(null);

    const Pages = Math.ceil(data?.count / 8);

    if (isLoading) {
        return <Loading></Loading>
    }

    if (error) {
        console.log(error, 'ManageProduct')
        return <p>{error}</p>

    }

    const handleServiceDelete = (id) => {

        fetch(`https://ass-backend-12-copy.onrender.com/deleteService/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // refetch();
                }
            });
        setServiceDelete(null);
    }


    return (
        <div id="manageProduct">
            <h1 className='text-xl p-2'>Manage All Products</h1>
            {
                data?.services?.map(service => <ManageAll
                    key={service._id}
                    service={service}
                    handle={handleServiceDelete}
                    setServiceDelete={setServiceDelete}

                ></ManageAll>)
            }

            {
                serviceDelete && <ConfirmModal
                    services={serviceDelete}
                    btn="DELETE"
                    msg='Are you sure delete this items !!'
                    // setDelete={setServiceDelete}
                    handle={handleServiceDelete}
                ></ConfirmModal>

            }

            <div className=' btn-group py-5 flex justify-center'>
                {
                    [...Array(Pages).keys()].map(Number => <a

                        href='#manageProduct'
                        key={Number}
                        className={page === Number ? 'btn ' : 'btn btn-active '}
                        onClick={() => {
                            setPage(Number);
                            // ScrollToTopOnMount();
                        }}
                    >{Number + 1}</a>)
                }
            </div>
        </div>
    );
};

export default ManageProducts;