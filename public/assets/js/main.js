const sendmessage = document.getElementById("sendmessage_author")

const repoBtn =document.getElementById("repo")

repoBtn.addEventListener("click", () => {
    window.location.href = 'https://github.com/theavoid'
})

sendmessage.addEventListener("keypress", function (pressedKey) {
    if (pressedKey.keyCode === 13) {

        if (sendmessage.value.length > 32) {
           return Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Maksimum 32 karakter uzunluğunda mesaj gönderebilirsin!',
            })

        }

        if (sendmessage.value == "") return;
        sendmessage.disabled = true;
        sendmessage.placeholder = "Tekrar mesaj gönderebilmen için botu beklemelisin.";
        let newmessage = document.createElement('div')
        newmessage.className = "message author"
        newmessage.innerHTML = sendmessage.value;
        document.getElementById('messages').appendChild(newmessage)
        document.getElementById("typing").style.display = "block";
        $.post("/api/Chatbot", {message: sendmessage.value}, function(data, status) {
            if (data == "") {

                let newmessage = document.createElement('div')
                newmessage.className = "message bot"
                newmessage.innerHTML = 'Merhaba, bu chat sistemi geliştirilme aşamasındadır. Gönderdiğiniz mesaj hakkında hiçbir içerik bulamadık.';
                document.getElementById('messages').appendChild(newmessage)
            }

                document.getElementById("typing").style.display = "none";
            sendmessage.disabled = false;
            sendmessage.placeholder = "Buradan bana bir şeyler sorabilirsin.";

            let newmessage = document.createElement('div')
            newmessage.className = "message bot"
            newmessage.innerHTML = data.message;
            document.getElementById('messages').appendChild(newmessage)
            Swal.fire({
                icon: 'success',
                title: 'Başarılı!',
                text: 'Mesajın bot tarafından yanıtlandı.',
                confirmButtonText: 'Tamam!',

            })



        })
        sendmessage.value = ""


    }
})
