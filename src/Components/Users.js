import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useUsers from '../Hooks/useUsers';
import Button from './Button';
import ConfirmModal from './ConfirmModal';

const Users = () => {

    // const [users, isLoading, error,] = useUsers();
    const [users, setUsers] = useState([]);
    // // const [makeAdminrole, setMakeAdmin] = useState(null);
    const [makeAdminrole, setMakeAdmin] = useState(false);
    const [deleteAdmin, setDeleteAdmin] = useState(false);


    useEffect(() => {

        fetch(`http://localhost:5000/users`)
            .then(res => res.json())
            .then(data => setUsers(data));

    }, [users])
    


    const makeAdmin = (email) => {

        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error(`Failed to make an Admin`);

                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    // console.log(data)
                    toast.success(`Congratation ${email}`);
                }
            }
            );

    }


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>No</th>

                            <th>Email</th>
                            <th>Power</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}

                        {
                            users.map((user, index) => <tr>
                                <th>{index + 1}</th>
                                {/* <td>{user?.name}</td> */}
                                <td>{user?.email}</td>
                                {/* <td>{order?.price} Tk</td> */}
                                {/* <td>{order?._id }</td> */}
                                <td>
                                   <label for="my-modal-6" onClick={() => setDeleteAdmin(true)} className='btn btn-outline btn-error m-2'>Delete</label>

                                    {
                                        user?.role === 'admin' ?
                                            <button className='btn btn-outline btn-success disable m-2'>Admin</button>
                                            :
                                            <button onClick={() => makeAdmin(user?.email)} className='btn btn-outline btn-success m-2'>Make Admin</button>

                                    }
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deleteAdmin && <ConfirmModal
                    services={null}
                    btn="DELETE"
                    msg='Are you sure delete this items !!'
                ></ConfirmModal>
            }
        </div >
    );
};

export default Users;