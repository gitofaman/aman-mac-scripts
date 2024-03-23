function getYouTubeThumbnailUrl(videoUrl) {
  // Regular expression to extract the video ID from various YouTube URL formats
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = videoUrl.match(regExp);

  if (match && match[1]) {
    const videoId = match[1];
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    return thumbnailUrl;
  } else {
    console.error('Invalid YouTube URL');
    return null;
  }
}

