import { JSONSchema7 } from 'json-schema';

export class SchemaDto implements JSONSchema7 {
  properties: JSONSchema7['properties'];
  title: JSONSchema7['title'];
  description: JSONSchema7['title'];

  constructor({ title, properties, description }: JSONSchema7) {
    this.properties = properties;
    this.title = title;
    this.description = description;
  }
}
