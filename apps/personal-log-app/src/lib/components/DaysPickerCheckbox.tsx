import { Chip, VisuallyHidden, tv, useCheckbox } from '@nextui-org/react';
import React from 'react';

const checkbox = tv({
    slots: {
        base: 'border-default hover:bg-default-200 py-4 px-2 max-w-none w-full cursor-pointer',
        content: 'text-default-500 text-center max-w-none w-full px-0',
    },
    variants: {
        isSelected: {
            true: {
                base: 'border-primary bg-primary hover:bg-primary-500 hover:border-primary-500',
                content: 'text-primary-foreground',
            },
        },
        isFocusVisible: {
            true: {
                base: 'outline-none ring-2 ring-focus ring-offset-2 ring-offset-background',
            },
        },
    },
});

export default function DaysCheckbox(props: any) {
    const {
        children,
        isSelected,
        isFocusVisible,
        getBaseProps,
        getLabelProps,
        getInputProps,
    } = useCheckbox({ ...props });

    const styles = checkbox({ isSelected, isFocusVisible });

    return (
        <label {...getBaseProps()} className="w-full max-w-none">
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <Chip
                classNames={{
                    base: styles.base(),
                    content: styles.content(),
                }}
                color="primary"
                variant="faded"
                {...getLabelProps()}
            >
                {children}
            </Chip>
        </label>
    );
}
