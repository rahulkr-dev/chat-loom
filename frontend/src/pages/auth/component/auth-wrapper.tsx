import { ReactNode } from "react";
export const AuthWrapper = ({ children }: { children: ReactNode })=>{
    return (
        <div className="h-screen flex justify-center items-center">
            {children}
        </div>
    )
}

