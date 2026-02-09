import React, { memo, useCallback } from "react";
import { Card } from "antd";
import { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { title, posterUrl } = movie;
  const navigate = useNavigate();

  const goToMovieDetails = useCallback(() => {
    navigate(`/movie/${movie.id}`, {
      state: { movie },
    });
  }, [navigate, movie]);

  return (
    <div
      data-movie-card
      tabIndex={0}
      onClick={goToMovieDetails}
      style={{ 
        outline: 'none', 
        cursor: 'pointer' 
      }}
      className="
        focus:ring-4 
        focus:ring-blue-500 
        focus:scale-105 
        transition-all 
        duration-200 
        rounded-lg
      "
    >
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img draggable={false} alt={title} src={posterUrl} />}
      >
        <Card.Meta title={title} />
      </Card>
    </div>
  );
};

export default memo(MovieCard);