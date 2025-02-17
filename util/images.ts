export const getImageSize = (width: number, height: number, maxSize: number) => {
    const scale = Math.min(maxSize / width, maxSize / height);

    return {
        width: Math.round(width * scale),
        height: Math.round(height * scale),
    };
}