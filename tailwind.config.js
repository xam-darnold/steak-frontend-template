const plugin = require("tailwindcss/plugin");

function half(value) {
    return value.replace(/\d+(.\d+)?/, (number) => number / 2);
}

module.exports = {
    purge: [],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                uBlack: "#1d1d1d",
                uGray: {
                    dark: "#777777",
                    default: "#BFBFBF",
                    light: "#e2e2ea",
                    lighter: "#f6f6fa",
                },
                uPrimary: {
                    default: "#940bc5",
                    dark: "#630286",
                    light: "#ebe4ff",
                },
                uSecondary: {
                    default: "#ffc733",
                },
                uRed: "#ff7575",
                uGreen: "#8cca8b",
                uBgBlur: "#dafcfc",
            },
            width: {
                fitContent: 'fit-content',
                attachWidth: '48%',
                14: '3.5rem'
            },
            padding: {
                attachPadding: '48%'
            }
        },
    },
    plugins: [plugin(({ addUtilities, e, theme, variants }) => {
        Object.entries(theme("gap")).forEach(([key, value]) =>
            addUtilities(
                {
                    [`.flex-gap-${e(key)}`]: {
                        margin: `-${half(value)}`,
                        "& > *": {
                            margin: half(value),
                        },
                    },
                    [`.flex-gap-x-${e(key)}`]: {
                        marginRight: `-${half(value)}`,
                        marginLeft: `-${half(value)}`,
                        "& > *": {
                            marginRight: half(value),
                            marginLeft: half(value),
                        },
                    },
                    [`.flex-gap-y-${e(key)}`]: {
                        marginTop: `-${half(value)}`,
                        marginBottom: `-${half(value)}`,
                        "& > *": {
                            marginTop: half(value),
                            marginBottom: half(value),
                        },
                    },
                },
                variants("gap"),
            ),
        );
    }),]
}
