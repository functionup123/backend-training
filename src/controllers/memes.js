let axios = require("axios")
const memes = async function (req, res) {
    try {
        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=4087833&text0=cooldude&text1=hiithere&username=chewie12345&password=meme@123`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

module.exports.memes = memes