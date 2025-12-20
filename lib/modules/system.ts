import { formatRuntime, type CommandProperty } from "../";

export default [
  {
    pattern: "runtime",
    alias: ["uptime"],
    category: "system",
    desc: "Check process uptime",
    async exec(msg) {
      const time = formatRuntime(process.uptime());
      return await msg.reply("```" + time + "```");
    },
  },
] satisfies Array<CommandProperty>;
