import { Profile } from "../features/app/components/profile";
import { AppLayout } from "../features/app/layouts/app-layout";


export default function ProfileRoute(){
    return (
       <AppLayout>
            <Profile/>
        </AppLayout>
    )
}