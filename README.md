# Discord Bot Setup Guide

Welcome to the Discord bot repository! This guide will walk you through setting up and running the bot.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- A Discord bot token (from the [Discord Developer Portal](https://discord.com/developers/applications))

To set up and run the bot from your repository, follow these instructions:

### 1. Download the Code
To download the full code:
- Click on the "Code" button in the repository on GitHub.
- Choose **Download ZIP** to download all the files as a ZIP.
- Unzip the downloaded file to a location on your computer.

### 2. Install Dependencies
- Open a terminal or command prompt in the folder where you've extracted the bot files.
- Run `npm install` to install all the required dependencies.

### 3. Configure the Bot
- Open the `my_config.json` file and add your **token**, **clientId**, and **guildId** values.
  
### 4. Start the Bot
You have a `start.bat` file for easy startup. To launch the bot:
- Simply double-click the `start.bat` file, which will automatically start the bot. 

This structure should make it easy for others to download, configure, and run your bot. Let me know if you need more details on any step!

Here's a guide on how to set up the `config.json` file in your project. This file is structured to define roles, groups, colors, images, and other configuration details for your Discord bot. Here’s an explanation of each section:

### Explanation of `config.json` Fields

1. **`sub_type`**: 
   - This section defines individual roles and their corresponding Discord role IDs.
   - Each role name (e.g., `"Глава проекта"`, `"Куратор"`) is associated with a unique role ID from your Discord server.
   
2. **`own_type`**:
   - This field groups roles into different categories, like `"Основной персонал проекта"` or `"Администрация Turbo"`.
   - Each group contains an array of role names from `sub_type`, which allows your bot to identify these specific roles under a single category.

3. **`own_color`**:
   - This field assigns a unique color (in HEX format) to each role category defined in `own_type`.
   - For example, `"Основной персонал проекта"` is assigned `"#E1004C"`, and `"Администрация MediumRP"` is assigned `"#FBE156"`.
   - These colors can be used by the bot to stylize messages or embeds based on role categories.

4. **`own_image`**:
   - This field provides a URL link to an image for each category in `own_type`.
   - The images are used to visually represent each category and can be added to embeds or bot messages.
   
5. **`own_sub`**:
   - This field specifies a Discord role ID for certain categories in `own_type` if they require an overarching role.
   - If a category has no overarching role, it’s set to `null`. Otherwise, it links to a Discord role ID (e.g., `"Администрация NoRules": "1093589183483887798"`).
   
6. **`channel_id`**:
   - This field defines the ID of the main channel where the bot will send its messages.
   - Set it to the channel ID you want the bot to use.

### Sample Config Setup

Here’s a sample breakdown of how each section works with your configuration:

```json
{
  "sub_type": {
    "Глава проекта": "973432174445469716",
    "Куратор": "1175147011188723722",
    ...
  },
  "own_type": {
    "Основной персонал проекта": [
      "Глава проекта",
      "Куратор",
      ...
    ],
    "Дискорд персонал": [
      "Менеджер ДС модерации",
      "Старшие модераторы ДC",
      ...
    ]
  },
  "own_color": {
    "Основной персонал проекта": "#E1004C",
    "Дискорд персонал": "#6D48D7",
    ...
  },
  "own_image": {
    "Основной персонал проекта": "https://media.discordapp.net/attachments/816145489803083779/1254841101014269972/discotools-xyz-icon.png...",
    "Дискорд персонал": "https://media.discordapp.net/attachments/816145489803083779/1254841100779257927/discotools-xyz-icon_1.png...",
    ...
  },
  "own_sub": {
    "Основной персонал проекта": null,
    "Дискорд персонал": null,
    "Администрация NoRules": "1093589183483887798",
    ...
  },
  "channel_id": "1244324550515232838"
}
```

### Notes
- Make sure each ID is accurate and corresponds to the actual roles and channels in your Discord server.
- The URLs in `own_image` should be accessible links to the images you want to use.
- The `channel_id` should be the ID of the channel where you want the bot to send notifications or messages.

This setup allows your bot to manage and display information about roles and categories in a structured way. Let me know if you need further assistance with the configuration or the bot code!
