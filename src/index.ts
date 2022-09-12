import "dotenv/config";
import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";


const app = express();
app.use(cors());

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`🚀 Server ready at: http://localhost:${PORT}/graphql`);
});
