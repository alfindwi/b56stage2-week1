import { LeftBar } from "../components/left-bar";
import { RightBar } from "../components/right-bar";

export function AppLayout({children} : {children: React.ReactNode}) {
    return (
        <>
        <LeftBar/>
        {children}
        <RightBar/> 
        </>
    )
}