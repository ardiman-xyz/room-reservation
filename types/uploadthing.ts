
export type CompleteUploadResponse = {
    key: string;
    url: string;
    serverData: {
        uploadedBy: string;
    }
    size: number;
    type: string;
    name: string;
}