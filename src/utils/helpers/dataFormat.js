export const YYYYmmddhhmmss = () => {
    const now = new Date();
    return (+now
        .toISOString()
        .split('')
        .filter((i) => !isNaN(+i))
        .join('')
        .slice(0, 14)
    )
}