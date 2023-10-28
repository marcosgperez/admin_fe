export const generateColorFromName = (str) => {
    const colors = [
        "#F9D5E5",
        "#F9E2D2",
        "#E2F0CB",
        "#E2F0CB",
        "#E2F0CB",
    ]
    if(!str) return colors[0]
    const letter = str[0].toUpperCase()
    const index = letter.charCodeAt(0) % colors.length
    return colors[index]
}

export const generateLetterByName = (str) => {
    if(!str) return ""
    return str[0].toUpperCase()
}

export const capitalize = (str) => {
    if(!str) return ""
    return str[0].toUpperCase() + str.slice(1)
}
