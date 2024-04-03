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
            {details.content && <RichContent content={details.content} />}
            <div className="h-screen bg-gray-200 w-full"></div>
        </>
    )
}