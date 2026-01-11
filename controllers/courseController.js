const Course = require('../models/course');

// create (membuat course baru)
exports.createCourse = async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        const course = await newCourse.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// read (mengambil semua course)
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({message: 'Internal server error :' + error.message});
    }
};

// read one (mengambil 1 data)
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({message: 'Course not found'});
        res.json(course);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// update (update course)
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!course) return res.status(400).json({message: 'Course not found'});
        res.json(course);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// delete (menghapus course)
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({message: 'Course not found'});
        res.json({message: 'Course succesfully deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};