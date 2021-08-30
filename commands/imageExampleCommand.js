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
    //gets background image   
    let welcome = await jimp.read('./12.jpg')
        
        
    console.log(user.displayAvatarURL({format: 'png'}))
   
    
    const avatarImage = await jimp.read(user.displayAvatarURL({format: 'png'})) //gets avatar image of selected user
    try{
        avatarImage.resize(256, 256) //resizes avatar image

        welcome.composite(avatarImage, 700, 80) //places avatar image on background image
        
        welcome.write('Welcome.png', async() =>{  //saves edited image and sends it to discord as a reply
            await interaction.reply( { files: ["Welcome.png"] }) 
        })
   
   

    }
    catch(error){
        interaction.reply("could not create image")
        console.log(error)
    }
    
  
    
        

    }


