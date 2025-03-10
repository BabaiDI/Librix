import Modal from "@shared/Modal";
import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";

interface ImageUploaderProp {
  onCropComplete: (file: File) => void;
}

export default function ImageUploader({ onCropComplete }: ImageUploaderProp) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setImage(reader.result as string);
    }
  };

  const onCropCompleteHandler = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = () => {
    if (!image || !croppedAreaPixels) return;

    cropImage(image, croppedAreaPixels).then((data) => {
      if (!data) return;

      onCropComplete(data);
      setModalOpen(false);
    });
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Upload profile image
      </button>

      <Modal title="Image crop" isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-8">
          <div className="mb-6">
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 p-3"
            />
          </div>

          {image && (
            <div className="relative w-72 h-72 mb-6 mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropCompleteHandler}
              />
            </div>
          )}

          {image && (
            <div className="flex justify-center">
              <button
                onClick={getCroppedImage}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Обрезать и загрузить
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

async function cropImage(imageSrc: string, cropArea: Area) {
  return new Promise<File>((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas context not found");

      canvas.width = cropArea.width;
      canvas.height = cropArea.height;
      ctx.drawImage(
        image,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      canvas.toBlob((blob) => {
        if (!blob) return reject("Image processing error");
        resolve(new File([blob], "cropped_image.png", { type: "image/png" }));
      }, "image/png");
    };
    image.onerror = (error) => reject(error);
  });
}
