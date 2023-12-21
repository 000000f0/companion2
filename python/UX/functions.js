
function loadImage(imageUrl) {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = `<img src="${imageUrl}" alt="Loaded Image" style="width:100%; height:auto;">`;
}


function floatMessage(messageText) {
    const cloudMessagesContainer = document.getElementById('cloudMessages');
  
    // Create a new div element for the message
    const cloudMessage = document.createElement('div');
    const maxLength = 100; // maximum number of characters
    cloudMessage.textContent = messageText.length > maxLength ? messageText.substring(0, maxLength) + '...' : messageText;

    cloudMessage.className = 'cloud-message';

    // Append the new message to the container, instead of replacing its content
    cloudMessagesContainer.appendChild(cloudMessage);
}

function createMessage(messageText) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
  
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = messageText;
  
    const cloudButton = document.createElement('button');
    cloudButton.className = 'cloud-button';
    cloudButton.textContent = 'Cloud';

    // Attach the event listener directly here
    cloudButton.addEventListener('click', () => {
        const message = cloudButton.parentElement;
        const cloudMessage = message.cloneNode(true);
        cloudMessage.classList.add('cloud-message');
        const cloudButtonInCloud = cloudMessage.querySelector('.cloud-button');
        cloudButtonInCloud.remove();

        const cloudMessagesContainer = document.getElementById('cloudMessages');
        //cloudMessagesContainer.innerHTML = ''; // If you want to keep multiple messages, remove this line.
        cloudMessagesContainer.appendChild(cloudMessage);
    });
  
    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(cloudButton);
  
    return messageDiv;
}


 // Function to add a message to the chat history
 function addToChatHistory(messageText, isUserMessage = false) {
    const chatHistory = document.getElementById('chatHistory');
    const message = createMessage(messageText);
    chatHistory.appendChild(message);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  
    if (isUserMessage) {
        message.classList.add('user-message');
    } else {
        message.classList.add('eva-message');
    }
}
// Function to copy a message to the cloud
function copyMessageToCloud(messageText) {
    const cloudMessagesContainer = document.getElementById('cloudMessages');
  
    const cloudMessage = document.createElement('div');
    cloudMessage.textContent = messageText;
    cloudMessage.className = 'cloud-message';
  
    cloudMessagesContainer.innerHTML = '';
    cloudMessagesContainer.appendChild(cloudMessage);
  }

  
    

 function loadVideo(url) {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = `<iframe width="100%" height="100%" src="${url}" allow="autoplay; encrypted-media" frameborder="0" allowfullscreen></iframe>`;
    
    const chatHistory = document.getElementById('chatHistory');
    chatHistory.innerHTML = '';
    }
    
    function loadDefaultVideo() {
    const defaultVideoUrl = "https://www.youtube-nocookie.com/embed/-u2TR4I0q7M"; 
    const defaultImgUrl = "https://uploads-ssl.webflow.com/638dd1e89ba7270b5aecceaf/657039a9751d3318c7fd40a5_Menu3.jpg"
    //loadImage(defaultImgUrl);
   }