import { useState, useRef, useEffect } from "react";
import { FaSliders } from "react-icons/fa6";

const FilterDropdown = ({ onApply }: { onApply: (filters: any) => void }) => {
  const [open, setOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = ["Job Seeker", "Employer", "Active", "Inactive"];

  // Toggle filter selection
  const handleCheck = (option: string) => {
    if (selectedFilters.includes(option)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== option));
    } else {
      setSelectedFilters([...selectedFilters, option]);
    }
  };

  // Apply selected filters
  const handleApply = () => {
    onApply(selectedFilters);
    setOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="col-2 text-end position-relative" ref={dropdownRef}>
      <button
        className="btn btn-link text-primary"
        onClick={() => setOpen(!open)}
      >
        <FaSliders className="me-1" /> Filter
      </button>

      {open && (
        <div className="dropdown-menu show dropdown-menu-end p-3" style={{ minWidth: "200px" }}>
          {options.map((option) => (
            <div className="form-check" key={option}>
              <input
                className="form-check-input"
                type="checkbox"
                value={option}
                id={option}
                checked={selectedFilters.includes(option)}
                onChange={() => handleCheck(option)}
              />
              <label className="form-check-label" htmlFor={option}>
                {option}
              </label>
            </div>
          ))}

          <button
            className="btn btn-primary btn-sm mt-2 w-100"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
