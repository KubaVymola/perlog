import React from 'react';

type PropsType = {
    props: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function Input({ ...props }) {
    return (
        <input
            {...props}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
    );
}
