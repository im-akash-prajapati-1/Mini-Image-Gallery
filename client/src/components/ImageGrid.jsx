import ImageCard from "./ImageCard";
export default function ImageGrid({
  images,
  onDelete,
  onOpen,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDrop,
}) {
  if (!images || images.length === 0)
    return <p className="text-gray-500">No images uploaded yet.</p>;

  return (
    <div className="columns-2 sm:columns-3 md:columns-4 gap-4">
      {images.map((img, index) => (
        <div
          key={img.id}
          className="mb-4 inline-block w-full break-inside-avoid"
          draggable
          onDragStart={() => onDragStart(index)}
          onDragEnter={(e) => onDragEnter(e, index)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={() => onDrop(index)}
        >
          <ImageCard
            img={img}
            index={index}
            onDelete={onDelete}
            onOpen={onOpen}
          />
        </div>
      ))}
    </div>
  );
}
