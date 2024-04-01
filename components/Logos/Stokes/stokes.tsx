import Image from "next/image";

export default function Stokes(props: { width?: number; height?: number;}) {
    const { width, height } = props;

    return (
        <Image src="/logos/stokes.png" width={width} height={height} alt="Stokes" />
    )
}