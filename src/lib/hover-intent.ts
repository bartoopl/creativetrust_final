/**
 * Open/close intent for a hover-triggered disclosure (the services MegaMenu).
 *
 * - Hover opens after a short delay, so sweeping the pointer across the nav
 *   does not flash the panel.
 * - Leaving the trigger/panel closes after a grace period, so the pointer can
 *   cross the gap between them; re-entering either cancels the close.
 * - A click on a menu the hover already opened keeps it open (and pins it)
 *   instead of toggling it shut under the user's cursor.
 * - A pinned menu (opened or confirmed by click) ignores pointer leave and
 *   closes only on an explicit close or a second click.
 */
export interface HoverIntentOptions {
    openDelay?: number;
    closeDelay?: number;
    onOpenChange: (open: boolean) => void;
}

export interface HoverIntent {
    enter(): void;
    leave(): void;
    click(): void;
    close(): void;
    dispose(): void;
    readonly isOpen: boolean;
}

export function createHoverIntent({ openDelay = 80, closeDelay = 150, onOpenChange }: HoverIntentOptions): HoverIntent {
    let open = false;
    let pinned = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const clear = () => {
        if (timer !== undefined) clearTimeout(timer);
        timer = undefined;
    };
    const set = (next: boolean) => {
        if (!next) pinned = false;
        if (open === next) return;
        open = next;
        onOpenChange(next);
    };

    return {
        enter() {
            clear();
            if (!open) timer = setTimeout(() => set(true), openDelay);
        },
        leave() {
            clear();
            if (open && !pinned) timer = setTimeout(() => set(false), closeDelay);
        },
        click() {
            clear();
            if (open && pinned) {
                set(false);
            } else {
                pinned = true;
                set(true);
            }
        },
        close() {
            clear();
            set(false);
        },
        dispose: clear,
        get isOpen() {
            return open;
        },
    };
}
