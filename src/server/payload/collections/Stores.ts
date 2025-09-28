import {
    AlignFeature,
    BlockquoteFeature,
    BoldFeature,
    HeadingFeature,
    HorizontalRuleFeature,
    InlineToolbarFeature,
    ItalicFeature,
    lexicalEditor,
    LinkFeature,
    OrderedListFeature,
    ParagraphFeature,
    StrikethroughFeature,
    SubscriptFeature,
    SuperscriptFeature,
    UnderlineFeature,
    UnorderedListFeature
} from '@payloadcms/richtext-lexical';

import {anyone} from 'Payload/access/anyone';
import {authenticated} from 'Payload/access/authenticated';

import type {CollectionConfig} from 'payload';

export const Stores: CollectionConfig = {
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated
    },
    admin: {
        defaultColumns: ['name', 'text', 'createdAt', 'updatedAt'],
        description: 'Eine Liste aller Stores für den Storefinder.',
        group: 'Storefinder Konfiguration',
        pagination: {
            defaultLimit: 100,
            limits: [100, 200, 300, 400, 500]
        },
        useAsTitle: 'name'
    },
    fields: [
        {
            admin: {components: {Cell: 'Payload/components/CellTest#CellTest'}},
            label: 'Name',
            name: 'name',
            type: 'text'
        },
        {
            admin: {components: {Cell: 'Payload/components/CellTest#CellTest'}},
            editor: lexicalEditor({
                /**
                 * Provides the rich text editor features for the 'description' field.
                 * Includes formatting options like bold, italic, headings, and lists.
                 *
                 * @returns An array of rich text editor features.
                 */
                features() {
                    return [
                        AlignFeature(),
                        BlockquoteFeature(),
                        BoldFeature(),
                        HeadingFeature(),
                        HorizontalRuleFeature(),
                        InlineToolbarFeature(),
                        ItalicFeature(),
                        LinkFeature(),
                        OrderedListFeature(),
                        ParagraphFeature(),
                        StrikethroughFeature(),
                        SubscriptFeature(),
                        SuperscriptFeature(),
                        UnderlineFeature(),
                        UnorderedListFeature()
                    ];
                }
            }),
            label: 'Text',
            name: 'text',
            required: true,
            type: 'richText'
        }
    ],
    folders: true,
    slug: 'stores'
};