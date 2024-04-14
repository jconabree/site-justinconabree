"use client";

import React, { MouseEventHandler, useEffect } from "react";
import Portal from "@/components/Portal";
import Button from '@/components/Button';
import XIcon from '@/icons/X';

interface ModalProps extends React.PropsWithChildren {
    isOpen: boolean;
    unmountOnClose?: boolean;
    onClose: MouseEventHandler<HTMLButtonElement>;
    size: 'full'|'2/3'|'1/2'|'1/3'|'screen-2xl'|'screen-xl'|'screen-lg'|'screen-md'
}

export default function Modal(props: ModalProps) {
    const { children, unmountOnClose, isOpen, onClose, size } = props;

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modalOpen');
        } else {
            document.body.classList.remove('modalOpen');
        }
    }, [isOpen]);

    if (unmountOnClose && !isOpen) {
        return null;
    }

    return (
        <Portal>
            <div className={`${isOpen ? 'fixed' : 'hidden'} top-0 left-0 z-max w-full h-full`}>
                <button className="absolute top-0 left-0 h-full w-full bg-gray-600/75" onClick={onClose} />
                <div className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-${size === 'full' ? 'full' : 'auto'} max-h-screen xl_max-w-${size} bg-white`}>
                    <div className="py-3 px-10 flex w-full justify-end">
                        <Button className="p-3" onPress={onClose}>
                            <XIcon width={40} height={40} />
                        </Button>
                    </div>
                    {children}
                </div>
            </div>
        </Portal>
    )
}