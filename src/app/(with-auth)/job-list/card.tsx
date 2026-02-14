"use client";

import { useTranslations } from "next-intl";

export default function Card(){
    const t = useTranslations("jobListCard");
    return (
        <>
            <div className="card m-auto rounded-4 shadow" style={{ maxWidth: '400px' }}>
                <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop" 
                    className="card-img-top" 
                    alt={t("imageAlt")}
                    style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                    <h2 className="card-title h4 fw-bold mb-2">{t("title")}</h2>
                    <p className="text-muted mb-3">{t("company")}</p>
                    <p className="card-text">
                    {t("description")}
                    </p>
                </div>
            </div>
        </>
    )
}