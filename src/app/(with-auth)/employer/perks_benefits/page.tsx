"use client"

import { BiArrowBack } from "react-icons/bi";
import { FaCalendarCheck } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { AddButton } from "@/components/Button";
import { FaPlus } from "react-icons/fa6";
import AddModal from "./add_modal";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { indexPerksBenefits } from "@/redux/slices/perks_benefits/perksBenefitsThunk";
import FormattedDate from "@/components/date_format";


export default function PerksBenefitsPage(){
    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch();
    
    const {items, status, error} = useAppSelector((state) => state.perksAndBenefitsSlice);

    const handleAdd = () => {
        setShowModal(true);
    }
    const handleClose = () => setShowModal(false);

    useEffect(() => {
        const user_id = typeof window !== "undefined" ? localStorage.getItem("user_id"): null;
        if(user_id){
            dispatch(indexPerksBenefits(Number(user_id)));
        }
    }, []);


    return (
        <>
            <div className="row standar-div">
                <div className="col">
                    <h5><strong><BiArrowBack /> Perks & Benefits</strong></h5>
                </div>
                <div className="col text-end">
                    <span>November - December 2025 <FaCalendarCheck className="text-primary" /></span>
                </div>
            </div>

            <div className="row standar-div mt-2">
                <div className="col">
                    <strong>Perks & Benefits ({items.length}) total</strong>
                </div>
                <div className="col-2 text-end">
                    {/* <button className="btn btn-primary-custom"> Add Perks & Benefits</button> */}
                    <AddButton onClick={handleAdd} label="Perks & Benefits" className="btn btn-primary-custom" icon={<FaPlus />} />               
                </div>
            </div>

            <div className="row standar-div">
                <div className="col">
                        <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Created At</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        status === "loading" && (
                                            <tr>
                                                <td colSpan={5}>Loading...</td>
                                            </tr>
                                        )
                                    }

                                    {
                                        status === "succeeded" && items.length === 0 && (
                                            <tr>
                                                <td colSpan={5}>No data found</td>
                                            </tr>
                                        )
                                    }

                                    {items.map((perk, index) => (
                                        <tr key={perk.id}>
                                            <td>{index + 1}</td>
                                            <td>{perk.name}</td>
                                            <td>{perk.description}</td>
                                            <td>{<FormattedDate date={perk.created_at}/>}</td>
                                            <td>
                                                <HiDotsHorizontal className="cursor-pointer" />
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </>
                </div>
            </div>
            <AddModal handleShow={showModal} handleClose={handleClose} />
        </>
    );
}