"use client";

import { Document } from '@contentful/rich-text-types';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { useCallback, useState } from 'react';

import RichContent from '@/components/RichContent';

export interface IPortfolioItem {
    id: string;
    urlKey: string;
    title: string;
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
        }[]
    }
}

interface PortfolioListProps {
    items?: IPortfolioItem[],
    navigateOnClick?: boolean;
}

export default function PortfolioList(props: PortfolioListProps) {
    const { items, navigateOnClick } = props;
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
            {items?.map((portfolioItem: IPortfolioItem) => {
                const contentClass = activeItems.includes(portfolioItem.id) ? 'max-h-[9999px]' : 'max-h-0';
                return (
                    <div className="pb-6" key={portfolioItem.id}>
                        <button className="w-full" onClick={getClickHandler(portfolioItem)}>
                            <div className="w-full flex justify-between">
                                <div>{portfolioItem.title}</div>
                                <div className="text-sm">
                                    {portfolioItem.highlightedTech.map((tech) => {
                                        return `(${tech})`
                                    }).join(', ')}
                                </div>
                            </div>
                            <div className="w-full border-t border-black" />
                            <div className="pt-2 min-h-36">
                                <div className="flex gap-4">
                                    {portfolioItem.imagesCollection?.items.map((imageItem, index) => {
                                        return (
                                            <div className="w-36 h-36 bg-gray-100 flex items-center justify-center" key={imageItem.url}>
                                                <Image
                                                    src={imageItem.url}
                                                    width={imageItem.width}
                                                    height={imageItem.height}
                                                    alt={`${portfolioItem.title} image ${index + 1}`}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </button>
                        <div className={`${contentClass} overflow-y-hidden transition-all duration-500`}>
                            <div className="py-10">
                                {portfolioItem.content && <RichContent content={portfolioItem.content} />}
                                <div className="h-screen bg-gray-200 w-full"></div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}