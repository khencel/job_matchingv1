"use client"

import { BiArrowBack } from "react-icons/bi";
import { FaCalendarCheck, FaSliders  } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect } from "react";
import type { RootState } from "@/redux/store";
import {useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { listJobPost } from "@/redux/features/job_post/job_post_thunk";


export default function JobListing (){
    const dispatch = useAppDispatch();
    const {items, status, error, loading} = useSelector((state: RootState) => state.jobListing);


    useEffect(() => {
        const userId = Number(localStorage.getItem("user_id"));
        if (userId) {
            dispatch(listJobPost(userId));
        }
    },[dispatch]) 

    return (
        <>
            <div className="row standar-div">
                <div className="col ">
                    <h5><strong><BiArrowBack /> Job Listing</strong></h5>
                </div>
                <div className="col text-end">
                    <span>November - December 2025 <FaCalendarCheck className="text-primary" /></span>
                </div>
            </div>
            

            <div className="row standar-div mt-2">
                <div className="col">
                    <strong>Job List</strong>
                </div>
                <div className="col-2 text-end">
                    <FaSearch className="text-primary" /> Search Jobs
                </div>
                <div className="col-2 text-end">
                    <FaSliders className="text-primary" /> Filter
                </div>
            </div>

            <div className="row standar-div">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Role</th>
                                <th>Date Posted</th>
                                <th>Salary</th>
                                <th>Job type</th>
                                <th>Applicants</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item: any) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.created_at}</td>
                                    <td>{item.salary}</td>
                                    <td><span className="badge rounded-4 p-2 bg-success">{item.type_of_emp}</span></td>
                                    <td>{item.applicants?item.applicants:0}</td>
                                    <td><HiDotsHorizontal className="btn-link" /></td>  
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}