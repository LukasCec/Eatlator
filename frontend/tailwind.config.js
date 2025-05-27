// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            colors: {
                background: "#17181B",
                card: "#23272d",
                primary: "#4F8CFF",
                secondary: "#7DE2D1",
                border: "#2D2F36",
                text: "#E5E7EB",
                muted: "#A1A1AA",
                error: "#EF4444",
                success: "#22C55E",
            },
            borderRadius: {
                xl: "1.25rem",
                "2xl": "1.5rem",
            }
        },
        fontFamily: {
            sans: ["Inter", "ui-sans-serif", "system-ui"],
        },
    },
    plugins: [],
};
