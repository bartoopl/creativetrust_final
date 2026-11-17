import {
    BlockquoteFeature,
    BoldFeature,
    EXPERIMENTAL_TableFeature,
    FixedToolbarFeature,
    HeadingFeature,
    InlineCodeFeature,
    InlineToolbarFeature,
    ItalicFeature,
    LinkFeature,
    OrderedListFeature,
    ParagraphFeature,
    UnderlineFeature,
    UnorderedListFeature,
    UploadFeature,
} from '@payloadcms/richtext-lexical';

/**
 * Only what the site renders (src/components/RichTextContent.tsx and the
 * Markdown twins); anything else would be saved but silently not shown.
 * Shared by the admin editor and the MCP Markdown → Lexical conversion.
 */
export const editorFeatures = () => [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    InlineCodeFeature(),
    LinkFeature({ enabledCollections: ['posts', 'knowledge-base', 'portfolio-projects'] }),
    UnorderedListFeature(),
    OrderedListFeature(),
    BlockquoteFeature(),
    // GFM tables: the converter parses `| a | b |` into Lexical table nodes
    // (the feature ships its own markdown transformer).
    EXPERIMENTAL_TableFeature(),
    UploadFeature({ collections: { media: { fields: [] } } }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
];
