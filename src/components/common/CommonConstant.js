export const controllerURL = 'https://gnni706pq0.execute-api.us-east-1.amazonaws.com/default/DCR-Controller';
export const doctorURL = 'https://gnni706pq0.execute-api.us-east-1.amazonaws.com/default/DCR-Controller';
export const shopURL = 'https://xikwcr5wq8.execute-api.us-east-1.amazonaws.com/dev/shopinfo';
export const businessAreaURL = 'https://uqz985nz24.execute-api.us-east-1.amazonaws.com/dev/businessareainfo';
export const productURL =  'placeholder';
export const giftURL = 'https://xnma5fuy28.execute-api.us-east-1.amazonaws.com/dev/giftinfo';
export const companyURL = 'https://z1ix1c2cs8.execute-api.us-east-1.amazonaws.com/dev/companyinfo';
export const userURL = 'placeholder';

export const LOGIN_OPERATION = "login";
export const ADD_DOCTOR = "adddoctor";
export const GET_ALL_DOCTOR = "getdoctorsall";
export const GET_DOCTOR_BY_ID = "getdoctorbyid";
export const GET_DOCTOR_BY_NAME = "getdoctorbyname";
export const UPDATE_DOCTOR = "updatedoctorbyid";
export const DELETE_DOCTOR = "deletedoctorbyid";

export const ADD_SHOP = "addshop";
export const GET_ALL_SHOP = "getshopsall";
export const GET_SHOP_BY_ID = "getshopbyid";
export const GET_SHOP_BY_NAME = "getshopbyname";
export const UPDATE_SHOP = "updateshopbyid";
export const DELETE_SHOP = "deleteshopbyid";

export const ADD_BUSINESSAREA = "addbusinessarea";
export const GET_ALL_BUSINESSAREA = "getbusinessareasall";
export const GET_BUSINESSAREA_BY_ID = "getbusinessareabyid";
export const GET_BUSINESSAREA_BY_NAME = "getbusinessareabyname";
export const UPDATE_BUSINESSAREA = "updatebusinessareabyid";
export const DELETE_BUSINESSAREA = "deletebusinessareabyid";

export const ADD_GIFT = "addgift";
export const GET_ALL_GIFT = "getgiftsall";
export const GET_GIFT_BY_ID = "getgiftbyid";
export const GET_GIFT_BY_NAME = "getgiftbyname";
export const UPDATE_GIFT = "updategiftbyid";
export const DELETE_GIFT = "deletegiftbyid";

export const ADD_COMPANY = "addcompany";
export const GET_ALL_COMPANY = "getcompanysall";
export const GET_COMPANY_BY_ID = "getcompanybyid";
export const GET_COMPANY_BY_NAME = "getcompanybyname";
export const UPDATE_COMPANY = "updatecompanybyid";
export const DELETE_COMPANY = "deletecompanybyid";

export const ADD_PRODUCT = "addproduct";
export const GET_ALL_PRODUCT = "getproductsall";
export const GET_PRODUCT_BY_ID = "getproductbyid";
export const GET_PRODUCT_BY_NAME = "getproductbyname";
export const UPDATE_PRODUCT = "updateproductbyid";
export const DELETE_PRODUCT = "deleteproductbyid";

export const ADD_USER = "adduser";
export const GET_ALL_USER = "getusersall";
export const GET_USER_BY_ID = "getuserbyid";
export const GET_USER_BY_NAME = "getuserbyname";
export const UPDATE_USER = "updateuserbyid";
export const DELETE_USER = "deleteuserbyid";

export const ADD_DCRROW = "adddcrrow";
export const GET_ALL_DCRROW = "getdcrrowsall";
export const GET_DCRROW_BY_ID = "getdcrrowbyid";
export const UPDATE_DCRROW = "updatedcrrowbyid";
export const DELETE_DCRROW = "deletedcrrowbyid";
export const DCR_APPROVAL = "dcrapproval";
export const DCR_GET_LASTVISITEDDATE = "dcrgetlastvisiteddate";

export const ADD_HEADQUARTER = "addheadquarter";
export const GET_ALL_HEADQUARTER = "getheadquartersall";
export const GET_HEADQUARTER_BY_ID = "getheadquarterbyid";
export const GET_HEADQUARTER_BY_NAME = "getheadquarterbyname";
export const UPDATE_HEADQUARTER = "updateheadquarterbyid";
export const DELETE_HEADQUARTER = "deleteheadquarterbyid";
export const GET_DOCTORS_BY_HEADQUARTER_ID = "getdoctorsbyheadquarterid";
export const GET_SHOPS_BY_HEADQUARTER_ID = "getshopsbyheadquarterid";
export const GET_DOCTORS_SHOPS_BY_HEADQUARTER_ID = "getdoctorsshopsbyheadquarterid";

export const STATUS_APPROVED = 1;
export const STATUS_UNAPPROVED = 2;
export const STATUS_DELETED = 5;
export const REQUEST_TEMPLATE = {operation:'', authorization:'Bearer '}