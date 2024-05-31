"use client";

import React from "react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import { CompleteUploadResponse } from "@/types/uploadthing";
import { toast } from "sonner";
import { TrashIcon } from "lucide-react";

interface ImageUploadProps {
  data: CompleteUploadResponse | null;
  onImageChange: (res: CompleteUploadResponse) => void;
  onDelete: () => void;
}

const ImageUpload = ({ data, onImageChange, onDelete }: ImageUploadProps) => {
  return (
    <div>
      <h1 className="text-sm font-semibold text-muted-foreground mb-2">
        Cover
      </h1>

      {data != null ? (
        <div>
          <div className="relative">
            <Image src={data.url} alt={"cover"} width={400} height={300} />
            <div
              className="absolute bottom-2 left-2 rounded-full bg-white p-2 cursor-pointer hover:bg-red-100"
              onClick={onDelete}
            >
              <TrashIcon size={15} />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{data.name}</p>
        </div>
      ) : (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            onImageChange(res[0]);
            toast.success("Upload image uploaded");
          }}
          onUploadError={(error: Error) => {
            console.log(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
};

export default ImageUpload;
