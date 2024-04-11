import Image from 'next/image';
import RichContent from '@/components/RichContent';
import { IPortfolioItem } from '@/components/ProjectList/projectList';
import ImageSlider from './slider';

interface ProjectDetailsProps {
    details: IPortfolioItem
}

export default function ProjectDetails(props: ProjectDetailsProps) {
    const { details } = props;

    return (
        <>
            {details.imagesCollection && (
                <div className="py-10">
                    <ImageSlider>
                        {details.imagesCollection.items.map((image, index) => {
                            const alt = `${details.title} image ${index + 1}`;

                            return (
                                <Image
                                    key={image.url}
                                    src={image.url}
                                    width={image.width}
                                    height={image.height}
                                    alt={alt}
                                    // className="absolute top-1/2 -translate-y-1/2"
                                />
                            );
                        })}
                    </ImageSlider>
                </div>
            )}
            <div className="grid grid-cols-3 gap-3 lg_gap-12">
                <div className="col-span-3 md_col-span-2 order-2 md_order-1">
                    {details.content && <RichContent content={details.content} />}
                    <div className="h-screen bg-gray-200 w-full"></div>
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