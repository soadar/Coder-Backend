import { Router } from "express";

const router = Router();

router.get('/current', async (req, res, next) => {
    //console.log(req.session.passport.user);
    try {
        if (req.user) return res.status(200).json(req.user);
        return res.status(404).json({
            status: 'error',
            msg: 'El ID no fue encontrado.',
        });
    } catch (error) {
        next(error.message);
    }
});

export default router;