import { Chip, Input } from '@nextui-org/react';
import React, { forwardRef, useEffect } from 'react';

type ChipInputProps = {
    onChange: (...event: any[]) => void;
    value: string[] | undefined;
};

export default forwardRef(({ value: chips, onChange }: ChipInputProps, ref) => {
    // const [chips, setChips] = React.useState<string[]>(value ?? []);
    const [inputText, setInputText] = React.useState('');

    useEffect(() => {
        if (!inputText.includes(' ')) return;

        handleCreateChip(true);
    }, [inputText]);

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        e.preventDefault();
        handleCreateChip(false);
    };

    const handleCreateChip = (trimLastCharacter: boolean) => {
        const toSetValue = inputText.split(' ')[0];

        if (chips?.find((chip) => chip === toSetValue)) {
            if (trimLastCharacter) {
                setInputText((inputText) => inputText.slice(0, -1));
            }

            return;
        }

        if (inputText.trim() === '') {
            setInputText(() => '');
            return;
        }

        onChange({ target: { value: [...(chips ?? []), toSetValue] } });
        setInputText(() => '');
    };

    const handleClose = (chipToRemove: string) => {
        onChange({
            target: { value: chips?.filter((chip) => chip !== chipToRemove) },
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
});
