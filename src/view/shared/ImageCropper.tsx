import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import Modal from "@shared/Modal";

interface ImageCropperProps {
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (file: File) => void;
}

export default function ImageCropper({ isOpen, onClose, onCropComplete }: ImageCropperProps) {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setImage(reader.result as string);
    }
  };

  const onCropCompleteHandler = useCallback((_: Area, cropped: Area) => {
    setCroppedAreaPixels(cropped);
  }, []);

  const handleCropSubmit = async () => {
    if (!image || !croppedAreaPixels) return;
    const croppedFile = await cropImage(image, croppedAreaPixels);
    onCropComplete(croppedFile);
    setImage(null);
    onClose();
  };

  return (
    <Modal title="Image crop" isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="block w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {image && (
          <>
            <div className="relative w-72 h-72 mb-6 mx-auto rounded-lg overflow-hidden">
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
            <div className="flex justify-center">
              <button
                onClick={handleCropSubmit}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Обрезать и загрузить
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

async function cropImage(imageSrc: string, cropArea: Area): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("No canvas context");

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
        if (!blob) return reject("Failed to create blob");
        resolve(new File([blob], "cropped_image.png", { type: "image/png" }));
      }, "image/png");
    };
    image.onerror = (err) => reject(err);
  });
}
