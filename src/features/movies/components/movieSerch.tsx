import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { useEffect, useRef } from "react";
import { searchRequested } from "../../../redux-saga/slices/moviesSlice";
import { changeFilter } from "../../../redux-saga/slices/FilterSlice";
import { FilterType } from "../types/FilterType";
import { RootState } from "../../../redux-saga/store";

const { Search } = Input;

interface MovieSearchProps {
  "data-header-element"?: string;
}

export const MovieSearch: React.FC<MovieSearchProps> = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<any>(null);
  const filter = useSelector((state: RootState) => state.filter.filter);
  const debouncedDispatch = debounce((query: string) => {
    if (query.length < 2) return;
    dispatch(changeFilter({ filter: FilterType.Search }));
    dispatch(searchRequested({ query, page: 1 }));
  }, 500);

  useEffect(() => {
    return () => debouncedDispatch.cancel();
  }, [debouncedDispatch]);

  useEffect(() => {
    if (filter !== FilterType.Search) {
      inputRef.current.input.value = "";
    }
  }, [filter]);

  const onChange = (value: string) => {
    if (!value) {
      dispatch(changeFilter({ filter: FilterType.Popular }));
    } else {
      debouncedDispatch(value);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getHeaderElements = () =>
    Array.from(document.querySelectorAll<HTMLElement>("[data-header-element]"));

  return (
    <Search
      defaultValue=""
      ref={inputRef}
      data-header-element
      data-search-input="true"
      tabIndex={0}
      placeholder="Search movies..."
      allowClear
      enterButton
      onKeyDown={(e) => {
        const inputEl = inputRef.current?.input as HTMLInputElement;
        if (!inputEl) return;

        const cursor = inputEl.selectionStart ?? 0;
        const valueLength = inputEl.value.length;
        const headerElements = getHeaderElements();
        const currentIndex = headerElements.indexOf(
          inputEl.closest("[data-header-element]") as HTMLElement,
        );

        if (e.key === "ArrowDown") return;

        if (e.key === "ArrowUp") {
          e.stopPropagation();
          headerElements[1]?.focus();
          return;
        }
        if (e.key === "ArrowRight" && cursor === valueLength) {
          e.stopPropagation();
          headerElements[currentIndex + 1]?.focus();
          return;
        }
        if (e.key === "enter") {
          debouncedDispatch(inputEl.value);
        }
        e.stopPropagation();
      }}
      onSearch={debouncedDispatch}
      onChange={(e) => onChange(e.target.value)}
      onClear={() => dispatch(changeFilter({ filter: FilterType.Popular }))}
    />
  );
};
