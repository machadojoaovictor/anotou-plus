import clsx from "clsx";
import { HTMLProps } from "react";

export default function Textarea({ className, ...rest }: HTMLProps<HTMLTextAreaElement>) {
    const baseStyle = 'w-full resize-none h-40 rounded-lg outline-none py-4 px-4 text-lg';

    return (
        <textarea
            className={clsx(baseStyle, className)}
            {...rest}
        />
    );
}