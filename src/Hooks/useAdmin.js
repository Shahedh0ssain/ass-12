import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../firebase.init";
//use Admin hook

const useAdmin = () => {

    const [user] = useAuthState(auth);
    // const [admin, setAdmin] = useState(false);
    // const [adminLoading, setAdminLoading] = useState(true);
    let email = user?.email;
    // console.log(email)
    if (!email) {
        console.log(email, "error");
        // return
    }

    const { isLoading, error, data: admin } = useQuery('role', () =>
        fetch(`https://ass-backend-12-copy.onrender.com/admin/${email}`).then(res =>
            res.json()
        ))

    // console.log(admin)

    return [admin, isLoading, error]

    // const { isLoading, error, data } = useQuery('admin', () =>
    //     fetch(`https://ass-backend-12-copy.onrender.com/admin/${email}`)
    //         .then(res => res.json()
    //             .then(data => setAdmin(data?.admin))
    //         ))

    // console.log(admin);




    // useEffect(() => {
    //     const email = user?.email;
    //     if (email) {
    //         fetch(`https://ass-backend-12-copy.onrender.com/admin/${email}`)
    //             .then(res => res.json())
    //             .then(data => setAdmin(data?.admin))
    //     }
    //     setAdminLoading(false);
    // }, [])



    // return [data, admin, isLoading, error];
    // return [admin];
}

export default useAdmin;