import {Column, DataType, ForeignKey, HasOne, IsNull, Model, Table} from "sequelize-typescript";
import {UserEntity} from "../user/User.entity";


@Table({tableName: 'file'})
export class FileEntity extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.INTEGER, defaultValue: 0})
    size: number

    @Column({type: DataType.STRING})
    @ForeignKey(() => FileEntity)
    parentId: string

    // @Column({type: DataType.STRING})
    // childId: string[]

    @Column({type: DataType.STRING})
    name: string

    @Column({type: DataType.STRING})
    access_link: string

    @Column({type: DataType.STRING, defaultValue: 'dir'})
    type: string

    @Column({type: DataType.STRING})
    path: string

    @ForeignKey(() => UserEntity)
    user_id: string

}