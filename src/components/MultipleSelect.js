import React, { useState } from "react";
import Select from "react-select";
import { listCategory } from "./listGroupData";
import { useTranslations } from "next-intl";


// const options = [
//   { value: "apple", label: "IT Solution" },
//   { value: "banana", label: "Call Center" },
//   { value: "orange", label: "IT Consultant" },
//   { value: "mango", label: "Production" },
// ];

const MultiSelectDropdown = ({ value, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState(value || []);
  const t = useTranslations("listGroupData");

  const options = listCategory.map((item) => ({
    ...item,
    label: t(`categories.${item.value}`),
  }));

  return (
    <div>
      <Select
        options={options}
        isMulti
        value={value}          
        onChange={onChange}   
      />
    </div>
  );
};

export default MultiSelectDropdown;
