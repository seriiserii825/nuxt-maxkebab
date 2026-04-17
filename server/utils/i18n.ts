import { readFileSync } from "fs";
import { resolve } from "path";

type NestedRecord = { [key: string]: string | NestedRecord };

const cache: Record<string, NestedRecord> = {};

function load(locale: string): NestedRecord {
  if (cache[locale]) return cache[locale];
  const file = resolve(process.cwd(), `i18n/locales/${locale}.json`);
  cache[locale] = JSON.parse(readFileSync(file, "utf-8")) as NestedRecord;
  return cache[locale];
}

export function t(locale: string, key: string, params: Record<string, string> = {}): string {
  const messages = load(locale);
  const parts = key.split(".");
  let value: string | NestedRecord = messages;
  for (const part of parts) {
    if (typeof value !== "object" || !(part in value)) return key;
    value = value[part];
  }
  if (typeof value !== "string") return key;
  return value.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? `{${k}}`);
}
