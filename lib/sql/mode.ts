import { log } from "../util";
import { bunql } from "./_sql";

const BotMode = bunql.define("mode", {
  mode: { primary: true, type: "TEXT" },
});

type Mode = "private" | "public";

export const setMode = (type: Mode): boolean | null => {
  const row = BotMode.select().get()?.[0];

  log.debug(row);

  if (row?.mode === type) return null;

  if (row) {
    BotMode.update({ mode: type }).where("mode", "=", row.mode).run();
  } else {
    BotMode.insert({ mode: type });
  }

  return true;
};

export const getMode = (): Mode => {
  const row = BotMode.select().get()?.[0];
  return (row?.mode as Mode) ?? "private";
};
