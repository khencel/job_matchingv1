"use client"

import { useTranslations } from "next-intl";
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
import { indexPerksBenefits, deletePerksBenefits } from "@/redux/slices/perks_benefits/perksBenefitsThunk";
import FormattedDate from "@/components/date_format";
import Dropdown from "react-bootstrap/Dropdown";
import { popup } from "@/helper/pop_up";
import { showSuccessToast } from "@/app/(util)/toaster";
import EditModal from "./edit_modal";
import Cookies from "js-cookie";



export default function PerksBenefitsPage(){
    const t = useTranslations("employerPerksBenefitsPage");
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const dispatch = useAppDispatch();

    const {items, status, error} = useAppSelector((state) => state.perksAndBenefitsSlice);
    const [selectedPerks, setSelectedPerks] = useState<any>([]);


    const handleAdd = () => {
        setShowModal(true);
    }
    const handleClose = () => setShowModal(false);


   

    const handleDelete = (id: number) => {
        popup({
            title: t("confirm.title"),
            text: t("confirm.text"),
            confirmText: t("confirm.confirmText"),
            icon:"warning",
            onConfirm: () => {
                    dispatch(deletePerksBenefits(id));
                    showSuccessToast(t("toast.title"), t("toast.success"))
                    handleClose();
                }
        })        
    }

    const getPerks = () => {
        const user_id = typeof window !== "undefined" ? Cookies.get("user_id"): null;
        if(user_id){
            dispatch(indexPerksBenefits(Number(user_id)));
        }
    }


    const handleEdit = (data: {}) => {
        setShowModalEdit(true);
        setSelectedPerks(data);

    }
    const handleCloseEdit = () => setShowModalEdit(false);


    useEffect(() => {
       getPerks();
    }, []);


    return (
        <>
            <div className="row standar-div">
                <div className="col">
                    <h5><strong><BiArrowBack /> {t("title")}</strong></h5>
                </div>
                <div className="col text-end">
                    <span>{t("dateRange")} <FaCalendarCheck className="text-primary" /></span>
                </div>
            </div>

            <div className="row standar-div mt-2">
                <div className="col">
                    <strong>{t("listTitle", { count: items.length })}</strong>
                </div>
                <div className="col-2 text-end">
                    {/* <button className="btn btn-primary-custom"> Add Perks & Benefits</button> */}
                    <AddButton onClick={handleAdd} label={t("addButton")} className="btn btn-primary-custom" icon={<FaPlus />} />               
                </div>
            </div>

            <div className="row standar-div">
                <div className="col">
                        <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>{t("table.index")}</th>
                                        <th>{t("table.name")}</th>
                                        <th>{t("table.description")}</th>
                                        <th>{t("table.createdAt")}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        status === "loading" && (
                                            <tr>
                                                <td colSpan={5}>{t("state.loading")}</td>
                                            </tr>
                                        )
                                    }

                                    {
                                        status === "succeeded" && items.length === 0 && (
                                            <tr>
                                                <td colSpan={5}>{t("state.empty")}</td>
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
                                                <Dropdown align="end">
                                                    <Dropdown.Toggle
                                                        variant="link"
                                                        className="p-0 text-dark shadow-none no-caret"
                                                    >
                                                        <HiDotsHorizontal size={20} />
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => handleEdit(perk)}>
                                                            {t("actions.edit")}
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            className="text-danger"
                                                            onClick={() => handleDelete(perk.id)}
                                                        >
                                                            {t("actions.delete")}
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </>
                </div>
            </div>
            <AddModal handleShow={showModal} handleClose={handleClose} />
            <EditModal showModalEdit={showModalEdit} closeModalEdit={handleCloseEdit} data={selectedPerks}/>
        </>
    );
}