import RichContent from '@/components/RichContent';
import { IPortfolioItem } from '@/components/ProjectList/projectList';
import Images from './images';

interface ProjectDetailsProps {
    details: IPortfolioItem
}

export default function ProjectDetails(props: ProjectDetailsProps) {
    const { details } = props;

    return (
        <>
            {details.imagesCollection?.items?.length > 0 && (
                <Images images={details.imagesCollection.items} title={details.title} />
            )}
            <div className="grid grid-cols-3 gap-3 lg_gap-12">
                <div className="col-span-3 md_col-span-2 order-2 md_order-1">
                    {details.content && <RichContent content={details.content} />}
                </div>
                <div className="col-span-3 md_col-span-1 pr-3 order-1 md_order-2">
                    <div className="font-header text-2xl font-bold mb-6">Technology / Skills</div>
                    <div className="flex flex-wrap gap-x-5 gap-y-3">
                        {details.tech.map((tech) => {
                            return <span key={tech} className="pill">{tech}</span>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}