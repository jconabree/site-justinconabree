export const getBaseUrl = (): string => {
    const base = (
        process.env.VERCEL_PROJECT_PRODUCTION_URL ??
        process.env.VERCEL_BRANCH_URL ??
        process.env.VERCEL_URL
    )?.replace(/\/$/, '') ?? null;

    if (!base) {
        return '';
    }

    return base.includes('http') ? base : `https://${base}`;
};

export const buildUrl = (path: string): string => {
    return `${getBaseUrl()}/${path.replace(/^\//, '')}`;
};