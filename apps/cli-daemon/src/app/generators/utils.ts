import { readFileSync } from 'fs';

import { GeneratorDefinition, SchemaCollection } from './generators.interface';

const capitalize = (s: string): string => s[0].toUpperCase() + s.slice(1);
const formatSchemaName = (name: string): string => {
  return name
    .split('-')
    .map((name) => capitalize(name))
    .join('');
};
export const formatJsonToJs = <T>(path: string): T =>
  JSON.parse(readFileSync(path, 'utf-8'));
export const getGeneratorsDefinition = (
  path: string
): GeneratorDefinition[] => {
  const collection = formatJsonToJs<{
    schematics: Record<string, SchemaCollection>;
  }>(path);
  return Object.values(collection.schematics).map((schemaCollection) => {
    const originalName = schemaCollection.factory.split('./')[1];
    return {
      originalName,
      description: schemaCollection.description,
      displayName: formatSchemaName(originalName),
    };
  });
};

export const convertKeyToArgument = (key: string): string => {
  // Getting all capital letters -> 'inlineStyle' -> ['S']
  const letters: string[] = key.match(/[A-Z]/g) || [];
  if (letters.length) {
    // if there's capital letters means its camel case
    // then switching every capital letter to lower case with -
    // 'inlineStyle' -> '--inline-style'
    return letters.reduce((acc: string, letter: string) => {
      acc = acc.replace(letter, `-${letter.toLowerCase()}`);
      return acc;
    }, `--${key}`);
  }
  return `--${key}`;
};
