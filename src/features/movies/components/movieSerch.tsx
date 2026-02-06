import { Input } from "antd";
import { useDispatch } from "react-redux";
import {
  getMoviesRequested,
  searchRequested,
} from "../../../redux-saga/slices/moviesSlice";
import debounce from "lodash.debounce";
import { use, useEffect } from "react";
import { FilterType } from "../types/FilterType";

const { Search } = Input;

export const MovieSearch: React.FC = () => {
  const dispatch = useDispatch();

  const debouncedDispatch = debounce((query) => {
    if (query.length < 2) return;
    dispatch(searchRequested(query));
  }, 500);

  useEffect(() => {
    return () => {
      debouncedDispatch.cancel();
    };
  }, [debouncedDispatch]);

  const onChange = (value: string) => {
    if (value.length == 0) {
      dispatch(getMoviesRequested(FilterType.Popular));
    } else debouncedDispatch(value);
  };
  return (
    <Search
      placeholder="Search movies..."
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onSearch={(query) => dispatch(searchRequested(query))}
      enterButton
      allowClear
    />
  );
};
