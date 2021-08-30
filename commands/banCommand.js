const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("bans a user")
    .addUserOption((option) => 
        option.setName('target').setDescription('Select a user')
        .setRequired(true),
    )
    .addStringOption((option)=>
    option.setName('reason').setDescription('Reason for ban')),

    
    async execute(interaction){
        const user = interaction.options.getUser('target')
        let reason = interaction.options.getString('reason')
        if(reason == null ){
            reason = "no reason"
        }
        try{
        console.log(interaction.member)
        if(!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)){
            await interaction.reply("You don't have permission for that")
            return;
        }
        await interaction.guild.members.ban( user,{ days: 7, reason: reason })
        await interaction.reply(`<@${user.id}>  has been banned`)
        }
        catch(error){
            console.log(error)
            await interaction.reply(`you can't ban <@${user.id}>  `)
        }

    }



}