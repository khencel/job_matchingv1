import React, { useState } from "react";
import Select from "react-select";


const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "mango", label: "Mango" },
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
