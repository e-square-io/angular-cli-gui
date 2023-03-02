import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import { GeneratorDefinition, Schema } from './generators.interface';

const capitalize = (s: string): string => s[0].toUpperCase() + s.slice(1);
const formatSchemaName = (name: string): string => {
  const splitName = name.split('-');
  if (splitName.length > 1) {
    return splitName.map((name) => capitalize(name)).join('');
  }
  return capitalize(splitName[0]);
};
export const getGeneratorDefinition = (
  generatorName: string,
  path: string
): GeneratorDefinition | null => {
  try {
    const schema: Schema = JSON.parse(
      readFileSync(`${path}/${generatorName}/schema.json`, 'utf-8')
    );
    const displayName = formatSchemaName(generatorName);
    return {
      displayName,
      originalName: generatorName,
      description: schema.description,
    };
  } catch (e) {
    console.log(`There is no schema for ${generatorName}`);
    return null;
  }
};
export const getGeneratorNames = (path: string): string[] =>
  readdirSync(path)
    .map((name) => join(path, name))
    .map((directoryName) => directoryName.split(path + '/')[1]);

export const convertKeyToArgument = (key: string): string => {
  // Getting all capital letters -> 'inlineStyle' -> ['S']
  const letters = key.match(/[A-Z]/g) || [];
  if (letters.length) {
    // if there's capital letters means its camel case
    // then switching every capital letter to lower case with -
    // 'inlineStyle' -> '--inline-style'
    return letters.reduce((acc, letter) => {
      acc = acc.replace(letter, `-${letter.toLowerCase()}`);
      return acc;
    }, `--${key}`);
  }
  return `--${key}`;
};
