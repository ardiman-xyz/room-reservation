
import {AccountForm} from "./_components/account-form";
import { getUserById } from "@/data/user"
import {auth} from "@/auth"
import {PasswordForm} from "./_components/password-form";

const AccountSettingPage = async () => {

    const session = await auth();

    const user  = await getUserById(session?.user.id);

    return (
       <div>
           {
               !user ? <div>null</div> :  (
                   <div className="flex flex-col gap-y-8">
                       <AccountForm user={user} />
                       <PasswordForm user={user} />
                   </div>
               )
           }
       </div>
    )
}

export default AccountSettingPage;