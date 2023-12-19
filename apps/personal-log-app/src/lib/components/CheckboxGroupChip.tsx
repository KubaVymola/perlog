import {
    CheckboxProps,
    Chip,
    VisuallyHidden,
    tv,
    useCheckbox,
} from '@nextui-org/react';
import React from 'react';

const checkbox = tv({
    slots: {
        base: 'border-default hover:bg-default-200 py-4 px-2 max-w-none w-full cursor-pointer',
        content: 'text-default-500 text-center max-w-none w-full px-0',
    },
    variants: {
        color: {
            default: {
                base: 'border-default bg-default hover:bg-default-600 hover:border-default-600',
            },
            primary: {
                base: 'border-primary bg-primary hover:bg-primary-600 hover:border-primary-600',
            },
            secondary: {
                base: 'border-secondary bg-secondary hover:bg-secondary-600 hover:border-secondary-600',
            },
            success: {
                base: 'border-success bg-success hover:bg-success-600 hover:border-success-600',
            },
            warning: {
                base: 'border-warning bg-warning hover:bg-warning-600 hover:border-warning-600',
            },
            danger: {
                base: 'border-danger bg-danger hover:bg-danger-600 hover:border-danger-600',
            },
        },
        isSelected: {
            false: {
                base: 'border-default bg-white hover:bg-default-200 hover:border-default',
            },
            true: {
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

export default function CheckboxGroupChip(props: CheckboxProps) {
    const {
        children,
        isSelected,
        isFocusVisible,
        getBaseProps,
        getLabelProps,
        getInputProps,
    } = useCheckbox({ ...props });

    const styles = checkbox({
        isSelected,
        isFocusVisible,
        color: props.color ?? 'primary',
    });

    return (
        <label
            {...getBaseProps()}
            className={`w-full max-w-none ${props.className}`}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <Chip
                classNames={{
                    base: styles.base(),
                    content: styles.content(),
                }}
                variant="faded"
                {...getLabelProps()}
            >
                {children}
            </Chip>
        </label>
    );
}
