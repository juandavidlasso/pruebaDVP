import { createUser, getAllUsers, getUser, loginUser } from "./user.service";
import { requireAuth } from "../../shared/utils/requireAuth";
import { GraphQLError } from "graphql";

export const userResolvers = {
    Query: {
        me: async (_:any, __:any, context:any) => {
            if (!context.user) {
                throw new GraphQLError('Unauthorized', {
                    extensions: { code: 'UNAUTHORIZED' }
                })
            }
            
            return getUser(context.user.id_user)
        },
        users: (_:any, __:any, context:any) => {
            requireAuth(context);
            return getAllUsers();
        }
    },
    Mutation: {
        createUser: (_: any, args: { email: string; password: string }) => createUser(args.email, args.password),
        login: (_: any, args: { email: string; password: string }) => loginUser(args.email, args.password),
    },
};