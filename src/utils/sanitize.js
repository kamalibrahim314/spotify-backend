import sanitize from 'sanitize-filename';
import path from 'path';
import validator from 'validator';

const sanitizeImagePath = (imagePath, baseFolder = "mcqs") => {
    if (!imagePath) return null;
    const safeName = sanitize(path.basename(imagePath));
    return `/uploads/${baseFolder}/${safeName}`;
};

const sanitizeTextInput = (input) => {
    if (typeof input !== 'string') return input;
    const trimmed = input.trim();
    const escaped = validator.escape(trimmed);
    return escaped;
};

export { sanitizeImagePath, sanitizeTextInput };