function determineContentType(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    if (extension === 'mp4') {
        return 'video/mp4';
    } else if (extension === 'gif') {
        return 'image/gif';
    }
    // You can handle other file types here if needed
    return 'application/octet-stream'; // Default to binary data if not recognized
}

module.exports = { determineContentType };
