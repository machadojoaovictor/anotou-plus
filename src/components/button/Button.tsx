import Link from "next/link";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    rounded?: 'none' | 'full';
    className?: string;
}

export default function Button(
    {
        children,
        onClick,
        href,
        variant = 'primary',
        size = 'md',
        rounded = 'none',
        className,
    }
        : ButtonProps
) {

    const baseClasses = 'bg-transparent border-2 cursor-pointer transition duration-150';

    const sizeClasses = {
        sm: 'px-4 py-2 text-lg',
        md: 'px-10 py-3.5 text-lg',
        lg: 'px-16 py-4 text-xl',
    };

    const variantClasses = {
        primary: 'bg-primary-background text-on-dark border-on-dark hover:bg-secondary-background hover:text-on-light hover:border-on-light',
        secondary: 'bg-secondary-background text-on-light border-on-light border-on-light hover:bg-primary-background hover:text-on-dark hover:border-on-dark',
    };

    const roundedClasses = {
        none: 'rounded-none',
        full: 'rounded-full',
    }

    const allClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${roundedClasses[rounded]} ${className || ''}`;

    return (
        href ?
            <Link href={href} className={allClasses}>
                {children}
            </Link>
            :
            <button onClick={onClick} className={allClasses}>
                {children}
            </button>
    );
}