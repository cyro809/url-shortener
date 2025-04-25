async function sendUrl(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),

  });
  return response.json();
}

function showShortUrl(shortUrl) {
  const shortUrlText = document.querySelector('.short-url-text');
  shortUrlText.innerText = `${window.location.href}url/${shortUrl}`;
  shortUrlText.href = `/url/${shortUrl}`;
}

function bindSendButton() {
  const sendButton = document.querySelector('button#send-button');
  sendButton.addEventListener('click', async (event) => {
    const urlField = document.querySelector('input.url-input-field');
    const response = await sendUrl('/url', { originalUrl: urlField.value });
    showShortUrl(response.urlHash);
    event.preventDefault();
  });
}

bindSendButton();
