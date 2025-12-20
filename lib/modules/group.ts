import { Group, type CommandProperty } from "../.";

export default [
  {
    pattern: "gname",
    category: "groups",
    isGroup: true,
    isAdmin: true,
    async exec(msg, sock, args) {
      if (!args) return await msg.reply("ᴘʀᴏᴠɪᴅᴇ ɴᴇᴡ ɴᴀᴍᴇ");
      new Group(msg.chat, sock).Name(args);
      await msg.reply("ᴅᴏɴᴇ");
    },
  },
] satisfies Array<CommandProperty>;
