import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';

export interface VendorAttributes {
    id: string; // id is an auto-generated UUID
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    profile_image: string;
    password?: string;
    buy_request_count: number;
    order_count: number;
    vendor_type: string;
    billing_details: object;
    address: object;
    is_terms_accepted: boolean;
    is_kyc_uploaded: boolean;
    api_url: string;
    is_blacklisted: boolean;
    company_name: string;
    document_name: string;
    document_url: string;
    otp?: string;
    error: string;
    last_synced_at?: Date;
    api_type: string;
    body: string;
    headers: string;
    ftp_username: string;
    ftp_password: string;
    margin_percentage: number;
    kyc_reject_reason: string;
    fcm_token?: string;
    is_from_DRC: boolean;
    _deleted: boolean;
    is_active: boolean;
    is_verified: boolean;
    is_formdata_request: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface VendorCreationAttributes extends Optional<VendorAttributes, 'id'> {}

interface VendorInstance extends Model<VendorAttributes, VendorCreationAttributes>, VendorAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type VendorStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => VendorInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const vendors = sequelize.define<VendorInstance>(
        'vendors',
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
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            profile_image: {
                type: DataTypes.STRING,
                allowNull: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true
            },
            buy_request_count: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            margin_percentage: {
                type: DataTypes.DOUBLE,
                allowNull: true,
                defaultValue: 0
            },
            order_count: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            vendor_type: {
                type: DataTypes.ENUM(DataTypes.STRING),
                values: ['API', 'UPLOAD', 'FTP'],
                allowNull: false
            },
            api_url: {
                type: DataTypes.STRING,
                allowNull: true
            },
            fcm_token: {
                type: DataTypes.STRING,
                allowNull: true
            },
            billing_details: {
                type: DataTypes.JSONB,
                allowNull: true,
                defaultValue: {}
            },
            address: {
                type: DataTypes.JSONB,
                allowNull: true,
                defaultValue: {}
            },
            ftp_username: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ftp_password: {
                type: DataTypes.STRING,
                allowNull: true
            },
            is_terms_accepted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            is_kyc_uploaded: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            is_blacklisted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            otp: {
                type: DataTypes.STRING,
                allowNull: true
            },
            company_name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            kyc_reject_reason: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            document_name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            document_url: {
                type: DataTypes.STRING,
                allowNull: true
            },
            error: {
                type: DataTypes.STRING,
                allowNull: true
            },
            last_synced_at: {
                type: DataTypes.DATE,
                allowNull: true
            },
            api_type: {
                type: DataTypes.STRING,
                allowNull: true
            },
            body: {
                type: DataTypes.STRING,
                allowNull: true
            },
            headers: {
                type: DataTypes.STRING,
                allowNull: true
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            is_from_DRC: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            is_formdata_request: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            _deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            is_active: {
                type: DataTypes.BOOLEAN,
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
    ) as VendorStatic;

    // await vendors.sync({ alter: true })

    return vendors;
};
