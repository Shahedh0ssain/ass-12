import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { useQuery } from "react-query";


// order hooks
const useOrder = () => {

    const [user] = useAuthState(auth);
    // const [orders, setOrders] = useState([]);

    // const {payment_id} = useParams();
    // console.log(payment_id);
    const email = user?.email;
    if (!email) {
        console.log('error', email)
    }

    // const { isLoading, error, data: orders, refetch } = useQuery(['order', true], () =>
    //     fetch(`http://localhost:5000/myservice?email=${email}`)
    //         .then(res => res.json()
    //             // .then(data => setAdmin(data?.admin))
    //         ))
    const { isLoading, error, data: orders, refetch } = useQuery({
        queryKey: ['order', true],
        queryFn: () =>
            fetch(`http://localhost:5000/myservice?email=${email}`).then(
                (res) => res.json(),
            ),
    })

    // console.log(orders)
    return [orders, isLoading, error, refetch]



    // useEffect(() => {

    //     if (user) {
    //         fetch(`http://localhost:5000/myservice?email=${user?.email}`)
    //             .then(res => res.json())
    //             .then(data => setOrders(data));
    //     }


    // }, [user, orders]);

    // return [orders, setOrders];
}
export default useOrder;