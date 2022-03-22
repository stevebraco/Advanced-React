import {list} from '@keystone-next/keystone/schema';
import {text, select, integer, relationship} from '@keystone-next/fields'

export const Product = list({
  //access:
  //ui

  fields: {
    name: text({ isRequired: true }),
    description: text({ ui: {
      displayMode: 'textarea'
    }}),
    photo: relationship({
      ref: 'ProductImage.product',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      }
    }),
    status: select({
      options: [
        {label: 'Draft', value: 'DRAFT'},
        {label: 'Available', value: 'AVAILABLE'},
        {label: 'UnAvailable', value: 'UNAVAILABLE'},
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: {fieldMode: 'hidden'},
      }
    }),
    price: integer()
    // Add roles, cart and orders
  }
})