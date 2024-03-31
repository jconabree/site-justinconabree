export const getStateProperties = (stateProperty) => {
    console.log('stateProperty', stateProperty);
    return Object.fromEntries(
        stateProperty.map(({ key, value }) => {
            return [key, value]
        })
    );
}