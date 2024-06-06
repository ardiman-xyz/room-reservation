"use client"

import {
    Card,
    CardContent,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import ImageUpload from "@/components/image-upload";
import React, {useState, useTransition} from "react";
import {toast} from "sonner";
import {saveLogo, saveWebName} from "@/actions/setting";
import {useRouter} from "next/navigation";

interface LogoFormProps {
    defaultData: string
}

export const LogoForm = ({defaultData}: LogoFormProps) => {

    const router = useRouter()

    const [isPending, startTransition] = useTransition();
    const [image, setImage] = useState<string>(defaultData);

    const handleImageUploadPath = (data: any) => {
        setImage(data.url);

        onSubmit(data.url);
    };

    const onSubmit = (data: string) => {
        startTransition(() => {
            saveLogo(data).then((data) => {
                if(data?.success) {
                    toast.success(data.success)
                    router.refresh()
                }
            })
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Logo</CardTitle>
                <CardDescription>
                    Gunakan sebagai identitas website anda.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ImageUpload
                    onImageChange={data => handleImageUploadPath(data)}
                    data={image}
                    onDelete={() => setImage("")}
                    showTitle={false}
                    width={200}
                    height={200}
                />
            </CardContent>
        </Card>
    )
}