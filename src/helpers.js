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


export const parseDescriptionForConversation = (str) => {
    if(!str) return [[],""]
    const separator = "==================\n\n"
    const index = str.indexOf(separator)
    if(index === -1) return [[],str]
    const conversation = str.split(separator)
    return [conversation, ""]
}

export const concatDescriptionForConversation = (conversation, description) => {
    const separator = "==================\n\n"
    return conversation.join(separator) + separator + description
}