import Image from "next/image";

export default function Adobe(props: { width: number; height: number; }) {
    const { width, height } = props;

    return (
        <Image src="/logos/Adobe.png" width={width} height={height} alt="Adobe" />
    );
}