export const RULEENGINE_DATA = {
  nodes: [
    {
      name: 'Device Name',
      id: '10',
      x: 154,
      y: 210,
      color: '#008000',
      icon: '=',
      type: 'node',
      connectors: [{id: '20', type: 'leftConnector'}, {id: '21', type: 'rightConnector'}],
      conditions: {fact: 'Device Name', operator: 'equal', value: 'Cluster 1'}
    },
    {
      name: 'Temperature',
      id: '11',
      x: 427,
      y: 209,
      color: '#008000',
      icon: '>',
      type: 'node',
      connectors: [{id: '22', type: 'leftConnector'}, {id: '23', type: 'rightConnector'}],
      conditions: {fact: 'Temperature', operator: 'greaterThan', value: '33'}
    },
    {
      name: 'mail',
      id: '12',
      x: 598,
      y: 106,
      color: '#DEC111',
      icon: 'flash_on',
      type: 'action',
      connectors: [{id: '24', type: 'leftConnector'}]
    },
    {
      name: 'log',
      id: '13',
      x: 596,
      y: 301,
      color: '#DEC111',
      icon: 'flash_on',
      type: 'action',
      connectors: [{id: '25', type: 'leftConnector'}]
    }
  ],
  edges: [
    {
      source: '21',
      destination: '22',
      label: 'Yes',
      source_id: '10',
      source_condition: {fact: 'Device Name', operator: 'equal', value: 'Cluster 1'},
      source_type: 'node',
      destination_id: '11',
      destination_type: 'node'
    },
    {
      source: '23',
      destination: '24',
      label: 'Yes',
      source_id: '11',
      source_condition: {fact: 'Temperature', operator: 'greaterThan', value: '33'},
      source_type: 'node',
      destination_id: '12',
      destination_type: 'action',
      destination_action: 'mail'
    },
    {
      source: '23',
      destination: '25',
      label: 'No',
      source_id: '11',
      source_condition: {fact: 'Temperature', operator: 'greaterThan', value: '33'},
      source_type: 'node',
      destination_id: '13',
      destination_type: 'action',
      destination_action: 'log'
    }
  ]
};
