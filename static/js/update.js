const formUpdater = document.querySelector('form')
console.log(formUpdater)

 formUpdater?.addEventListener('submit', async event => {
   event.preventDefault()

   const formData = new FormData(formUpdater);
   const userId = formData.get('_id');

   const response = await fetch('/api/usuarios/${userId}', {
     method: 'Put',
     headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
     },
     body: new URLSearchParams(new FormData(formRegister))
   },
   console.log('form enviado')
   )

   if (response.status === 200) {
console.log("ok")
   } else {
     const error = await response.json()
     alert(error.message)
   }
 })