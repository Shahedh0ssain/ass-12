// import React, { Children } from 'react';
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { Link, NavLink, useLocation } from "react-router-dom";
import auth from "../firebase.init";
import ConfirmModal from "./ConfirmModal";
import CustomLink from "./CustomLink";


const Navber = ({ children }) => {

    const [user, loading] = useAuthState(auth);
    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);

    const handleLOgOut = () => {
        signOut(auth);
        setToggle2(false);
    }
    // console.log(user);

    const navLink = [

        <a className="p-3 font-medium "><CustomLink onClick={() => setToggle(false)} to='/'>Home</CustomLink ></a>,
        <a className="p-3 font-medium"><CustomLink onClick={() => setToggle(false)} to='products'>Products</CustomLink ></a>,
       
        // 
        user ?
            <>

                {
                    <a className="p-3 font-medium"><CustomLink onClick={() => setToggle(true)} to='dashboard'>Dashboard</CustomLink ></a>
                }
                <span className="p-3 font-medium">{user?.displayName}</span>

                <label for="my-modal-6" className='p-3 font-medium'
    
                    onClick={() => setToggle2(true)}

                >Logout</label>


            </>
            :
            <>
                <a className="p-3 font-medium"><CustomLink to='login'>Login</CustomLink ></a>,


            </>
    ]
    return (
        <div className=" drawer drawer-end ">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* <!-- Navbar --> */}
                <div className="w-full navbar bg-gradient-to-r from-[#e4cd81]  to-[#d4af37] ">
                    <div className="flex-1 px-2 mx-2 font-bold">
                        <img className="w-[60px] md:w-[100px]" src="https://www.dewalt.com/sites/g/files/xnuzat961/files/dewalt_black%402x.png" alt="" srcSet="" />

                    </div>

                    <div className="flex-none lg:hidden">
                        {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
                        {   //location.pathname ==
                            toggle && <label for="my-drawer-2" className="btn btn-primary drawer-button  lg:hidden">Dashboard</label>
                        }
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>

                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal items-center   ">

                            {navLink}

                        </ul>
                    </div>
                </div>
                {/* <!-- Page content here --> */}
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100">

                    {navLink}

                </ul>

            </div>

            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src="https://placeimg.com/80/80/people" />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
            {
                toggle2 && <ConfirmModal
                    services={null}
                    btn="Logout"
                    msg='Are you sure logout !!'
                    // setDelete={setServiceDelete}
                    handle={handleLOgOut}
                ></ConfirmModal>
            }
        </div>


    );
};

export default Navber;