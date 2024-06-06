"use client";

import React from "react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import { CompleteUploadResponse } from "@/types/uploadthing";
import { toast } from "sonner";
import { TrashIcon } from "lucide-react";

interface ImageUploadProps {
  data: string;
  onImageChange: (res: CompleteUploadResponse) => void;
  onDelete: () => void;
  showTitle?: boolean
  width?: number;
  height?: number;
}

const ImageUpload = ({ data, onImageChange, onDelete, showTitle = true, width = 400, height = 300 }: ImageUploadProps) => {
  return (
    <div>
        {
            showTitle && <h1 className="text-sm font-semibold text-muted-foreground mb-2">
                Cover
            </h1>

        }
        {data !== "" ? (
            <div>
                <div className="relative">
                    <Image src={data} alt={"cover"} width={width} height={height} />
            <div
              className="absolute bottom-2 left-2 rounded-full bg-white p-2 cursor-pointer hover:bg-red-100"
              onClick={onDelete}
            >
              <TrashIcon size={15} />
            </div>
          </div>
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
