import { createUser, getAllUsers } from "./user.service";

export const userResolvers = {
    Query: {
        users: async () => await getAllUsers(),
    },
    Mutation: {
        createUser: async (_: any, args: { email: string; password: string }) => await createUser(args.email, args.password)
    },
};