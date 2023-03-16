
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../firebase.init";


//use Admin hook
const useUsers = () => {
    //    console.log(email)
    const [user, loading, Uerror] = useAuthState(auth);

    const { isLoading, error, data: users } = useQuery('user', () =>
        fetch(`https://ass-backend-12-copy.up.railway.app/user/${user?.email}`).then(res =>
            res.json()
        ))

    // console.log(users);

    return [users, isLoading, error,];
}

export default useUsers;