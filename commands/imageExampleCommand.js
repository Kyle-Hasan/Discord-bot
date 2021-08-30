const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const jimp = require('jimp');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("image")
    .setDescription("example image command")
    .addUserOption((option) => 
        option.setName('target').setDescription('Select a user')
        .setRequired(true),
    ),

    
    async execute(interaction){
    const user = interaction.options.getUser('target')
        
    let welcome = await jimp.read('./12.jpg')
        
        
    console.log(user.displayAvatarURL({format: 'png'}))
    const URL = user.displayAvatarURL({format: 'png'})
    
    const avatarImage = await jimp.read(URL)
    try{
   await avatarImage.resize(256, 256) 
   await welcome.composite(avatarImage, 700, 80) 
   await welcome.write('Welcome2.png')
   
   await interaction.reply( { files: ["Welcome2.png"] }) 

    }
    catch(error){
        interaction.reply("could not create image")
        console.log(error)
    }
    
  
    
        

    }



}