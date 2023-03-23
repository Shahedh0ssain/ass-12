
import { useQuery } from "react-query";

const useProducts = (page, size) => {

    // console.log(page, size); 

    const { isLoading, error, data } = useQuery({
        queryKey: ['data', page],
        queryFn: () =>
            fetch(`http://localhost:5000/services?page=${page}&size=8`).then(
                (res) => res.json(),
            ),
    })

    // console.log(services);

    // const { isLoading, error, data: services, refetch } = useQuery({
    //     queryKey: ['services'],
    //     queryFn: () =>
    //         fetch('http://localhost:5000/services').then(
    //             (res) => res.json(),
    //         ),
    // })


    return [data, isLoading, error]
}
export default useProducts;