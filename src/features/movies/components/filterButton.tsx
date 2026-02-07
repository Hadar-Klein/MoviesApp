import { Button } from "antd";
import { FilterType } from "../types/FilterType";
import { AppDispatch, RootState } from "../../../redux-saga/store";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { changeFilter } from "../../../redux-saga/slices/FilterSlice";

export const FilterButton: React.FC<{
  buttonFilter: FilterType;
  label: string;
}> = ({ buttonFilter, label }) => {
  const filter = useSelector((state: RootState) => state.filter.filter);
  const dispatch = useDispatch<AppDispatch>();

  const focusTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const changeFilterHandler = () => {
    dispatch(changeFilter({ filter: buttonFilter }));
  };
  
  return (
    <Button
      type={filter === buttonFilter ? "primary" : "default"}
      className="bg-blue-800 text-white hover:bg-blue-700"
      onClick={() => {
        if (focusTimeoutRef.current) {
          clearTimeout(focusTimeoutRef.current);
        }
        changeFilterHandler();
      }}
      onFocus={() => {
        focusTimeoutRef.current = setTimeout(() => {
          changeFilterHandler();
        }, 2000);
      }}
      onBlur={() => {
        if (focusTimeoutRef.current) {
          clearTimeout(focusTimeoutRef.current);
        }
      }}
    >
      {label}
    </Button>
  );
};
