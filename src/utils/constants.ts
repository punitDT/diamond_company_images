// This limit is for shopify product listing, it can be maximum 100
export const DEFAULT_PAGINATION_LIMIT_SHOPIFY_PRODUCT_LIST = 100;

export const TOKEN = 'super.super.secret.shhh';

export enum httpStatusCodes {
    APP_NAME = 'income_shows',
    SUCCESS_CODE = 200,
    FORBIDDEN_CODE = 403,
    BAD_REQUEST_CODE = 400,
    SERVER_ERROR_CODE = 500,
    UNAUTHORIZED_CODE = 401,
    TOKEN_EXPIRED_CODE = 401,
    SERVER_ERROR = 'Oops! Something went wrong',
    TOKEN_EXPIRED = 'Your token is Invalid/expired. Please login again',
    INSUFFICIENT_PARAMETER = 'Insufficient parameters have been passed',
    UNAUTHORIZED_ACCESS = 'Unauthorize access',
    UNAUTHORIZED_URL = 'You are unauthorized user to access this url'
}

export enum adminRole {
    superAdmin = 'super_admin',
    subAdmin = 'sub_admin',
    vendor = 'vendor',
    user = 'user'
}

export enum stockStatus {
    available = 'AVAILABLE',
    hold = 'HOLD',
    sold = 'SOLD',
    memo = 'MEMO'
}

export enum buyRequestStatus {
    pending = 'PENDING',
    accepted = 'ACCEPTED',
    updated = 'UPDATED',
    cancelled = 'CANCELED',
    autoCanceled = 'AUTO-CANCELED'
}

export enum orderStatus {
    pending = 'PENDING',
    processing = 'PROCESSING',
    shipped = 'SHIPPED',
    delivered = 'DELIVERED',
    canceled = 'CANCELED'
}

export enum paymentType {
    credit = 'CREDIT',
    cash = 'CASH'
}

export enum paymentStatus {
    pending = 'PENDING',
    shipped = 'PAID',
    paid = 'FAILED',
    cancelled = 'CANCELED'
}

export enum vendorOrderStatus {
    pending = 'PENDING',
    shipped = 'SHIPPED',
    paid = 'PAID'
}

export enum AuthorizeTransactionType {
    authCaptureTransaction = 'authCaptureTransaction', /// charge credit card
    authOnlyTransaction = 'authOnlyTransaction', /// authorize credit card
    priorAuthCaptureTransaction = 'priorAuthCaptureTransaction', /// capture previously authorized card
    voidTransaction = 'voidTransaction' /// voidTransaction
}

export enum PaymentMode {
    creditLimit = 'CREDIT_LIMIT',
    creditCard = 'CREDIT_CARD',
    applePay = 'APPLE_PAY'
}

export const whiteColor = [
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
];

export const fancyColor = [
    'yellow',
    'pink',
    'blue',
    'red',
    'green',
    'purple',
    'orange',
    'violate',
    'black',
    'grey',
    'brown',
    'white',
    'champagne',
    'cognac',
    'chameleon'
];

export const roundAlias = {
    round: ['B', 'BR', 'RB', 'RD', 'RBC', 'RND', 'ROUND', 'BRILLIANT', 'ROUND BRILLIANT'],
    pear: ['P', 'PS', 'PSH', 'PB', 'PMB', 'PEAR', 'PEAR BRILLIANT', 'PEAR BR', 'PEAR SHAPE', 'PSH', 'PB', 'PMB'],
    emerald: [
        'EMERALD',
        'E',
        'EM',
        'EC',
        'SQUAREEMERALD',
        'SQUARE EMERALD',
        'SQEMERALD',
        'SQ EMERALD',
        'SQEM',
        'SX',
        'SQE',
        'SEC',
        'SQEC',
        'SQ EM',
        'SQUARE EM'
    ],
    trilliant: ['TRILLIANT', 'T', 'TR', 'TRILL', 'TRIL', 'TRIB', 'TRL', 'MTRI', 'TRMB', 'TRSC'],
    princess: ['PRN', 'PR', 'PRINCESS', 'PRIN', 'PN', 'PC', 'MDSQB', 'SMB', 'PRINCESS CUT'],
    marquise: ['MARQUISE', 'MQB', 'M', 'MQ', 'MARQ'],
    asscher: ['ASSCHER', 'A', 'ASH', 'CSS', 'CSSC', 'AC', 'AS'],
    cushion: [
        'CB',
        'CUX',
        'RCRMB',
        'CRC',
        'CSC',
        'CX',
        'RCSB',
        'SCMB',
        'SCX',
        'CUSHION',
        'CU',
        'C',
        'CUSH',
        'CUSHIONBRILLIANT',
        'CUSHION BRILLIANT',
        'CUBR',
        'CUB',
        'CUSHION BR',
        'CUSHIONMODIFIED',
        'CUSHION MODIFIED',
        'CM',
        'CUSHION MOD',
        'CUS',
        'CUS MOD',
        'CUSHION MODIFIED BRILLIANT',
        'CUSHION MOD BR',
        'CUS MOD BR',
        'CMB'
    ],
    heart: ['HEART', 'H', 'HS', 'HT', 'MHRC', 'HEART SHAPE', 'HEART BRILLIANT', 'HEART BR'],
    oval: ['OVAL', 'O', 'OV', 'OMB', 'OS', 'OVAL BRILLIANT', 'OVAL BR', 'OVAL SHAPE', 'OVAL BR'],
    radiant: [
        'RADIANT',
        'R',
        'RAD',
        'RA',
        'RC',
        'RDN',
        'CRB',
        'RCRB',
        'cut cornered rectangular modified brilliant',
        'SQUARERADIANT',
        'SQR',
        'CCSMB',
        'SQUARE RADIANT',
        'SQ RA',
        'SQ RAD',
        'SQ RADIANT',
        'SQRADIANT',
        'SQUARE RA'
    ]
};

