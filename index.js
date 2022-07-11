const express = require("express")
const app = express()
const Chatbot  =  require("discord-chatbot");
const translate = require('translate-google')

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/api/Chatbot',async (req, res) => {
    var message = req.body.message;

    if (!message) {
        return res.json({ status: 'fail', message: 'Geçerli mesaj göndermelisin. Adın ne?' })
    }

    const chatbot  =  new  Chatbot({name: "Chatbot", gender: "Male"});
    var translateAuthorMessage = await translate(message, {from: 'tr', to: 'en'})

    chatbot.chat(translateAuthorMessage).then(response=> {
        translate(response, {from: 'en', to: 'tr'}).then(translate_response => {
            var newReponse = translate_response.replace('.', '. ').replace("!", "! ")
            return res.json({status: 'OK', message: newReponse})
        }).catch(err => {
            console.error(err)
        })

    });

})

app.listen(3000, () => {
    console.log(`Sunucu başlatıldı.`)
})
