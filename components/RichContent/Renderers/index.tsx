interface AvailableTypes {
    [key: string]: React.ElementType;
}

const types: AvailableTypes = {
};

export const getRenderer = (type: string, data: { [key: string]: unknown; }): React.ReactNode|null => {
    if (typeof types[type] !== 'undefined') {
        const Component = types[type];

        return <Component {...data} />
    }

    console.warn('Rich content type not found', type);

    return null;
}
