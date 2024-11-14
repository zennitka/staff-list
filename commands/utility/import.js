const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Ваш ID, который будет проверяться
const ALLOWED_USER_ID = '694104863600148534';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('import')
        .setDescription('Импортирует новый файл config.json')
        .addAttachmentOption(option =>
            option.setName('file')
                .setDescription('Загрузите файл config.json')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && interaction.user.id !== ALLOWED_USER_ID) {
                await interaction.reply({
                    content: 'У вас нет прав для использования этой команды.',
                    ephemeral: true
                });
                return;
            }

            const attachment = interaction.options.getAttachment('file');

            if (!attachment || path.extname(attachment.name) !== '.json') {
                await interaction.reply({
                    content: 'Пожалуйста, загрузите файл формата JSON.',
                    ephemeral: true
                });
                return;
            }

            const newFilePath = path.resolve(__dirname, '../../config.json');

            const response = await fetch(attachment.url);
            if (!response.ok) {
                await interaction.reply({
                    content: 'Произошла ошибка при загрузке файла.',
                    ephemeral: true
                });
                return;
            }

            const fileContent = await response.text();

            fs.writeFileSync(newFilePath, fileContent, 'utf8');

            await interaction.reply({
                content: 'Файл config.json успешно обновлен.',
                ephemeral: true
            });
        } catch (error) {
            console.error('Ошибка при импорте файла:', error);
            await interaction.reply({
                content: 'Произошла ошибка при попытке импортировать файл.',
                ephemeral: true
            });
        }
    },
};
