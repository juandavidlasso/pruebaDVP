import { GraphQLError } from "graphql";


export const requireAuth = (context: any) => {
    if (!context.user) {
        throw new GraphQLError("Authentication required", {
            extensions: { code: "UNAUTHORIZED" },
        });
    }

    return context.user;
};