"use client";

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';
import Image from 'next/image';

import XIcon from '@/icons/X';
import { getImageSize } from '@/util/images';
import { IRichContent } from '@/components/RichContent';

import classes from './projectList.module.css';


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
    content: IRichContent;
    richMediaCollection: {
        items: {
            asset: {
                url: string;
                width: number;
                height: number;
                contentType: string;
                title: string;
            };
            poster: {
                url: string;
                width: number;
                height: number;
                contentType: string;
                title: string;
            }
        }[]
    };
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
            <div className="py-4 lg_pb-8 w-full text-left text-sm">Personal (P) &bull; Work (W)</div>
            {items?.map((portfolioItem: IPortfolioItem, projectIndex) => {
                const isActive = activeItems.includes(portfolioItem.id);
                const contentClass = isActive ? 'max-h-[9999px]' : 'max-h-0';

                const mainImages = portfolioItem.richMediaCollection?.items
                    ?.map(({ asset, poster }) => asset.contentType?.includes('video') ? poster : asset)
                    ?.slice(0, 7);

                return (
                    <div className="pb-6" key={portfolioItem.id}>
                        <button className="w-full" onClick={getClickHandler(portfolioItem)}>
                            <div className="w-full flex justify-between flex-wrap">
                                <div className="-sm_grow -sm_shrink-0 -sm_w-full text-left">{portfolioItem.title} <span className="text-sm">({portfolioItem.workType[0].toUpperCase()})</span></div>
                                <div className="text-sm -sm_grow -sm_shrink-0 -sm_w-full -sm_text-xs -sm_pt-1 -sm_pb-0.5 text-left">
                                    {portfolioItem.highlightedTech.map((tech) => {
                                        return `(${tech})`
                                    }).join(', ')}
                                </div>
                            </div>
                            <div className="w-full border-t border-black" />
                            <div className="pt-2 min-h-36">
                                {mainImages?.length > 0 && (
                                    <div className="flex gap-4 relative">
                                        {mainImages.map((imageItem) => {
                                            const { width, height } = getImageSize(imageItem.width, imageItem.height, (36 / 4 * 16));

                                            return (
                                                <div className={classes.thumbnail} key={imageItem.url}>
                                                    <Image
                                                        src={imageItem.url}
                                                        width={width}
                                                        height={height}
                                                        alt={imageItem.title}
                                                        priority={Boolean(priority) && projectIndex < 5}
                                                    />
                                                </div>
                                            );
                                        })}
                                        <div className={classes.moreIndicator}>
                                            <XIcon role="presentation" className="rotate-45" width={16} height={16} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </button>
                        {!navigateOnClick && isActive && (
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