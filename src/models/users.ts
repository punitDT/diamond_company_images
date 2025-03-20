import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';

export interface UserAttributes {
    id: string; // id is an auto-generated UUID
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    phone: string;
    mobile: string;
    fax: number;
    profile_image: string;
    website: string;
    shipping_address: string; // physical address
    billing_address: string;
    is_address_same: boolean; //
    state: string;
    city: string;
    country: string;
    zip_code: string;
    password: string;
    buy_request_count: number;
    order_count: number;
    otp: string;
    is_blocked: boolean;
    legal_registered_name: string; // Registered legal name
    company_operating_name: string; //  D.B.A/Trade Style
    fed_tax_id: string; // Federal Tax ID
    resale_tax: string;
    jbt_id: string;
    has_AMLprogram: boolean; // Have You Instituted An Anti-Money Laundering Program?
    how_they_heard: string; // How Did They Hear About Us?
    facebook_id: string; // facebook handle
    instagram_id: string; // instagram handle
    type_of_business: string; // enum retailer | whole seller | etailer
    business_start_date: Date; // start date of business
    years_at_present_location: string; // duration
    legal_organization_status: object; // { type: private_corp | Partnership | Individual, registration_or_incorporation_country, registration_or_incorporation_state }
    order_authorized_person: [object]; // { designation, first_name, last_name, mobile_no }
    document_name: string;
    document_url: string; //  name of the uploaded document
    trade_references: [object]; //  { company_name, contact_person_name, phone, email }
    business_entity_name: string;
    signature_image_name: string; // name of the uploaded signature
    signature_image_url: string;
    sign_date: Date;
    print_name: string;
    fcm_token: string;
    customer_profile_id: string;
    is_phone_verified: boolean;
    is_email_verified: boolean;
    is_verified: boolean;
    credit_limit: number;
    _deleted: boolean;
    is_active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type UserStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => UserInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const users = sequelize.define<UserInstance>(
        'users',
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
            username: {
                type: DataTypes.STRING,
                allowNull: true
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mobile: {
                type: DataTypes.STRING,
                allowNull: false
            },
            profile_image: {
                type: DataTypes.STRING,
                allowNull: true
            },
            shipping_address: {
                type: DataTypes.JSONB,
                allowNull: false
            },
            billing_address: {
                type: DataTypes.JSONB,
                allowNull: true
            },
            is_address_same: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            fax: {
                type: DataTypes.STRING,
                allowNull: true
            },
            website: {
                type: DataTypes.STRING,
                allowNull: true
            },
            zip_code: {
                type: DataTypes.STRING,
                allowNull: false
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true
            },
            buy_request_count: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            order_count: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            otp: {
                type: DataTypes.STRING,
                allowNull: true
            },
            legal_registered_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            company_operating_name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            fed_tax_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            resale_tax: {
                type: DataTypes.STRING,
                allowNull: true
            },
            jbt_id: {
                type: DataTypes.STRING,
                allowNull: true
            },
            has_AMLprogram: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            how_they_heard: {
                type: DataTypes.STRING,
                allowNull: true
            },
            facebook_id: {
                type: DataTypes.STRING,
                allowNull: true
            },
            instagram_id: {
                type: DataTypes.STRING,
                allowNull: true
            },
            customer_profile_id: {
                type: DataTypes.STRING,
                allowNull: true
            },
            fcm_token: {
                type: DataTypes.STRING,
                allowNull: true
            },
            type_of_business: {
                type: DataTypes.ENUM,
                allowNull: false,
                values: ['Retailer', 'Wholesaler', 'Etailer']
            },
            business_start_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            years_at_present_location: {
                type: DataTypes.STRING,
                allowNull: false
            },
            legal_organization_status: {
                type: DataTypes.JSONB,
                allowNull: false
            },
            order_authorized_person: {
                type: DataTypes.ARRAY(DataTypes.JSONB),
                allowNull: false
            },
            document_name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            document_url: {
                type: DataTypes.STRING,
                allowNull: true
            },
            trade_references: {
                type: DataTypes.ARRAY(DataTypes.JSONB),
                allowNull: false
            },
            business_entity_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            signature_image_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            signature_image_url: {
                type: DataTypes.STRING,
                allowNull: false
            },
            sign_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            print_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_phone_verified: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            is_email_verified: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            credit_limit: {
                type: DataTypes.DOUBLE,
                allowNull: true,
                defaultValue: 0
            },
            is_blocked: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            _deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
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
    ) as UserStatic;

    //
    // await users.sync({alter: true})

    return users;
};
