
import { useQuery } from "react-query";

const useProducts = (page, size) => {

    // console.log(page, size); 

    const { isLoading, error, data } = useQuery({
        queryKey: ['data', page],
        queryFn: () =>
            fetch(`https://ass-backend-12-copy.onrender.com/services?page=${page}&size=8`).then(
                (res) => res.json(),
            ),
    })

    // console.log(services);

    // const { isLoading, error, data: services, refetch } = useQuery({
    //     queryKey: ['services'],
    //     queryFn: () =>
    //         fetch('https://ass-backend-12-copy.onrender.com/services').then(
    //             (res) => res.json(),
    //         ),
    // })


    return [data, isLoading, error]
}
export default useProducts;