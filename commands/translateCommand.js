const { SlashCommandBuilder } = require('@discordjs/builders');

const fetch = require('node-fetch');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("translate")
    .setDescription("translate from one language")
    .addStringOption((option) => 
        option.setName('text').setDescription('source text')
        .setRequired(true),
    )
    .addStringOption(option =>
		option.setName('source')
			.setDescription('source language')
			.setRequired(true)
			.addChoice('English', 'en')
			.addChoice('Spanish', 'es')
			.addChoice('Japanese', 'ja')
            .addChoice('Chinese', 'zh')
            .addChoice('Korean','ko')
            .addChoice('Arabic','ar')
            )
        .addStringOption(option =>
            option.setName('target')
                .setDescription('target language')
                .setRequired(true)
                .addChoice('English', 'en')
                .addChoice('Spanish', 'es')
                .addChoice('Japanese', 'ja')
                .addChoice('Chinese', 'zh')
                .addChoice('Korean','ko')
                .addChoice('Arabic','ar')
                ),

    
    async execute(interaction){
        const text = interaction.options.getString('text')
        const source = interaction.options.getString('source')
        const target = interaction.options.getString('target')
        
        try{
            const res = await fetch("https://libretranslate.de/translate", {
	            method: "POST",
	            body: JSON.stringify({
		        q: text,
		        source: source,
		        target: target
	            }),
	            headers: { "Content-Type": "application/json" }
                }).then((response)=> response.json())

            
            const {translatedText} = res;
            interaction.reply(translatedText)


        
        }
        
        
        catch(error){
            console.log(error)
           
        }

    }



}