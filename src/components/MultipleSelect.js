import React, { useState } from "react";
import Select from "react-select";


const options = [
  { value: "apple", label: "IT Solution" },
  { value: "banana", label: "Call Center" },
  { value: "orange", label: "IT Consultant" },
  { value: "mango", label: "Production" },
];

const MultiSelectDropdown = ({ value, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState(value || []);

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
