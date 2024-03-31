import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { getRenderer } from './Renderers';

export default function RichContent(props) {
    const { content } = props;
    const { json: jsonContent, links } = content;

    const options = {
        renderNode: {
            [BLOCKS.EMBEDDED_ENTRY]: (node) => {
                const linkId = node.data.target.sys.id;

                const link = links?.entries.block.find((embededLink) => {
                    return embededLink.sys.id === linkId;
                });

                if (link) {
                    return getRenderer(link.__typename, link);
                }
                
                return null;
            }
        }
    }

    return documentToReactComponents(jsonContent, options);
}