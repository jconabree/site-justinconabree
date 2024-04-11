import Image from "next/image";

export default function Stokes(props: { width?: number; height?: number; [key: string]: unknown; }) {
    const { width, height, ...rest } = props;

    return (
        <Image src="/logos/stokes.png" width={width} height={height} alt="Stokes" {...rest} />
    )
}