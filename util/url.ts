export const getBaseUrl = (): string => {
    return (
        process.env.VERCEL_PROJECT_PRODUCTION_URL ??
        process.env.VERCEL_BRANCH_URL ??
        process.env.VERCEL_URL
    )?.replace(/\/$/, '') ?? '';
};

export const buildUrl = (path: string): string => {
    return `${getBaseUrl()}/${path.replace(/^\//, '')}`;
};