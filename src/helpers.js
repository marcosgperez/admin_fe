export const generateColorFromName = (str) => {
    const colors = [
        "#F9D5E5",
        "#F9E2D2",
        "#E2F0CB",
        "#E2F0CB",
        "#E2F0CB",
    ]
    const letter = str[0].toUpperCase()
    const index = letter.charCodeAt(0) % colors.length
    return colors[index]
}

export const generateLetterByName = (str) => {
    return str[0].toUpperCase()
}
