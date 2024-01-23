import { DataSource } from "typeorm";
import { Board } from "./Board.postgres";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// api-docs
const typeDefs = `#graphql
  input createBoardInput {
    writer: String
    title: String
    contents: String
  }

  type MyBoard {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoards: [MyBoard]
  }

  type Mutation {
    #backend example
    #createBoard(writer: String, title: String, contents: String): String

    #backend practice
    createBoard(createBoardInput: createBoardInput): String
  }
`;

// api
const resolvers = {
  Query: {
    fetchBoards: async () => {
      const result = await Board.find();
      console.log(result);
      return result;
    },
  },
  Mutation: {
    createBoard: async (parent: any, args: any, context: any, info: any) => {
      await Board.insert({
        ...args.createBoardInput,

        // writer: args.createBoardInput.writer,
        // title: args.createBoardInput.title,
        // contents: args.createBoardInput.contents,
      });
      return "등록이 완료되었습니다.";
    },

    // updateBoard: async () => {
    //   await Board.update({number: 3}, {writer: "영희"});
    // },

    // deleteBoard: async () => {
    //   await Board.delete({number: 3});
    //   // await Board.update({number: 3}, {isDeleted: true});
    //   // await Board.update({number: 3}, {deletedAt: new Date()});
    // }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // cors: true,
});

const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "gyuri",
  password: "memo2231",
  database: "nodedb",
  entities: [Board],
  synchronize: true,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("DB접속에 성공했습니다.");
    startStandaloneServer(server).then(() => {
      console.log("start graphql server");
    });
  })
  .catch((error) => {
    console.log("DB접속에 실패했습니다.");
    console.log(error);
  });
