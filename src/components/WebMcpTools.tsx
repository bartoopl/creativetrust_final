"use client";

import { useEffect } from 'react';
import { services, seoLandings, publishedPrices } from '@/lib/site-services';
import { buildTools, type ArticleHit } from '@/lib/webmcp/tools';
import { findModelContext, registerTools } from '@/lib/webmcp/register';

async function searchArticles(query: string, limit: number): Promise<ArticleHit[]> {
    const params = new URLSearchParams({ q: query, limit: String(limit) });
    const response = await fetch(`/api/agent/articles?${params}`);
    if (!response.ok) throw new Error(`Search failed: ${response.status}`);
    return (await response.json()).results;
}

/** Exposes the site's WebMCP tools to in-browser AI agents where supported. Renders nothing. */
export default function WebMcpTools() {
    useEffect(() => {
        const context = findModelContext(document, navigator);
        if (!context) return;
        const controller = new AbortController();
        const tools = buildTools({
            origin: window.location.origin,
            services,
            landings: seoLandings,
            prices: publishedPrices,
            searchArticles,
        });
        registerTools(context, tools, controller.signal);
        return () => controller.abort();
    }, []);

    return null;
}
