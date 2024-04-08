import PhotoCard from "./Card/PhotoCards";

export default function Photos({ photos }: { photos: File[] }) {
  return (
    <>
      {photos.length === 0 ? (
        <>there is no photos</>
      ) : (
        Array.isArray(photos) && <PhotoCard photos={photos} />
      )}
    </>
  );
}
