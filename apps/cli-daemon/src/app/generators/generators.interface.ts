type PropertyTypes = 'string' | 'boolean' | 'integer' | 'number';

interface Property {
  type: PropertyTypes;
  format: string;
  description: string;
  default: string | Record<string, any>;
}

export interface SchemaCollection {
  factory: string;
  schema: string;
  description: string;
}

export interface Schema {
  $schema: string;
  $id: string;
  title: string;
  type: string;
  description: string;
  additionalProperties: boolean;
  properties: Property[];
  required: string[];
}

export interface GeneratorDefinition {
  displayName: string;
  originalName: string;
  description: string;
}
