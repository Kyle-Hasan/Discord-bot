const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("unbans a user")
    .addUserOption((option) => 
        option.setName('target').setDescription('Select a user')
        .setRequired(true),
    ),

    
    async execute(interaction){
        const user = interaction.options.getUser('target')
        //makes sure whoever intiated the interaction has permission to ban/unban
        try{
            if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                await interaction.reply("You don't have permission for that")
                return;
            }
        await interaction.guild.members.unban(user.id)
        await interaction.reply(`<@${user.id}>  has been unbanned`)
        }
        catch{
            await interaction.reply(`you can't unban <@${user.id}>  `)
        }

    }



}