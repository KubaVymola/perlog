'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

export type FormData = {
    name: string;
};

export default function NewLogForm() {
    const { register, handleSubmit } = useForm<FormData>();

    function onSubmit(data: FormData) {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
            <input
                type="text"
                placeholder="insertData"
                className="rounded-xl p-2 outline-none"
                {...register('name', { required: true })}
            />
            <button type="submit">Submit</button>
        </form>
    );
}
