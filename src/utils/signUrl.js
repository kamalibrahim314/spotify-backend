const crypto = require('crypto');

function generateSignedUrl(videoId, user) {
    const expires = Date.now() + 1000 * 60 * 10; // 10 minutes
    const token = crypto.createHmac('sha256', 'your-secret-key')
        .update(videoId + user + expires)
        .digest('hex');
    return `/videos/${videoId}/index.m3u8?token=${token}&expires=${expires}&user=${user}`;
}

module.exports = { generateSignedUrl };