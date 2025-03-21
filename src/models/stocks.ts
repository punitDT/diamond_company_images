import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';

export interface StockAttributes {
    id: string;
    stock_id: string;
    vendor_id?: string;
    admin_id?: string;
    client_name?: string;
    rapNet_lot_id?: string;
    lab_grown_type?: string;
    availability?: string;
    shape?: string;
    weight?: number;
    color?: string;
    clarity?: string;
    cut?: string;
    polish?: string;
    symmetry?: string;
    fluorescence_intensity?: string;
    fluorescence_color?: string;
    measurements?: string;
    shade?: string;
    milky?: string;
    eye_clean?: string;
    lab?: string;
    report_id?: string;
    certificate_number?: string;
    location?: string;
    treatment?: string;
    discounts?: number;
    discounts_ori?: number;
    price_per_caret?: number;
    price_per_caret_ori?: number;
    final_price?: number;
    final_price_ori?: number;
    depth?: number;
    meas_depth?: number;
    pavilion_depth?: number;
    table?: number;
    girdle_thin?: string;
    girdle_thick?: string;
    girdle_per?: string;
    girdle_condition?: string;
    culet_size?: string;
    culet_condition?: string;
    crown_height?: number;
    crown_angle?: number;
    pavilion_angle?: number;
    inscription?: string;
    certificate_comment?: string;
    certfile?: string;
    key_to_symbols?: string;
    white_inclusion?: string;
    black_inclusion?: string;
    open_inclusion?: string;
    fancy_color?: string;
    fancy_color_intensity?: string;
    fancy_color_overtone?: string;
    country?: string;
    state?: string;
    city?: string;
    diamond_video?: string;
    diamond_image?: string;
    diamond_image_2?: string;
    hearts_image?: string;
    arrows_image?: string;
    asset_image?: string;
    ideal_scope_image?: string;
    diamond_type?: string;
    image_data?: string;
    rap_per_caret?: number;
    rap_price?: number;
    lw_ratio?: number;
    brand?: string;
    status: 'AVAILABLE' | 'HOLD' | 'SOLD' | 'MEMO' | 'RETURNED' | 'ON HOLD' | 'ON MEMO';
    growth_type?: string;
    sku_prefix: string;
    sku_number: number;
    stock_margin: number;
    is_lab_grown?: boolean;
    is_featured?: boolean;
    is_new_arrival?: boolean;
    is_buy_request_created?: boolean;
    is_active?: boolean;
    _deleted?: boolean;
    is_wishlist: boolean;
    is_offer_created: boolean;
    hearts_and_arrow: boolean;
}

interface StockCreationAttributes extends Optional<StockAttributes, 'id'> { }

