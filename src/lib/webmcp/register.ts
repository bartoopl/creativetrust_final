/**
 * Registers WebMCP tools with the browser when it supports them; a no-op
 * everywhere else. The spec puts the API on `document.modelContext`; early
 * Chrome builds exposed it on `navigator.modelContext`, so both are checked.
 */

export interface ModelContextLike {
    registerTool: (tool: unknown, options?: { signal?: AbortSignal }) => unknown;
}

export function findModelContext(doc: unknown, nav: unknown): ModelContextLike | null {
    for (const host of [doc, nav]) {
        const candidate = (host as { modelContext?: ModelContextLike } | undefined)?.modelContext;
        if (candidate && typeof candidate.registerTool === 'function') return candidate;
    }
    return null;
}

/**
 * Registers each tool; aborting `signal` unregisters them. A tool the browser
 * rejects (permission policy, duplicate name, schema it doesn't accept) is
 * skipped so the others still register. Resolves to the names registered.
 */
export async function registerTools(context: ModelContextLike | null, tools: { name: string }[], signal: AbortSignal): Promise<string[]> {
    if (!context) return [];
    const registered: string[] = [];
    for (const tool of tools) {
        if (signal.aborted) break;
        try {
            const handle = (await context.registerTool(tool, { signal })) as { unregister?: () => void } | undefined;
            // Early implementations returned a handle instead of honouring the signal.
            if (typeof handle?.unregister === 'function') {
                signal.addEventListener('abort', () => handle.unregister?.(), { once: true });
            }
            registered.push(tool.name);
        } catch {
            // Unsupported or not permitted here; the page works the same without it.
        }
    }
    return registered;
}
