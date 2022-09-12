import {
	GraphQLList,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from "graphql";
import { context } from "./context";

const listType = new GraphQLObjectType({
	name: "List",
	fields: () => ({
		id: { type: GraphQLString },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
	}),
});

const Query = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		getAllList: {
			type: new GraphQLList(listType),
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				return context.prisma.list.findMany();
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		createList: {
			type: listType,
			args: {
				title: { type: GraphQLString },
				description: { type: GraphQLString },
			},
			resolve(parent, args) {
				return context.prisma.list.create({
					data: {
						title: args.title,
						description: args.description,
					},
				});
			},
		},
	},
});

const schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation,
});

export default schema;
