import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';
import { adminRole } from '../utils/constants';

export interface AdminAttributes {
    id: string; // id is an auto-generated UUID
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    permission: string;
    role: adminRole;
    phone: string;
    otp: string;
    _deleted: boolean;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, 'id'> {}

interface AdminInstance extends Model<AdminAttributes, AdminCreationAttributes>, AdminAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type AdminStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => AdminInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const admins = sequelize.define<AdminInstance>(
        'admins',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: UUIDV4
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            otp: {
                type: DataTypes.STRING,
                allowNull: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            permission: {
                type: DataTypes.JSONB,
                allowNull: true,
                defaultValue: {}
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: adminRole.superAdmin
            },
            _deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        },
        {
            freezeTableName: true,
            defaultScope: {
                where: {
                    _deleted: false
                }
            }
        }
    ) as AdminStatic;
    //
    //    await admins.sync({ alter: true })

    return admins;
};
