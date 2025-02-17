import { BLOCKS, Block, Inline, Document, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';

import { getRenderer } from './Renderers';
import classes from './richContent.module.css';
import { getImageSize } from '@/util/images';
import Image from 'next/image';

interface IAssetLink {
    sys: {
        id: string;
    }
    url: string;
    title: string;
    width: number;
    height: number;
    contentType: string;
    __typename: string;
}

export interface IRichContent {
    json: Document
    links: null|{
        assets?: {
            block: (IAssetLink & {
                [key: string]: unknown;
            })[]
        },
        entries?: {
            block: {
                sys: {
                    id: string;
                }
                __typename: string;
                [key: string]: unknown;
            }[]
        }
    }
}

interface RichContentProps {
    content: IRichContent;
    priority?: boolean;
    maxAssetSize?: number;
    [key: string]: unknown
}

export default function RichContent(props: RichContentProps) {
    const { content, priority, maxAssetSize = 800, ...rest } = props;
    const { json: jsonContent, links } = content;

    const options: Options = {
        renderNode: {
            [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
                const linkId = node.data.target.sys.id;

                const link = links?.entries?.block.find((embededLink) => {
                    return embededLink.sys.id === linkId;
                });

                if (link) {
                    return getRenderer(link.__typename, link);
                }
                
                return null;
            },
            [BLOCKS.HEADING_1]: (_, children) => {
                return (
                    <div className="title-h1">{children}</div>
                );
            },
            [BLOCKS.HEADING_2]: (_, children) => {
                return (
                    <div className="title-h2">{children}</div>
                );
            },
            [BLOCKS.HEADING_3]: (_, children) => {
                return (
                    <div className="title-h3">{children}</div>
                );
            },
            [BLOCKS.HEADING_4]: (_, children) => {
                return (
                    <div className="title-h4">{children}</div>
                );
            },
            [BLOCKS.HEADING_5]: (_, children) => {
                return (
                    <div className="title-h5">{children}</div>
                );
            },
            [INLINES.HYPERLINK]: (node, children) => {
                return (
                    <a className="anchor" href={node.data?.uri}>{children}</a>
                );
            },
            [BLOCKS.UL_LIST]: (_, children) => {
                return (
                    <ul className="list">
                        {children}
                    </ul>
                )
            },
            [BLOCKS.OL_LIST]: (_, children) => {
                return (
                    <ul className="list">
                        {children}
                    </ul>
                )
            },
            [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
                const linkId = node.data.target.sys.id;

                const link = links?.assets?.block.find((embededLink) => {
                    return embededLink.sys.id === linkId;
                });

                if (!link) {
                    return null;
                }

                if (link.contentType.includes('video')) {
                    return (
                        <video
                            src={link.url}
                            width={maxAssetSize}
                            height={maxAssetSize}
                            title={link.title}
                            controls
                            muted
                            className={classes.assetVideo}
                        />
                    )
                }

                const { width, height } = getImageSize(link.width, link.height, maxAssetSize);

                return (
                    <Image
                        src={link.url}
                        width={width}
                        height={height}
                        alt={link.title}
                        priority={priority}
                        className={classes.assetImage}
                    />
                );
            }
        }
    }

    return (
        <div className={classes.richContent} {...rest}>
            {documentToReactComponents(jsonContent, options)}
        </div>
    );
}