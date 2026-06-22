import CustomSelect from "./ui/CustomSelect.jsx";

function RegionFilter({ filters, options, onFilterChange }) {
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      
      <CustomSelect
        options={options.regions || []}
        value={filters.region}
        onChange={(val) => onFilterChange("region", val)}
        placeholder="Select Region"
      />

      <CustomSelect
        options={options.categories || []}
        value={filters.category}
        onChange={(val) => onFilterChange("category", val)}
        placeholder="Select Category"
      />

    </div>
  );
}

export default RegionFilter;