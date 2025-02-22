const formatResponse = (text) => {
    if (!text) return "";

    let formattedText = text.replace(/\*/g, "");

    formattedText = formattedText.replace(/\b([A-Z\s]{4,})\b/g, (match) => match.charAt(0) + match.slice(1).toLowerCase());

    formattedText = formattedText.replace(/\d+\.\s(.*?)(?=\n|$)/g, "- $1");

    formattedText = formattedText.replace(/\n{2,}/g, "\n\n");

    formattedText = formattedText.replace(/\n/g, " ");

    return formattedText.trim();
};

module.exports = formatResponse;