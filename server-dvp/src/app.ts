import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import jwt from "jsonwebtoken";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolver";
import { JWT_SECRET } from "./config/env";

export const createApp = async () => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start();

    app.use("/graphql",expressMiddleware(apolloServer, {
        context: async ({ req }) => {
            const authHeader = req.headers.authorization || "";

            if (!authHeader) {
                return { user: null};
            }

            try {
                const token = authHeader.replace("Bearer ", "");
                const payload = jwt.verify(token, JWT_SECRET) as { userId: number };

                return { user: { id_user: payload.userId } };
            } catch (error) {
                return { user: null};
            }
        }
    }));

    return app;
};
