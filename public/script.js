const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userMessage }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.reply) {
        appendMessage('bot', data.reply);
      } else {
        appendMessage('bot', 'Error: Could not retrieve a response.');
      }
    })
    .catch(error => {
      appendMessage('bot', 'Error: ' + error.message);
    });

  // Simulasi dummy balasan bot (placeholder)
  /* setTimeout(() => {
    appendMessage('bot', 'Gemini is thinking... (this is dummy response)');
  }, 1000); */

  /* fetch('/api/chat', {
       method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ message: userMessage }),
   })
     .then(response => response.json())
     .then(data => {
       if (data.reply) {
         appendMessage('bot', data.reply);
       } else {
         appendMessage('bot', 'Error: Could not retrieve a response.');
       }
     })
     .catch(error => {
       appendMessage('bot', 'Error: ' + error.message);
     });
 }); */

  function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});