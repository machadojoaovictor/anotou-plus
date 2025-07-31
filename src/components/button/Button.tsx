import clsx from "clsx";
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "default" | "primary" | "outlineDark";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    variant?: ButtonVariant;
}

export default function Button({ children, href, className, variant = "default", ...rest }: ButtonProps) {
    const baseStyle = 'border-2 cursor-pointer transition duration-150 hover:opacity-90 active:opacity-85';

    const variants = {
        default: "bg-blue-500 border-blue-500 py-3.5 rounded-lg text-on-dark font-bold",
        primary: "bg-secondary-background px-4 py-2 rounded-sm text-lg font-medium",
        outlineDark: "border-on-dark text-on-dark font-medium px-10 py-3.5 rounded-full"
    }

    const buttonClasses = clsx(
        baseStyle,
        variants[variant],
        className
    );

    return (
        href ?
            <Link
                href={href}
                className={buttonClasses}
            >
                {children}
            </Link>
            :
            <button
                className={buttonClasses}
                {...rest}
            >
                {children}
            </button>
    );
}