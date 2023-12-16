import { Chip, Input } from '@nextui-org/react';
import React, { forwardRef, useCallback, useEffect } from 'react';

type ChipInputProps = {
    addOnSpace?: boolean;
    onChange: (value: string[]) => void;
    value: string[] | undefined;
    orientation?: 'horizontal' | 'vertical';
};

const ChipInput = forwardRef(
    (
        { value: chips, onChange, addOnSpace, orientation }: ChipInputProps,
        ref,
    ) => {
        const [inputText, setInputText] = React.useState('');

        const handleCreateChip = useCallback(() => {
            const toSetValue = addOnSpace
                ? inputText.trim().split(' ')[0]
                : inputText.trim();

            if (toSetValue === '') {
                setInputText(() => '');
                return;
            }

            if (chips?.find((chip) => chip === toSetValue)) {
                setInputText(() => toSetValue);
                return;
            }

            onChange([...(chips ?? []), toSetValue]);
            setInputText(() => '');
        }, [addOnSpace, chips, inputText, onChange]);

        useEffect(() => {
            if (!addOnSpace) return;
            if (!inputText.includes(' ')) return;

            handleCreateChip();
        }, [inputText, addOnSpace, handleCreateChip]);

        const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key !== 'Enter') return;

            e.preventDefault();
            handleCreateChip();
        };

        const handleClose = (chipToRemove: string) => {
            onChange(chips?.filter((chip) => chip !== chipToRemove) ?? []);
        };

        const getOrientationClasses = () => {
            if (orientation === 'vertical') {
                return 'flex flex-col items-start w-full';
            } else {
                return 'grid grid-cols-2 items-center';
            }
        };

        return (
            <div className={`${getOrientationClasses()} gap-2`}>
                <Input
                    className="flex-1"
                    placeholder="Enter chips"
                    label="Select values"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleEnterKey}
                />
                <div className="flex-1">
                    {chips?.map((chip) => (
                        <Chip
                            className="m-1"
                            key={chip}
                            onClose={() => handleClose(chip)}
                            variant="solid"
                            color="primary"
                        >
                            {chip}
                        </Chip>
                    ))}
                </div>
            </div>
        );
    },
);

ChipInput.displayName = 'ChipInput';

export default ChipInput;
