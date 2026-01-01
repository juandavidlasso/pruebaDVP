import { mergeTypeDefs } from '@graphql-tools/merge'
import { userTypeDefs } from '../modules/user/user.typeDefs'
import { debtTypeDefs } from '../modules/debt/debt.typeDefs'

export const typeDefs = mergeTypeDefs([
    userTypeDefs,
    debtTypeDefs
])