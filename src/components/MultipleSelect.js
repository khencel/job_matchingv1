import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "mango", label: "Mango" },
];

const MultiSelectDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <div>
      <Select
        options={options}
        isMulti
        value={selectedOptions}
        onChange={setSelectedOptions}
      />

      <p>
        Selected: {selectedOptions.map((opt) => opt.label).join(", ")}
      </p>
    </div>
  );
};

export default MultiSelectDropdown;
