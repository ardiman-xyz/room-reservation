"use client"

import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useState, useTransition} from "react";


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {saveWebName} from "@/actions/setting";

    interface WebNameFormProps {
        name: string;
    }

    export const WebNameForm = ({name}: WebNameFormProps) => {

        const router = useRouter()

        const [isPending, startTransition] = useTransition();
        const [webName, setWebName] = useState<string>(name);

        const onSubmit = () => {
            if(!webName) {
                toast.error("Input harus diisi!")
                return
            }

            startTransition(() => {
                saveWebName(webName).then((data) => {
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
                    <CardTitle>Nama website</CardTitle>
                    <CardDescription>
                        Gunakan sebagai identitas website anda.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Input disabled={isPending} placeholder="Nama website" value={webName} onChange={e => setWebName(e.target.value)} />
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button className="h-8" onClick={onSubmit} disabled={webName === "" || isPending}>Simpan</Button>
                </CardFooter>
            </Card>
        )
    }