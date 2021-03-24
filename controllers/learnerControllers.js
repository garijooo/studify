const User = require('../models/User');

exports.add = async (req, res, next) => {
    const { id } = req.params;
    const { courseId } = req.body;
    try {
        const user = await User.findById(id);
        user.learner.courses = [ ...user.learner.courses, courseId ];
        user.save();
        try {
            storage.setState({"collectionChangeDate": new Date()});
            res.status(200).json({
                success: true,
                user
            });
        } catch (err) {
            next(err);
        }
    } catch(e) {
        next(e);    
    }
}