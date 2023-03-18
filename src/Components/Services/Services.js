
// import useProducts from '../Hooks/useProduct';
import useProducts from '../../Hooks/useProduct';
import Service from './Service';
import { useNavigate } from 'react-router-dom';
// import Loading from '../Components/Loading';
import Loading from '../Loading';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
// import ScrollToTopOnMount from '../ScrollToTopOnMount';

const Services = ({ item }) => {

    // const [services, isLoading, error] = useProducts();
    const navigate = useNavigate();
    const [page, setPage] = useState(0);



    const { isLoading, error, data } = useQuery({
        queryKey: ['data', page],
        queryFn: () =>
            fetch(`http://localhost:5000/services?page=${page}&size=8`).then(
                (res) => res.json(),
            ),
    })



    const Pages = Math.ceil(data?.count / 8);


    const showDetail = id => {
        const path = `/ProductId/${id}`;
        navigate(path);
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    if (error) {
        console.log('data fetch error')
    }

    return (
        <div id='Services' className='p-2 md:p-5 flex flex-col items-center'>

            <div className=' py-3 md:py-10'>
                <span className=' text-center text-2xl font-medium text-gray-600 border-b-4 border-[#d4af37]'>
                    All Services
                </span>
                {/* <p className='text-3xl'>{data.count}</p> */}
            </div>
            {/* <h1 className='p-5 text-xl md:text-4xl text-center'>Services</h1> */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {
                    data?.services?.map(service => <Service
                        key={service._id}
                        service={service}
                        handle={showDetail}
                    ></Service>
                    )
                }
            </div>

            {/* <p className='text-3xl'>Current page : {page}</p> */}

            {/* pagination */}
            <div className=' href="#"  btn-group py-5'>

                {
                    [...Array(Pages).keys()].map(Number => <a

                        href='#Services'
                        key={Number}
                        className={page === Number ? 'btn ' : 'btn btn-active '}
                        onClick={() => {
                            setPage(Number);
                            // ScrollToTopOnMount();
                        }}
                    //    className="divide-fuchsia-50"
                    >{Number + 1}</a>)
                }

            </div>
        </div>
    );
};

export default Services;