export interface ConfigInterface {
  port: number;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  graphql: {
    debug: boolean;
    playground: boolean;
  };
}
