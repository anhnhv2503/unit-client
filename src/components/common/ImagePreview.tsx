import React from "react";

type ImagePreviewProps = {
  selectedImage: string | undefined;
  closeModal: () => void;
  handleOverlayClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({
  handleOverlayClick,
  closeModal,
  selectedImage,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-white text-2xl font-bold"
        >
          &times;
        </button>
        <img
          src={selectedImage || ""}
          alt="Full-size"
          className="max-w-full max-h-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImagePreview;
