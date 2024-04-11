import Image from "next/image";

export default function Adobe(props: { width: number; height: number; [key: string]: unknown; }) {
    const { width, height, ...rest } = props;

    return (
        <Image src="/logos/Adobe.png" width={width} height={height} alt="Adobe" {...rest} />
    );
}