/**
 * @desc Formats AI response into structured HTML with bullet points
 * @param {String} text - AI-generated first aid response
 * @returns {String} - Formatted HTML for frontend
 */
const formatResponse = (text) => {
    if (!text) return "";

    // Convert **bold** text into <strong>
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert numbered points into list items
    formattedText = formattedText.replace(/\d+\.\s(.*?)(?=\n|$)/g, "<li>$1</li>");

    // Wrap the content in an unordered list for better readability
    formattedText = `<ul>${formattedText}</ul>`;

    // Convert additional newlines into paragraph breaks
    formattedText = formattedText.replace(/\n/g, "<br>");

    return formattedText;
};

module.exports = formatResponse;