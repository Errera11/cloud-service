import {Module} from "@nestjs/common";
import {Sequelize} from "sequelize-typescript";
import * as process from "process";
import {UserEntity} from "../user/User.entity";

@Module({
    providers: [
        {provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: process.env.host,
                port: Number(process.env.dbPort),
                username: process.env.username,
                password: String(process.env.password),
                database: process.env.database,
            });
            sequelize.addModels([UserEntity]);
            await sequelize.sync();
            return sequelize;
        },
    }],
    exports: [
        {provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: process.env.host,
                port: Number(process.env.dbPort),
                username: process.env.username,
                password: String(process.env.password),
                database: process.env.database,
            });
            sequelize.addModels([UserEntity]);
            await sequelize.sync();
            return sequelize;
        },
    }],

})
export class DbModule {}