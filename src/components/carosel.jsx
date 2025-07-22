import React from "react";
import Card from "./Card";
import { CardSkeleton } from "./Skeleton";

function Carosel({ data, loading, mediaType }) {
  // If data is null/undefined or data.results isn't an array, default to []
  const items = Array.isArray(data?.results) ? data.results : [];

  return (
    <div className="cards">
      {!loading
        ? items.map((result) => (
            <Card
              key={result.id}
              result={result}
              mediaType={mediaType}
            />
          ))
        : Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))
      }
    </div>
  );
}

export default Carosel;
