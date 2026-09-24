interface EyebrowProps {
    children: React.ReactNode;
    className?: string;
    muted?: boolean;
}

/** Uppercase monospace section label in the accent color. */
export default function Eyebrow({ children, className = '', muted = false }: EyebrowProps) {
    return (
        <span className={`ct-eyebrow ${className}`} style={muted ? { color: 'var(--muted)' } : undefined}>
            {children}
        </span>
    );
}
