"use client"
import Header from "./header"
import Body from "./body"
import PerksBenefits from "./perks_benefits"
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCompanyDetails } from "@/redux/slices/employer/company/companyThunk";


export default function CompanyProfilePage() {
    const searchParams = useSearchParams();
    const companyID = searchParams.get("companyID");
    const dispatch = useAppDispatch();

    const { selectedCompany, selectedCompanyError, selectedCompanyStatus } = useAppSelector((state) => state.companySlice);
    
    const headerData = selectedCompany? {
        name: selectedCompany?.information?.company_information?.name,
        email: selectedCompany?.information?.company_information?.email,
        avatar: selectedCompany?.avatar,
        banner: selectedCompany?.banner,
        founded: selectedCompany?.information?.company_information.founded,
        no_of_emp: selectedCompany?.information?.company_information.no_of_emp,
        region: selectedCompany?.information?.company_information?.region,
        industry: selectedCompany?.information?.company_information?.company_industry,
        profile: selectedCompany?.information?.company_information?.profile,
        phone: selectedCompany?.information?.company_information?.phone,
        address: selectedCompany?.information?.company_information?.address,
        benefits: selectedCompany?.benefits,

    }: null;

    const bodyData = selectedCompany? {
        profile: selectedCompany?.information?.company_information?.profile,
        email: selectedCompany?.information?.company_information?.email,
        phone: selectedCompany?.information?.company_information?.phone,
        
    }: null;
    
    
    useEffect(() => {
        if (companyID) {
            dispatch(getCompanyDetails(Number(companyID)));
        }
    }, [companyID, dispatch]);
    
    return (
        <>
            <Header data={headerData} />
            <Body data={bodyData} />
            <hr />
            <PerksBenefits data={selectedCompany?.benefits} />
        </>
    )
}