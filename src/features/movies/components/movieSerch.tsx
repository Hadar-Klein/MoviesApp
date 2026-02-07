import { Input } from "antd";
import { useDispatch } from "react-redux";
import { searchRequested } from "../../../redux-saga/slices/moviesSlice";
import debounce from "lodash.debounce";
import { useEffect } from "react";
import { changeFilter } from "../../../redux-saga/slices/FilterSlice";
import { FilterType } from "../types/FilterType";

const { Search } = Input;

export const MovieSearch: React.FC = () => {
  const dispatch = useDispatch();

  const debouncedDispatch = debounce((query) => {
    if (query.length < 2) return;
    dispatch(changeFilter({ filter: FilterType.Search }));
    dispatch(searchRequested({ query, page: 1 }));
  }, 500);

  useEffect(() => {
    return () => {
      debouncedDispatch.cancel();
    };
  }, [debouncedDispatch]);

  const onChange = (value: string) => {
    if (value.length == 0) {
      dispatch(changeFilter({ filter: FilterType.Popular }));
    } else debouncedDispatch(value);
  };
  return (
    <Search
      placeholder="Search movies..."
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onClear={() => dispatch(changeFilter({ filter: FilterType.Popular }))}
      enterButton
      allowClear
    />
  );
};
