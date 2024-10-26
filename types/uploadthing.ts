export type CompleteUploadResponse = {
  key: string;
  url: string;
  serverData: {
    uploadedBy: string | null;
  };
  size: number;
  type: string;
  name: string;
};

export interface FileResponse {
  name: string;
  url: string;
  size: number;
}

export interface UploadResponse {
  name: string;
  url: string;
  size: number;
}
