import { Chip, Input } from '@nextui-org/react';
import React, { forwardRef, useEffect } from 'react';

type ChipInputProps = {
    addOnSpace?: boolean;
    onChange: (...event: any[]) => void;
    value: string[] | undefined;
};

const ChipInput = forwardRef(
    ({ value: chips, onChange, addOnSpace }: ChipInputProps, ref) => {
        const [inputText, setInputText] = React.useState('');

        useEffect(() => {
            if (!addOnSpace) return;
            if (!inputText.includes(' ')) return;

            handleCreateChip();
        }, [inputText, addOnSpace]);

        const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key !== 'Enter') return;

            e.preventDefault();
            handleCreateChip();
        };

        const handleCreateChip = () => {
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

            onChange({ target: { value: [...(chips ?? []), toSetValue] } });
            setInputText(() => '');
        };

        const handleClose = (chipToRemove: string) => {
            onChange({
                target: {
                    value: chips?.filter((chip) => chip !== chipToRemove),
                },
            });
        };

        return (
            <div className="grid grid-cols-2 items-center gap-2">
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
