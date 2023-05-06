import { faker } from '@faker-js/faker'
import fs from 'fs'

const dep = 'if'
const sem = 1
const rows = []
for (let i = 0; i < 100; i++) {
  const name = faker.name.fullName()
  const roll = faker.datatype.number({ min: 1, max: 20 })
  const fie101 = faker.datatype.number({ min: 10, max: 20 })
  const fie102 = faker.datatype.number({ min: 10, max: 20 })
  const fie103 = faker.datatype.number({ min: 10, max: 20 })
  const fie104 = faker.datatype.number({ min: 10, max: 20 })
  const fie105 = faker.datatype.number({ min: 10, max: 20 })
  rows.push(`${name},${roll},${dep},${sem},${fie101},${fie102},${fie103},${fie104},${fie105}`)
}

const header = `name,roll no,department,semester,Subject FEC101,Subject FEC102,Subject FEC103,Subject FEC104,Subject FEC105`
rows.unshift(header)
const data = rows.join('\n')
fs.writeFileSync('./data.csv', data)