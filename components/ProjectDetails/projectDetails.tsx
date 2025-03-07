import RichContent from '@/components/RichContent';
import { IPortfolioItem } from '@/components/ProjectList/projectList';
import Images from './images';
import Link from 'next/link';

interface ProjectDetailsProps {
    details: IPortfolioItem;
    page?: boolean;
}

export default function ProjectDetails(props: ProjectDetailsProps) {
    const { details, page } = props;

    return (
        <>
            {details.richMediaCollection?.items?.length > 0 && (
                <Images assets={details.richMediaCollection.items} title={details.title} isPage={page} />
            )}
            <div className="grid grid-cols-3 gap-12">
                <div className="col-span-3 md_col-span-2 order-2 md_order-1">
                    {!page && (
                        <div className="w-full h-10 text-sm text-left" />
                    )}
                    {details.content && <RichContent content={details.content} priority={page} maxAssetSize={page ? 800 : 400} />}
                </div>
                <div className="col-span-3 md_col-span-1 pr-3 order-1 md_order-2">
                    {!page && (
                        <div className="w-full py-2.5 text-sm text-left">
                            <Link href={`/projects/${details.urlKey}`} className="anchor">Go to Project Page</Link>
                        </div>
                    )}
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