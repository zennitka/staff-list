const { SlashCommandBuilder, AttachmentBuilder, PermissionsBitField } = require('discord.js');
const path = require('path');

const ALLOWED_USER_ID = '694104863600148534';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('export')
        .setDescription('Экспортирует файл config.json'),
    async execute(interaction) {
        try {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && interaction.user.id !== ALLOWED_USER_ID) {
                await interaction.reply({
                    content: 'У вас нет прав для использования этой команды.',
                    ephemeral: true
                });
                return;
            }

            const filePath = path.resolve(__dirname, '../../config.json');

            const attachment = new AttachmentBuilder(filePath, { name: 'config.json' });

            await interaction.reply({
                content: 'Вот ваш файл config.json:',
                files: [attachment],
                ephemeral: true
            });
        } catch (error) {
            console.error('Ошибка при отправке файла:', error);
            await interaction.reply({
                content: 'Произошла ошибка при попытке отправить файл.',
                ephemeral: true
            });
        }
    },
};
