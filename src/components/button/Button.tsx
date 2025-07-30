import clsx from "clsx";
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
}

export default function Button({ children, href, className, ...rest }: ButtonProps) {
    const baseStyle = 'py-3.5 border-2 cursor-pointer transition duration-150 font-bold hover:opacity-90 active:opacity-85';

    return (
        href ?
            <Link
                href={href}
                className={clsx(baseStyle, className)}
            >
                {children}
            </Link>
            :
            <button
                className={clsx(baseStyle, className)}
                {...rest}
            >
                {children}
            </button>
    );
}