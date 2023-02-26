const { readdirSync, readFileSync, writeFile } = require('fs');
const { join } = require('path');
const PATH =
  '/Users/idan.yadgar/angular-cli-e-square/angular-cli/packages/schematics/angular';

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

const getDirectories = (source) =>
  readdirSync(source).map((name) => join(source, name));
const formatSchemaName = (name) => {
  const splitName = name.split('-');
  if (splitName.length > 1) {
    return (
      capitalize(splitName[0]) + capitalize(splitName[splitName.length - 1])
    );
  }
  return capitalize(splitName[0]);
};
const getGeneratorsSchemas = (generatorName) => {
  try {
    const schemaJson = readFileSync(
      `${PATH}/${generatorName}/schema.json`,
      'utf-8'
    );
    const name = formatSchemaName(generatorName);
    return { name, originalName: generatorName, ...JSON.parse(schemaJson) };
  } catch (e) {
    console.log(`There is no schema for ${generatorName}`);
    return null;
  }
};

const generatorsNames = getDirectories(PATH).map(
  (directory) => directory.split(PATH + '/')[1]
);
const schemas = generatorsNames.map(getGeneratorsSchemas).filter(Boolean);
const getPropTypeDefinition = (propType) => {
  if (propType === 'string') {
    return `IsString`;
  }
  if (propType === 'boolean') {
    return `IsBoolean`;
  }
  if (propType === 'number' || propType === 'integer') {
    return `IsNumber`;
  }
};
const getDtoProp = (prop, isRequired = false) => {
  const optionalDecorator = isRequired ? '' : '@IsOptional()';
  const message = isRequired ? ` {message: '${prop.name} is mandatory'} ` : '';
  return isRequired
    ? `
  @${getPropTypeDefinition(prop.type)}(${message})
  ${prop.name}!: ${prop.type};
  `
    : `
  @${getPropTypeDefinition(prop.type)}()
  ${optionalDecorator}
  ${prop.name}!: ${prop.type};
  `;
};
const getPropertiesImports = (properties, isRequired) => {
  const imports = Array.from(
    new Set([
      ...properties.map((prop) => getPropTypeDefinition(prop.type)),
      isRequired && 'IsOptional',
    ])
  );
  return `import {${imports.sort().join(', ')} } from 'class-validator'`;
};

const createGeneratorDto = (schema) => {
  const properties = Object.entries(schema.properties).map(([name, value]) => ({
    name,
    ...value,
  }));
  const requiredProps = schema.required;
  const propsDecorators = properties.map((prop) => {
    const isRequired = requiredProps.includes(prop.name);
    return getDtoProp(prop, isRequired);
  });
  return `
${getPropertiesImports(properties, Boolean(requiredProps.length))}
export class Generate${schema.name}Dto {
    ${propsDecorators.toString().split(',').join(' ')}
    }
    `;
};
const pathToSave =
  '/Users/idan.yadgar/angular-cli-e-square/angular-cli-gui/apps/cli-daemon/src/app/generators/dto/generators';
schemas.forEach((schema) => {
  const dto = createGeneratorDto(schema);
  writeFile(`${pathToSave}/${schema.originalName}.dto.ts`, dto, (err) => {
    console.log('err:', err);
  });
});
