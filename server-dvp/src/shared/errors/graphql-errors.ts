import { GraphQLError } from "graphql"


export const badRequest = (message: string) => {
    return new GraphQLError(message, {
        extensions: {
            code: "BAD_REQUEST",
        },
    });
}

export const notFound = (message: string) => {
    return new GraphQLError(message, {
        extensions: {
            code: "NOT_FOUND",
        },
    });
}

export const internalServerError = () => {
    return new GraphQLError("Internal server error", {
        extensions: {
            code: "INTERNAL_SERVER_ERROR",
        },
    });
}

export const unauthorized = (message = 'Unauthorized') => {
  return new GraphQLError(message, {
    extensions: {
      code: 'UNAUTHORIZED',
    },
  });
};