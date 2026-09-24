interface PlaceholderProps {
    label: string;
    height?: number | string;
    className?: string;
    rounded?: boolean;
}

/** Striped image placeholder with a monospace caption describing what belongs there. */
export default function Placeholder({ label, height = 180, className = '', rounded = false }: PlaceholderProps) {
    return (
        <div
            className={`ct-placeholder ${className}`}
            style={{ minHeight: height, borderRadius: rounded ? 'var(--radius-md)' : undefined, border: rounded ? '1px solid var(--line-strong)' : undefined }}
            role="img"
            aria-label={label}
        >
            <span className="ct-placeholder-label">{label}</span>
        </div>
    );
}
