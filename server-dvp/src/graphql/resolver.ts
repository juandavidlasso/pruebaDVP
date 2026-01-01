import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "../modules/user/user.resolver";
import { debtResolvers } from "../modules/debt/debt.resolver";


export const resolvers = mergeResolvers([
    userResolvers,
    debtResolvers
]);