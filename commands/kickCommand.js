const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kicks a user")
    .addUserOption((option) => 
        option.setName('target').setDescription('Select a user')
        .setRequired(true),
    ),

    
    async execute(interaction){
        try{
        if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            await interaction.reply("You don't have permission for that")
            return;
        }
            
        const member = interaction.options.getMember('target');
        const user = interaction.options.getUser('target')
        member.kick()
       await interaction.reply(`<@${user.id}>  has been has been kicked`)
        }
        catch{
            await interaction.reply(`you can't kick <@${user.id}>  `)
        }

        
    }



}