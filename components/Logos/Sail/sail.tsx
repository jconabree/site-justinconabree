export default function Sail(props: { width?: number; height?: number;}) {
    const { width, height } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 216 72"
            width={width}
            height={height}
        >
            <polygon style={{ fill: '#7A9A01' }} points="65.7,70.6 78,70.6 96.9,35.7 114.9,66.5 122.1,53.1 132.3,70.6 144.3,70.6 103.4,0.8 "/>
            <path style={{ fillRule: 'evenodd', clipRule: 'evenodd', fill: '#DC6B2F' }} d="M147,70.6H169V11.7H147V70.6z M195,56.2V11.7h-22v58.9h38.6V56.2H195z"/>
            <path style={{ fillRule: 'evenodd', clipRule: 'evenodd', fill: '#DC6B2F' }} d="M67.1,31.9c0,0,0.1-2.6,0.1-4.6c0-1.9-0.8-16.7-29.4-16.7C9.2,10.6,7,25,7,28.7c0,3.3,0.8,6.9,3.1,9.7  c3,3.7,8.2,6.4,13.1,7.5c9.7,2.1,22.6,3.6,22.6,6.9c0,3.3-5.4,3.8-9.2,3.8c-4.8,0-7.8-2.8-7.8-4.6c0-1.7,0.1-3.1,0.1-3.1H6  c0,12,5.2,22.4,30.6,22.4C62,71.2,69.5,61,69.5,52.7c0-10.3-6.9-15.7-19.6-18.2c-10.3-2.1-19-3.4-19-5.6c0-2.2,2.5-3.5,6.1-3.5  c3.6,0,7.3,0.8,7.3,4.4c0,0.7-0.1,2.2-0.1,2.2H67.1z"/>
        </svg>
    )
}