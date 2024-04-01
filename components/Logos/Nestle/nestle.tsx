import Image from "next/image";

export default function Nestle(props: { width: number; height: number; }) {
    const { width, height } = props;

    return (
        <Image src="/logos/nestle.jpg" width={width} height={height} alt="Nestle" />
    );
}