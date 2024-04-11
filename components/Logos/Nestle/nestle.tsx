import Image from "next/image";

export default function Nestle(props: { width: number; height: number; [key: string]: unknown; }) {
    const { width, height, ...rest } = props;

    return (
        <Image src="/logos/nestle.jpg" width={width} height={height} alt="Nestle" {...rest} />
    );
}