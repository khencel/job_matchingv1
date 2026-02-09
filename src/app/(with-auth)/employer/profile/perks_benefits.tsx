"use client";

import { useTranslations } from "next-intl";

export default function PerksBenefits({data}:{data:any}){
    const t = useTranslations("employerPerksBenefits");
    return(
        <>
            <div className="py-4">
                <div className="row">
                    <div className="col">
                        <h3><strong>{t("title")}</strong></h3>
                        <small>{t("subtitle")}</small>
                        <br />
                        <div className="row">
                            
                            {data.map((item:any,index:number) => {
                                return(
                                    <div className="col-md-3" key={index}>
                                        <div className=" p-2">
                                            <strong>{item.name}</strong>
                                            <p>
                                                <small>{item.description}</small>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}