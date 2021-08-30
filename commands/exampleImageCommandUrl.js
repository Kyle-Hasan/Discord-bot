const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const jimp = require('jimp');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("image2")
    .setDescription("url image command")
    .addStringOption((option) => 
        option.setName('url').setDescription('Put in image url')
        .setRequired(true),
    ),

    
    async execute(interaction){
       
        
    let backgroundImage = await jimp.read('./12.jpg')
        
        
    
    const URL =  interaction.options.getString('url')
    
    
    const targetImage = await jimp.read(URL) //gets image from url
   try{
    console.log("resizing image")
     targetImage.resize(256, 256) // resizes the target image
    console.log("editing image")
     backgroundImage.composite(targetImage, 1040, 630) //put target image on top of background image at specified coordinates
    console.log("writing image")
    
    backgroundImage.write('Welcome.png', async () =>{
        //saves edited image and sends to discord channel as reply when done.
        console.log(`last image `)
        await interaction.reply( { files: ['Welcome.png'] }) 
        
    })
    
    


   }
   catch(error){
       interaction.reply("Could not create image")
       console.log(error)
   }

    
        

    }



}