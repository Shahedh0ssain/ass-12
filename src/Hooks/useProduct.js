
import { useQuery } from "react-query";

const useProducts = () => {


    // const { isLoading, error, data: services, refetch } = useQuery(queryKey: ['services'], () =>
    //     fetch('https://ass-backend-12-copy.up.railway.app/services').then(res =>
    //         res.json()
    //     ))


    const { isLoading, error, data: services, refetch } = useQuery({
        queryKey: ['services'],
        queryFn: () =>
            fetch('https://ass-backend-12-copy.up.railway.app/services').then(
                (res) => res.json(),
            ),
    })


    return [services, isLoading, error, refetch]
}
export default useProducts;