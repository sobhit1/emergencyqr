const formatResponse = (text) => {
    if (!text) return "";

    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    formattedText = formattedText.replace(/\d+\.\s(.*?)(?=\n|$)/g, "<li>$1</li>");

    formattedText = `<ul>${formattedText}</ul>`;

    formattedText = formattedText.replace(/\n/g, "<br>");

    return formattedText;
};

module.exports = formatResponse;