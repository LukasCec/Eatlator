type ResultCardProps = {
    item: {
        original: string;
        lang: string;
        english: string;
        price: string;
        ingredients: string;
    };
};
export default function ResultCard({ item }: ResultCardProps) {
    return (
        <div
            className="
                bg-[#16181C]
                rounded-2xl
                p-4
                shadow-lg

                flex flex-col gap-1 text-sm mb-2
                backdrop-blur-sm
            "
            style={{

                background: "rgba(35,39,45,0.97)"
            }}
        >
            <div className="font-semibold text-text text-base">{item.english}</div>
            <div className="text-xs text-muted mb-1">({item.original})</div>
            <div className="flex flex-row items-center justify-between">
                <span className="font-mono font-semibold text-primary">{item.price}</span>
                <span className="bg-background px-2 py-1 rounded text-xs text-muted ">{item.lang}</span>
            </div>
            {item.ingredients && (
                <div className="mt-2 text-muted text-xs">
                    <strong className="text-secondary">Suroviny:</strong> {item.ingredients}
                </div>
            )}
        </div>
    );
}
