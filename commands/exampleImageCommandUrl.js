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
       
        
    let Image = await jimp.read('./12.jpg')
        
        
    
    const URL =  interaction.options.getString('url')
    
    
    const targetImage = await jimp.read(URL)
   try{
    console.log("resizing image")
     targetImage.resize(256, 256) //We resize the avatar 
    console.log("editing image")
     Image.composite(targetImage, 1040, 630) //We put the avatar on the image on the position 20, 20
    console.log("writing image")
    
    fongImage.write('Welcome.png', async () =>{
        
        console.log(`last image `)
        await interaction.reply( { files: ['Welcome.png'] }) 
        
    })
    
    //We sent the file to the channel


   }
   catch(error){
       interaction.reply("Could not create image")
       console.log(error)
   }

    
        

    }



}