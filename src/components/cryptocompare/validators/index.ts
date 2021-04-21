import Ajv from 'ajv'

import { SchemasType } from '../../../types'

const ajv = new Ajv({ allErrors: true })

const Schemas: SchemasType = {
  definitions: {
    FsymsQuery: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['BTC']
      }
    },
    TsymsQuery: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['USD']
      }
    },
    SymbolsQuery: {

      type: 'object',
      properties: {
        fsyms: {
          $ref: '#/definitions/FsymsQuery'
        },
        tsyms: {
          $ref: '#/definitions/TsymsQuery'
        }
      },
      required: ['fsyms', 'tsyms'],
      additionalProperties: false
    }
  }
}

for (const schemaName in Schemas.definitions) {
  ajv.addSchema(Schemas.definitions[schemaName], '#/definitions/' + schemaName)
}

export const SymbolsQueryValidator = ajv.compile(Schemas.definitions.SymbolsQuery)
