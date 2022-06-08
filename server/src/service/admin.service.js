import { apiStatus } from '../constants/apiStatus.js';
import { httpStatus } from '../constants/httpStatus.js';
import CustomError from '../error/customError.js';
import Admin from '../model/admin.js';

const AdminService = {};

AdminService.findAdminById = async (id) => {
    let admin = await Admin.findById(id);
    if (!admin) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Admin not found`,
        );
    }
    return admin;
};

AdminService.findAdminByUsername = async (username) => {
    let admin = await Admin.findOne({ username: username });
    if (!admin) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Admin not found with username: ${username}!`,
        );
    }
    return admin;
};

AdminService.addAdmin = async (admin) => {
    await admin.save((err, admin) => {
        if (err) throw Error;
        else return admin;
    });
};

export default AdminService;
