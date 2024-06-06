import {WebNameForm} from "./_components/web-name-form";
import {LogoForm} from "./_components/logo-form";

import { getData } from "@/data/setting"

const SettingsPage = async () => {

    const setting = await getData();

    return (
        <div className="flex flex-col gap-y-8">
            <div>
                <WebNameForm name={setting?.name || ""}/>
            </div>
            <div>
                <LogoForm defaultData={setting?.logo || ""} />
            </div>
        </div>
    )
}

export default SettingsPage;