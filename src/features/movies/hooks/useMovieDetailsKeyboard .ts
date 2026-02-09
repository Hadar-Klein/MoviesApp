import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useMovieDetailsKeyboard = ({
  toggleFavorite,
}: {
  toggleFavorite: () => void;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          navigate(-1); 
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          toggleFavorite(); 
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, toggleFavorite]);
};
