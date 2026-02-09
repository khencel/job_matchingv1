import React, { useState } from "react";
import Select from "react-select";
import { useTranslations } from "next-intl";

interface SelectOption {
    label: string;
    value: string;
}

interface MultipleSelectProps {
    data: SelectOption[];              
    value: SelectOption[];             
    onChange: (value: SelectOption[]) => void;
    placeholder?: string;
    isDisabled?: boolean;
}


export default function MultipleSelect({
    data,
    value,
    onChange,
    placeholder,
    isDisabled = false,
}:MultipleSelectProps){
    const t = useTranslations("multipleSelectStandard");
    return(
        <>
            <Select
                options={data}
                isMulti
                value={value}
                onChange={(selected) => onChange(selected as SelectOption[])}
                placeholder={placeholder || t("placeholder")}
                isDisabled={isDisabled}
                classNamePrefix="react-select"
            />
        </>
    )
}