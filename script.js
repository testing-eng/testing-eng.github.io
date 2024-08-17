// Replace with your own YouTube Data API key
const API_KEY = 'AIzaSyD_Ex4mPlE7X2vDv2wQ4Nvh4lKM2m1QuA8
';
const searchButton = document.getElementById('search-button');
const searchBox = document.getElementById('search-box');
const videoContainer = document.getElementById('video-container');

searchButton.addEventListener('click', () => {
    const query = searchBox.value;
    searchVideos(query);
});

function searchVideos(query) {
    const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(query)}&key=${API_KEY}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            videoContainer.innerHTML = '';
            data.items.forEach(item => {
                const videoElement = createVideoElement(item);
                videoContainer.appendChild(videoElement);
            });
        })
        .catch(error => console.error('Error fetching YouTube videos:', error));
}

function createVideoElement(video) {
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const description = video.snippet.description;

    return `
        <div class="video">
            <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;
}
