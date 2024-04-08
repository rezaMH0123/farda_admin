import FileCard from "./Card/FileCards";

export default function Files({ files }: { files?: File[] }) {
  return (
    <>
      {files?.length === 0 ? (
        <>there is no files</>
      ) : (
        Array.isArray(files) && <FileCard files={files} />
      )}
    </>
  );
}