interface StockInstance extends Model<StockAttributes, StockCreationAttributes>, StockAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type StockStatic = typeof Model & { associate: (models: any) => void } & (new (
    values?: Record<string, unknown>,
    options?: BuildOptions
) => StockInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const stocks = sequelize.define<StockInstance>(
        'stocks',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: UUIDV4
            },
            stock_id: { type: DataTypes.STRING, allowNull: true },
            vendor_id: { type: DataTypes.UUID, allowNull: true },
            admin_id: { type: DataTypes.UUID, allowNull: true },
            client_name: { type: DataTypes.STRING, allowNull: true },
            rapNet_lot_id: { type: DataTypes.STRING, allowNull: true },
            lab_grown_type: { type: DataTypes.STRING, allowNull: true },
            availability: { type: DataTypes.STRING, allowNull: true },
            shape: { type: DataTypes.STRING, allowNull: true },
            weight: { type: DataTypes.FLOAT, allowNull: true },
            color: { type: DataTypes.STRING, allowNull: true },
            clarity: { type: DataTypes.STRING, allowNull: true },
            cut: { type: DataTypes.STRING, allowNull: true },
            polish: { type: DataTypes.STRING, allowNull: true },
            symmetry: { type: DataTypes.STRING, allowNull: true },
            fluorescence_intensity: { type: DataTypes.STRING, allowNull: true },
            fluorescence_color: { type: DataTypes.STRING, allowNull: true },
            measurements: { type: DataTypes.STRING, allowNull: true },
            shade: { type: DataTypes.STRING, allowNull: true },
            milky: { type: DataTypes.STRING, allowNull: true },
            eye_clean: { type: DataTypes.STRING, allowNull: true },
            lab: { type: DataTypes.STRING, allowNull: true },
            report_id: { type: DataTypes.STRING, allowNull: true },
            certificate_number: { type: DataTypes.STRING, allowNull: true },
            location: { type: DataTypes.STRING, allowNull: true },
            treatment: { type: DataTypes.STRING, allowNull: true },
            discounts: { type: DataTypes.FLOAT, allowNull: true },
            discounts_ori: { type: DataTypes.FLOAT, allowNull: true },
            price_per_caret: { type: DataTypes.FLOAT, allowNull: true },
            price_per_caret_ori: { type: DataTypes.FLOAT, allowNull: true },
            final_price: { type: DataTypes.FLOAT, allowNull: true },
            final_price_ori: { type: DataTypes.FLOAT, allowNull: true },
            depth: { type: DataTypes.FLOAT, allowNull: true },
            meas_depth: { type: DataTypes.FLOAT, allowNull: true },
            pavilion_depth: { type: DataTypes.FLOAT, allowNull: true },
            table: { type: DataTypes.FLOAT, allowNull: true },
            girdle_thin: { type: DataTypes.STRING, allowNull: true },
            girdle_thick: { type: DataTypes.STRING, allowNull: true },
            girdle_per: { type: DataTypes.STRING, allowNull: true },
            girdle_condition: { type: DataTypes.STRING, allowNull: true },
            culet_size: { type: DataTypes.STRING, allowNull: true },
            culet_condition: { type: DataTypes.STRING, allowNull: true },
            crown_height: { type: DataTypes.FLOAT, allowNull: true },
            crown_angle: { type: DataTypes.FLOAT, allowNull: true },
            pavilion_angle: { type: DataTypes.FLOAT, allowNull: true },
            inscription: { type: DataTypes.STRING, allowNull: true },
            certificate_comment: { type: DataTypes.STRING, allowNull: true },
            certfile: { type: DataTypes.STRING, allowNull: true },
            key_to_symbols: { type: DataTypes.STRING, allowNull: true },
            white_inclusion: { type: DataTypes.STRING, allowNull: true },
            black_inclusion: { type: DataTypes.STRING, allowNull: true },
            open_inclusion: { type: DataTypes.STRING, allowNull: true },
            fancy_color: { type: DataTypes.STRING, allowNull: true },
            fancy_color_intensity: { type: DataTypes.STRING, allowNull: true },
            fancy_color_overtone: { type: DataTypes.STRING, allowNull: true },
            country: { type: DataTypes.STRING, allowNull: true },
            state: { type: DataTypes.STRING, allowNull: true },
            city: { type: DataTypes.STRING, allowNull: true },
            diamond_video: { type: DataTypes.STRING, allowNull: true },
            diamond_image: { type: DataTypes.STRING, allowNull: true },
            diamond_image_2: { type: DataTypes.STRING, allowNull: true },
            hearts_image: { type: DataTypes.STRING, allowNull: true },
            arrows_image: { type: DataTypes.STRING, allowNull: true },
            asset_image: { type: DataTypes.STRING, allowNull: true },
            ideal_scope_image: { type: DataTypes.STRING, allowNull: true },
            diamond_type: { type: DataTypes.STRING, allowNull: true },
            rap_per_caret: { type: DataTypes.FLOAT, allowNull: true },
            rap_price: { type: DataTypes.FLOAT, allowNull: true },
            lw_ratio: { type: DataTypes.FLOAT, allowNull: true },
            brand: { type: DataTypes.STRING, allowNull: true },
            growth_type: { type: DataTypes.STRING, allowNull: true },
            is_lab_grown: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
            status: {
                type: DataTypes.ENUM('AVAILABLE', 'HOLD', 'SOLD', 'MEMO', 'RETURNED', 'ON HOLD', 'ON MEMO'),
                allowNull: false,
                defaultValue: 'AVAILABLE'
            },
            is_featured: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
            is_new_arrival: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
            is_buy_request_created: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
            is_active: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },
            _deleted: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
            is_wishlist: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
            is_offer_created: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
            hearts_and_arrow: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
            sku_prefix: { type: DataTypes.STRING, allowNull: true, defaultValue: 'DC' },
            sku_number: { type: DataTypes.INTEGER, autoIncrement: true },
            stock_margin: { type: DataTypes.DOUBLE, defaultValue: 0 },
            image_data: { type: DataTypes.TEXT, allowNull: true }
        },
        {
            freezeTableName: true,
            indexes: [
                {
                    name: 'unique_stock_id_and_admin_id',
                    fields: ['stock_id', 'admin_id'],
                    unique: true
                },
                {
                    name: 'unique_stock_id_and_vendor_id',
                    fields: ['stock_id', 'vendor_id'],
                    unique: true
                },
                {
                    name: 'unique_certificate_number_admin_id',
                    fields: ['certificate_number', 'admin_id'],
                    unique: true
                },
                {
                    name: 'unique_certificate_number_vendor_id',
                    fields: ['certificate_number', 'vendor_id'],
                    unique: true
                }
            ],
            defaultScope: {
                where: {
                    _deleted: false
                }
            }
        }
    ) as StockStatic;

    //
    // await stocks.sync({ alter: true })

    return stocks;
};
