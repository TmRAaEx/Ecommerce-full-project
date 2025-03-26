import {ReactNode} from "react";
import {HTMLAttributes} from "react"

interface IPageContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export default function PageContainer({children, ...rest}: IPageContainerProps) {
    return <>
        <section className="flex justify-center flex-col items-center gap-2"
                 {...rest}
        >
            {children}
        </section>
    </>
}