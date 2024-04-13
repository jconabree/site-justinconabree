"use client";

import React, { MouseEventHandler } from "react";
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

    if (unmountOnClose && !isOpen) {
        return null;
    }

    return (
        <Portal>
            <div className={`${isOpen ? 'fixed' : 'hidden'} top-0 left-0 z-max w-full h-full`}>
                <button className="absolute top-0 left-0 h-full w-full bg-gray-600/75" onClick={onClose} />
                <div className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full max-h-screen xl_max-w-${size} bg-white`}>
                    <div className="py-8 px-10 flex w-full justify-end">
                        <Button additionalClasses="px-3" onPress={onClose}>
                            <XIcon />
                        </Button>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}