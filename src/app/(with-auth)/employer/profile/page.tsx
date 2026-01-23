"use client"

import Header from "./header"
import Body from "./body"
import PerksBenefits from "./perks_benefits"
import { getProfile } from "@/redux/slices/profile/profilethunk"
import { useAppDispatch } from "@/redux/hooks"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { useEffect } from "react"
import SpinnerComponent from "@/components/spinner"
import Cookies from "js-cookie"



export default function Profile(){
    const dispatch = useAppDispatch()
    const {profile,status,error} = useSelector((state:RootState) => state.profileSlice)
    
    useEffect(() => {
        const user_id = Number(Cookies.get("user_id"))
        dispatch(getProfile(user_id))
    }, [dispatch])
    

    if(status === "loading"){
        return <SpinnerComponent />
    }
    if(status === "failed"){
        return <p>{error}</p>
    }

    console.log(profile);
    
    return(
        <>
            {profile && <Header data={profile} />}
            {profile && <Body data={profile} />}
            <hr />
            {/* {profile && <Team data={profile} />} */}
            {profile && <PerksBenefits data={profile.perks_benefits} />}
        </>
    )
}