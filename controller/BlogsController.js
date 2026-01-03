const BlogsModal = require("../model/Blogs")

exports.Createblogs = async (req, res) => {
    try {

        const title = req.body.title;
        if (!title) {
            return res.json({ success: 0, message: "Title i required" })
        }
        const url = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        const isExists = await BlogsModal.findOne({ url });
        if (isExists) {
            return res.json({ success: 0, message: "duplicate blog. kindly change the title" })
        }
        // Create a new instance of BlogsModal using the request body
        let data = new BlogsModal({ ...req.body, url });


        if (req.file) {
            data.image = req.file.path;
        }

        // Save the new blogs to the database
        let result = await data.save();

        // Return success response with the created data
        res.status(201).json({ message: "Your blogs Successfully Created", error: 0, data: result });
    } catch (err) {
        // Log the error to the console for debugging
        console.error(err);

        // Return error response
        res.status(500).json({ message: "Your blogs Not Created", error: 1, detail: err.message });
    }
};


exports.getAllblogs = async (req, res) => {
    try {
        // Extract page and limit from query parameters, set default values
        const page = parseInt(req.query.page) || 1; // Default page is 1
        const limit = parseInt(req.query.limit) || 10; // Default limit is 10

        // Calculate the number of records to skip
        const skip = (page - 1) * limit;

        // Fetch and sort blogs by publish_date in descending order with pagination
        const data = await BlogsModal.find()
            .sort({ publish_date: -1 })
            .skip(skip)
            .limit(limit);

        // Get the total count of blogs for pagination metadata
        const totalBlogs = await BlogsModal.countDocuments();

        res.status(200).send({
            message: "Blogs data fetched successfully",
            data: data,
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: page,
            totalRecords: totalBlogs,
            error: 0
        });
    } catch (e) {
        res.status(500).send({
            message: "Blogs data not fetched successfully",
            error: 1,
            details: e.message
        });
    }
};



exports.updateblogs = async (req, res) => {
    try {
        const { id, ...updatedData } = req.body;


        if (!id) {
            return res.status(400).json({ status: "FAIL", message: "blogs ID is required", error: 1 });
        }

        // Find the blogs by ID
        const blogs = await BlogsModal.findById(id);

        if (!blogs) {
            return res.status(404).json({ status: "FAIL", message: "blogs not found", error: 1 });
        }

        const title = req.body.title;
        if (!title) {
            return res.json({ success: 0, message: "Title i required" })
        }
        const url = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        const isExists = await BlogsModal.findOne({ url: url, _id: { $ne: id } });
        if (isExists) {
            return res.json({ success: 0, message: "duplicate blog. kindly change the title" })
        }



        if (req.file) {
            updatedData.image = req.file.path;  // Assuming image is uploaded and path is provided
        }

        // Update the blogs with new data
        const updatedblogs = await BlogsModal.findByIdAndUpdate(id, { ...updatedData, url }, { new: true });

        res.status(200).json({ status: "OK", data: updatedblogs, error: 0 });
    } catch (e) {
        res.status(500).json({ status: "FAIL", message: "Error updating blogs", error: 1, detail: e.message });
    }
};



exports.deleteblogs = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ status: "FAIL", message: "blogs ID is required", error: 1 });
        }

        // Find and delete the blogs by ID
        const deletedblogs = await BlogsModal.findByIdAndDelete(id);

        if (!deletedblogs) {
            return res.status(404).json({ status: "FAIL", message: "blogs not found", error: 1 });
        }

        res.status(200).json({ status: "OK", message: "blogs deleted successfully", data: deletedblogs, error: 0 });
    } catch (e) {
        res.status(500).json({ status: "FAIL", message: "Error deleting blogs", error: 1, detail: e.message });
    }
};




exports.getBlogsByurl = async (req, res) => {
    try {
        const { url } = req.params;
        const data = await BlogsModal.findOne({ url });
        if (!data) {
            return res.status(404).json({ message: "Blogs data not found", error: 1 });
        }

        res.status(200).json({ message: "Blogs data fetched successfully", error: 0, data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching Blogs data by URL", error: 1, detail: err.message });
    }
};