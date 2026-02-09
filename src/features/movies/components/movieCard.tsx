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
  }, [navigate, movie.id, movie]);

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img draggable={false} alt={title} src={posterUrl} />}
      onClick={() => goToMovieDetails()}
      onKeyDown={(e) => e.key === "Enter" && goToMovieDetails()}
    >
      <Card.Meta title={title} />
    </Card>
  );
};

export default memo(MovieCard);
