import {nextui} from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [nextui({
        prefix: "nextui", // prefix for themes variables
        addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
        defaultTheme: "dark", // default theme from the themes object
        defaultExtendTheme: "dark", // default theme to extend on custom themes
        layout: {
            radius: {
                medium: '16px',
                small: '16px',
            },
        }, // common layout tokens (applied to all themes)
        themes: {
            dark: {
                layout: {}, // dark theme layout tokens
                colors: {
                    content1: {
                        DEFAULT: "#2C2C2B",
                    },
                    primary: {
                        DEFAULT: "#006FEE",
                    },
                    secondary: {
                        DEFAULT: "rgba(256, 256, 256, .07)",
                    },
                    default: {
                        100: "#19232D",
                        200: "#172029",
                    }
                }
            },
        },
    })],
}

