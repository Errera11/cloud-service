import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {FileEntity} from "../file/File.entity";

@Table({tableName: 'user_rep'})
export class UserEntity extends Model {

    @Column({type: DataType.STRING, primaryKey: true})
    id: string

    @Column({type: DataType.STRING, unique: true})
    email: string

    @Column({type: DataType.STRING})
    password: string

    @Column({type: DataType.INTEGER, defaultValue: 8*1024})
    diskSpace: number

    @Column({type: DataType.INTEGER, defaultValue: 0})
    usedSpace: number

    @Column({type: DataType.STRING, allowNull: true})
    image: string

    @HasMany(() => FileEntity)
    files: FileEntity[]
}