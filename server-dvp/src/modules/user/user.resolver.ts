import { createUser, getAllUsers, loginUser } from "./user.service";
import { requireAuth } from "../../shared/utils/requireAuth";

export const userResolvers = {
    Query: {
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