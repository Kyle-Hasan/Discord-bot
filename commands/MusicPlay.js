
const { SlashCommandBuilder } = require('@discordjs/builders')





module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("plays a youtube link")
    
    .addStringOption((option)=>
    option.setName('search').setDescription('youtube search')
    .setRequired(true)
    ),
    
    



}