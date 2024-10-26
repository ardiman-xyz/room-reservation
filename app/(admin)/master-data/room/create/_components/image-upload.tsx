"use client";

import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { TrashIcon, FileIcon } from "lucide-react";

import { UploadDropzone } from "@/lib/uploadthing";
import { CompleteUploadResponse, FileResponse } from "@/types/uploadthing";

interface UploadProps {
  data: FileResponse | null; // Ubah disini untuk menerima null
  onChange: (res: FileResponse) => void;
  onDelete: () => void;
  title?: string;
  type?: "image" | "file";
}

const Upload = ({
  data,
  onChange,
  onDelete,
  title = "Upload",
  type = "image",
}: UploadProps) => {
  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toLowerCase() || "";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isImageFile = (filename: string) => {
    const ext = getFileExtension(filename);
    return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
  };

  const renderPreview = () => {
    if (!data) return null;

    if (type === "image" || isImageFile(data.name)) {
      return (
        <div className="relative group">
          <img
            src={data.url}
            alt={data.name}
            width={400}
            height={300}
            className="rounded-lg object-cover"
          />
          <button
            onClick={onDelete}
            className="absolute bottom-2 left-2 rounded-full bg-white p-2 cursor-pointer hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Delete file"
          >
            <TrashIcon size={15} className="text-red-500" />
          </button>
          <p className="text-sm text-muted-foreground mt-2">{data.name}</p>
        </div>
      );
    } else {
      return (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <FileIcon size={24} className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium truncate max-w-[200px]">
                  {data.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(data.size)} •{" "}
                  {getFileExtension(data.name).toUpperCase()}
                </p>
              </div>
            </div>
            <button
              onClick={onDelete}
              className="p-2 hover:bg-red-100 rounded-full transition-colors"
              aria-label="Delete file"
            >
              <TrashIcon size={15} className="text-red-500" />
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-sm font-semibold text-muted-foreground mb-2">
        {title}
      </h1>

      {data ? (
        renderPreview()
      ) : (
        <UploadDropzone
          endpoint={type === "image" ? "imageUploader" : "fileUploader"}
          onClientUploadComplete={(res) => {
            onChange(res[0]);
            toast.success(
              `${type === "image" ? "Image" : "File"} uploaded successfully`
            );
          }}
          onUploadError={(error: Error) => {
            toast.error(`Upload failed: ${error.message}`);
            console.error("Upload error:", error);
          }}
        />
      )}
    </div>
  );
};

export default Upload;
