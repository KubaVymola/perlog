import { join } from 'path';
import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(__dirname, 'src/**/*.{js,ts,jsx,tsx,mdx}'),
        join(__dirname, 'public/**/*.html'),
        join(
            __dirname,
            '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
        ),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [nextui()],
};
