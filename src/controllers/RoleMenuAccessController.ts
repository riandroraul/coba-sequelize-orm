import { Request, Response } from 'express';
import { errorResult } from '../utils/Respons';
import RoleMenuAccess from '../db/models/RoleMenuAccess';
import Role from '../db/models/Role';
import Submenu from '../db/models/Submenu';

const CreateAccess = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { roleId, submenuId } = req.body;
        const roleMenuAccess = await RoleMenuAccess.create({
            roleId,
            submenuId,
            active: true,
        });
        return res.status(201).json({ status: 201, message: 'created', data: roleMenuAccess });
    } catch (error: any) {
        console.log(error.message);
        return errorResult(error, res, 400);
    }
};

const GetList = async (req: Request, res: Response): Promise<Response> => {
    try {
        const menu = await RoleMenuAccess.findAll({
            where: {
                active: true,
            },
            include: [
                { model: Submenu, attributes: ['name'] },
                { model: Role, attributes: ['roleName'] },
            ],
        });
        return res.status(201).json({ status: 201, message: 'created', data: menu });
    } catch (error: any) {
        console.log(error.message);
        return errorResult(error, res, 400);
    }
};

const GetAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const menu = await RoleMenuAccess.findAll({
            include: [
                { model: Submenu, attributes: ['name'] },
                { model: Role, attributes: ['roleName'] },
            ],
        });
        return res.status(201).json({ status: 201, message: 'created', data: menu });
    } catch (error: any) {
        console.log(error.message);
        return errorResult(error, res, 400);
    }
};

const GetDetail = async (req: Request, res: Response): Promise<Response> => {
    try {
        const menu = await RoleMenuAccess.findAll({
            where: {
                id: req.params.id,
                active: true,
            },
            include: [
                { model: Submenu, attributes: ['name'] },
                { model: Role, attributes: ['roleName'] },
            ],
        });
        if (!menu) {
            return res.status(404).json({ status: 404, message: 'Not Found', data: null });
        }
        return res.status(201).json({ status: 201, message: 'created', data: menu });
    } catch (error: any) {
        console.log(error.message);
        return errorResult(error, res, 400);
    }
};

const UpdateAccess = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { roleId, submenuId } = req.body;
        const roleMenuAccess = await RoleMenuAccess.findOne({
            where: {
                id,
                active: true,
            },
        });
        if (!roleMenuAccess) {
            return res.status(404).json({ status: 404, message: 'Not Found', data: null });
        }

        roleMenuAccess.roleId = roleId;
        roleMenuAccess.submenuId = submenuId;
        await roleMenuAccess.save();
        return res.status(200).json({ status: 200, message: 'updated', data: roleMenuAccess });
    } catch (error: any) {
        console.log(error.message);
        return errorResult(error, res, 400);
    }
};

const SoftDelete = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const roleMenuAccess = await RoleMenuAccess.findOne({
            where: {
                id,
                active: true,
            },
        });
        if (!roleMenuAccess) {
            return res.status(404).json({ status: 404, message: 'Not Found', data: null });
        }

        roleMenuAccess.active = false;
        await roleMenuAccess.save();
        return res.status(200).json({ status: 200, message: 'Removed', data: roleMenuAccess });
    } catch (error: any) {
        console.log(error.message);
        return errorResult(error, res, 400);
    }
};

export default { CreateAccess, GetAll, GetList, GetDetail, UpdateAccess, SoftDelete };
