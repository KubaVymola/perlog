import React from 'react';

type ErrorMessageType = {
    hide?: boolean;
    message?: string;
};

export default function ErrorMessage(props: ErrorMessageType) {
    if (props.hide) return null;
    if (!props.message) return null;

    return (
        <div className="text-danger my-1 ms-2 self-start text-sm">
            {props.message}
        </div>
    );
}
