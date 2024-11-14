const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '../../config.json');

let config = require(configPath);

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('Выберите канал для сохранения ID в config.json')
        .addChannelOption(option =>
            option.setName('send')
                .setDescription('Канал для отправки сообщений')
                .setRequired(true)
        ),
    async execute(interaction) {
        const channel = interaction.options.getChannel('send');
        if (channel.type == 'GUILD_TEXT') {
            return interaction.reply({ content: 'Выбранный канал должен быть текстовым каналом.', ephemeral: true });
        }

        config.channel_id = channel.id;

        fs.writeFile(configPath, JSON.stringify(config, null, 2), (err) => {
            if (err) {
                console.error('Ошибка при сохранении config.json:', err);
                return interaction.reply({ content: 'Ошибка при сохранении канала в конфигурации.', ephemeral: true });
            }

            interaction.reply({ content: `Канал ${channel.name} был успешно сохранен в конфигурации.`, ephemeral: true });
        });
    },
};
