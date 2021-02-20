const api = 'https://api.opensauce.uk/avatar/upload'
const form = document.querySelector('form');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const files = document.querySelector('[type=file]').files;
    const formData = new FormData();
    // Send
    formData.append("photo", files[0]);
    fetch(api, {method: "POST", body: formData, headers: {'Authorization': localStorage.auth_token}}).then((response) => {
    console.log(response)
    setTimeout(location.reload.bind(location), 5000);

  })
    });