export const cutAlias = {
    id: ['ID', 'I', 'IDEAL'],
    ex: ['X', 'EX', 'EXCELLENT', 'EXCEL', 'EXCELL'],
    vg: ['VG', 'Very G', 'V GOOD', 'VERY GOOD', 'V. GOOD'],
    gd: ['GD', 'G', 'GOOD'],
    f: ['F', 'FAIR'],
    p: ['P', 'POOR']
};

export const intensityAlias = {
    n: ['N', 'NONE'],
    vsl: ['VSL', 'VERY SLIGHT'],
    sl: ['SL', 'SLIGHT'],
    f: ['FAINT', 'F'],
    m: ['MEDIUM', 'M'],
    s: ['STRONG', 'S'],
    vs: ['VERY STRONG', 'VS']
};

export const makeUniqueKey = (length: number) => {
    const result: any = [];
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = characters.length;
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }

    return result.join('');
};

export const calculateFinancialYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    // Determine the start year of the financial year
    const startYear = month > 2 ? year : year - 1;

    // Determine the end year of the financial year
    const endYear = startYear + 1;

    // Extract the last two digits of the start year and end year
    const startYearLastTwoDigits = startYear.toString().slice(-2);
    const endYearLastTwoDigits = endYear.toString().slice(-2);

    // Format the financial year as a string
    const financialYear = `FY${startYearLastTwoDigits}-${endYearLastTwoDigits}`;

    return financialYear;
};

export const getInvoiceNumber = (lastInvoice: any) => {
    if (!lastInvoice) {
        return '001';
    }

    // Extracting the numeric part
    const matchResult = lastInvoice.invoice_number.match(/\d+/);
    const numericPart = matchResult ? matchResult[0] : '';

    // Converting the numeric part to a number
    let numericValue = parseInt(numericPart, 10); // Parses the numeric part as a base-10 integer

    numericValue = numericValue + 1;

    if (lastInvoice.financial_year !== calculateFinancialYear()) {
        numericValue = 1;
    }

    // Adding prefix based on the length of the number
    const paddedNumericValue: string =
        numericValue < 10 ? numericValue.toString().padStart(3, '00') : numericValue.toString().padStart(3, '0');

    return paddedNumericValue;
};

export const cleanObject = (obj: any) => {
    if (Array.isArray(obj)) {
        // Filter out empty arrays and clean each item
        return obj
            .map(cleanObject)
            .filter((value) => value !== null && value !== '' && !(Array.isArray(value) && value.length === 0));
    } else if (obj !== null && typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj)
                .map(([key, value]) => [key, cleanObject(value)])
                .filter(
                    ([key, value]) => value !== null && value !== '' && !(Array.isArray(value) && value.length === 0)
                )
        );
    }
    return obj;
};

// export const isStocksAvailable = (stock: any) => {
//     if (stock.admin_id) {
//         if (stock.is_available) {
//             return true;
//         }
//     } else if (stock.vendor_id) {
//         if (stock.is_action_taken) {
//             if (stock.is_available) {
//                 return true;
//             }
//         }
//     }
//     return false;
// };

export const isStocksAvailable = (stock: any) => {
    return stock.is_available;
};
