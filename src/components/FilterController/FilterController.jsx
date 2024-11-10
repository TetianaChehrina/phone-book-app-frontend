import { useDispatch } from "react-redux";
import css from "./FilterController.module.css";
import { setStatusFilter } from "../../redux/filters/filtersSlice.js";
import { contactType } from "./constants.jsx";
import { useState } from "react";

const FilterController = ({
  handleContactType,
  handleIsFavourite,
  favourite,
}) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filterParams = {};

    if (/^\d+$/.test(value)) {
      filterParams.number = value;
      filterParams.name = "";
    } else {
      filterParams.name = value;
      filterParams.number = "";
    }

    dispatch(setStatusFilter(filterParams));
  };

  const handleContactTypeChange = (event) => {
    handleContactType(event.target.name);
  };

  const handleFavouriteChange = () => {
    handleIsFavourite(!favourite);
  };

  return (
    <div className={css.searchBox_container}>
      <div className={css.search_input_container}>
        <input
          className={css.filter_input}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search contacts"
        />
      </div>
      <div className={css.type_container}>
        <ul className={css.type_list}>
          {contactType.map((type) => (
            <li key={type} className={css.type_item}>
              <button
                name={type}
                className={css.type_btn}
                onClick={handleContactTypeChange}
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={css.tabs_container}>
        <button className={css.type_btn} onClick={handleFavouriteChange}>
          Favourite
        </button>
      </div>
    </div>
  );
};

export default FilterController;
