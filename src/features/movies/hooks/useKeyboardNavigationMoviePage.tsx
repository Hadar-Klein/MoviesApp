import { useEffect, RefObject } from "react";

interface UseKeyboardNavigationProps {
  headerRef: RefObject<HTMLElement>;
  gridRef: RefObject<HTMLElement>;
  paginationRef: RefObject<HTMLElement>;
  gridColumns?: number;
}

export const useKeyboardNavigationMoviePage = ({
  headerRef,
  gridRef,
  paginationRef,
  gridColumns = 4,
}: UseKeyboardNavigationProps) => {
  useEffect(() => {
    const getHeaderElements = () =>
      Array.from(
        headerRef.current?.querySelectorAll<HTMLElement>(
          "[data-header-element]",
        ) || [],
      );

    const moveToHeader = (focusSearch = false) => {
      const headerElements = getHeaderElements();
      if (focusSearch) {
        const searchEl = headerElements.find(
          (el) => el.dataset.searchInput === "true",
        );
        const inputEl = searchEl?.querySelector("input") as HTMLInputElement;
        inputEl?.focus();
      } else {
        headerElements[0]?.focus();
      }
    };

    const moveToGrid = () => {
      requestAnimationFrame(() => {
        const firstCard =
          gridRef.current?.querySelector<HTMLElement>("[data-movie-card]");
        firstCard?.focus();
      });
    };

    const moveToPagination = () => {
      const firstPage = paginationRef.current?.querySelector<HTMLElement>(
        ".ant-pagination-item",
      );
      firstPage?.focus();
    };

    const handleHeaderKey = (e: KeyboardEvent, active: HTMLElement) => {
      const elements = getHeaderElements();
      const index = elements.indexOf(active);
      const isSearch =
        active.tagName === "INPUT" && active.closest("[data-search-input]");

      if (isSearch)
        return handleSearchKey(e, active as HTMLInputElement, elements, index);

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          elements[index + 1]?.focus();
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (index === 1) moveToHeader(true);
          else elements[index - 1]?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          moveToGrid();
          break;
        case "Enter":
          e.preventDefault();
          active.click();
          moveToGrid();
          break;
      }
    };

    const handleSearchKey = (
      e: KeyboardEvent,
      inputEl: HTMLInputElement,
      elements: HTMLElement[],
      index: number,
    ) => {
      const cursor = inputEl.selectionStart ?? 0;
      const valueLength = inputEl.value.length;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          moveToGrid();
          break;
        case "ArrowUp":
          e.preventDefault();
          moveToHeader();
          break;
        case "ArrowLeft":
          if (cursor === 0) {
            e.preventDefault();
            elements[index - 1]?.focus();
          }
          break;
        case "ArrowRight":
          if (cursor === valueLength) {
            e.preventDefault();
            elements[index + 1]?.focus();
          }
          break;
        case "Enter":
          e.preventDefault();
          inputEl.click();
          moveToGrid();
          break;
      }
    };

    const handleGridKey = (e: KeyboardEvent, active: HTMLElement) => {
      const cards =
        gridRef.current?.querySelectorAll<HTMLElement>("[data-movie-card]");
      if (!cards) return;
      const index = Array.from(cards).indexOf(active);

      const focusCard = (i: number) => {
        const card = cards[i];
        if (!card) return;
        card.focus();
        card.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      };

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          focusCard(index + 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          focusCard(index - 1);
          break;
        case "ArrowDown": {
          e.preventDefault();
          const nextIndex = index + gridColumns;
          if (cards[nextIndex]) focusCard(nextIndex);
          else moveToPagination();
          break;
        }
        case "ArrowUp":
          e.preventDefault();
          if (index < gridColumns) moveToHeader(true);
          else focusCard(index - gridColumns);
          break;
        case "Enter":
          e.preventDefault();
          active.click();
          break;
      }
    };

    const handlePaginationKey = (e: KeyboardEvent, active: HTMLElement) => {
      const items = paginationRef.current?.querySelectorAll<HTMLElement>(
        ".ant-pagination-item, .ant-pagination-next, .ant-pagination-prev",
      );
      if (!items) return;
      const index = Array.from(items).indexOf(active);

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          items[index + 1]?.focus();
          break;
        case "ArrowLeft":
          e.preventDefault();
          items[index - 1]?.focus();
          break;
        case "ArrowUp": {
          e.preventDefault();
          const cards =
            gridRef.current?.querySelectorAll<HTMLElement>("[data-movie-card]");
          const lastCard = cards?.[cards.length - 1];
          lastCard?.focus();
          lastCard?.scrollIntoView({ behavior: "smooth", block: "nearest" });
          break;
        }
        case "Enter":
          e.preventDefault();
          active.click();
          break;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      if (!active) return;

      if (headerRef.current?.contains(active)) handleHeaderKey(e, active);
      else if (gridRef.current?.contains(active)) handleGridKey(e, active);
      else if (paginationRef.current?.contains(active))
        handlePaginationKey(e, active);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [headerRef, gridRef, paginationRef, gridColumns]);
};
