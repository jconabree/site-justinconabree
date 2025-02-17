"use client";

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { Document } from '@contentful/rich-text-types';

import { getImageSize } from '@/util/images';


const ProjectDetails = dynamic(() => import('@/components/ProjectDetails'), {
    loading: () => null
});

export interface IPortfolioItem {
    id: string;
    urlKey: string;
    title: string;
    workType: string;
    isFeatured: boolean;
    highlightedTech: string[];
    tech: string[];
    content: {
        json: Document;
    };
    imagesCollection: {
        items: {
            url: string;
            width: number;
            height: number;
            contentType: string;
            title: string;
        }[]
    }
}

interface ProjectListProps {
    items?: IPortfolioItem[],
    navigateOnClick?: boolean;
    priority?: boolean;
}

export default function ProjectList(props: ProjectListProps) {
    const { items, navigateOnClick, priority } = props;
    const router = useRouter()

    const [activeItems, setActiveItems] = useState<string[]>([]);

    const getClickHandler = useCallback((item: IPortfolioItem) => {
        if (navigateOnClick) {
            return () => {
                router.push(`/projects/${item.urlKey}`);
            }
        }

        return () => {
            setActiveItems((currentItems) => {
                if (currentItems.includes(item.id)) {
                    return currentItems.filter((currItem) => currItem !== item.id);
                }

                return [
                    ...currentItems,
                    item.id
                ]
            });
        }
    }, [navigateOnClick, router]);

    return (
        <div>
            <div className="py-8 w-full text-left text-sm">Personal (P) &bull; Work (W)</div>
            {items?.map((portfolioItem: IPortfolioItem, projectIndex) => {
                const contentClass = activeItems.includes(portfolioItem.id) ? 'max-h-[9999px]' : 'max-h-0';
                return (
                    <div className="pb-6" key={portfolioItem.id}>
                        <button className="w-full" onClick={getClickHandler(portfolioItem)}>
                            <div className="w-full flex justify-between">
                                <div>{portfolioItem.title} <span className="text-sm">({portfolioItem.workType[0].toUpperCase()})</span></div>
                                <div className="text-sm">
                                    {portfolioItem.highlightedTech.map((tech) => {
                                        return `(${tech})`
                                    }).join(', ')}
                                </div>
                            </div>
                            <div className="w-full border-t border-black" />
                            <div className="pt-2 min-h-36">
                                <div className="flex gap-4">
                                    {portfolioItem.imagesCollection?.items.map((imageItem) => {
                                        const { width, height } = getImageSize(imageItem.width, imageItem.height, (36 / 4 * 16));

                                        return (
                                            <div className="w-36 h-36 bg-gray-100 flex items-center justify-center" key={imageItem.url}>
                                                {imageItem.contentType.includes('video') ? (
                                                    <video
                                                        src={imageItem.url}
                                                        width={imageItem.width}
                                                        height={imageItem.height}
                                                        title={imageItem.title}
                                                        preload="metadata"
                                                    />
                                                ) : (
                                                    <Image
                                                        src={imageItem.url}
                                                        width={width}
                                                        height={height}
                                                        alt={imageItem.title}
                                                        priority={Boolean(priority) && projectIndex < 5}
                                                    />
                                                )}
                                            
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </button>
                        {!navigateOnClick && (
                            <div className={`${contentClass} overflow-y-hidden transition-all duration-500`}>
                                <div className="py-10">
                                    <ProjectDetails details={portfolioItem} />
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}