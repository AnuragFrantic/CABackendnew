const LegalUpdate = require("../model/LegalUpdate");

// Create LegalUpdate
exports.createLegalUpdate = async (req, res) => {
    try {
        const data = new LegalUpdate(req.body);

        // Handle image and icon file uploads if present
        if (req.files && req.files['image']) {
            data.image = req.files['image'][0].path;  // Store image path
        }
        if (req.files && req.files['icon']) {
            data.icon = req.files['icon'][0].path;    // Store icon path
        }

        const result = await data.save();
        res.status(201).json({ message: "LegalUpdate created successfully", error: 0, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating LegalUpdate", error: 1, detail: err.message });
    }
};

// Get All LegalUpdate
exports.getAllLegalUpdate = async (req, res) => {
    try {
        // Extract page and limit from query parameters (default to 1 and 10 if not provided)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Calculate the number of documents to skip based on page and limit
        const skip = (page - 1) * limit;

        // Fetch and sort data by createdAt in descending order with pagination
        const data = await LegalUpdate.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Count the total number of documents to calculate total pages
        const totalCount = await LegalUpdate.countDocuments();

        // Return the response with paginated data
        res.status(200).json({
            message: "LegalUpdate data fetched successfully",
            error: 0,
            data,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            totalRecords: totalCount,

        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error fetching LegalUpdate data",
            error: 1,
            detail: err.message
        });
    }
};


// Update LegalUpdate
exports.updateLegalUpdate = async (req, res) => {
    const { id, ...updatedData } = req.body;

    if (!id) {
        return res.status(400).json({ message: "LegalUpdate ID is required", error: 1 });
    }

    try {
        // Handle image and icon file uploads if present
        if (req.files && req.files['image']) {
            updatedData.image = req.files['image'][0].path;
        }
        if (req.files && req.files['icon']) {
            updatedData.icon = req.files['icon'][0].path;
        }

        const updatedLegalUpdate = await LegalUpdate.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedLegalUpdate) {
            return res.status(404).json({ message: "LegalUpdate not found", error: 1 });
        }

        res.status(200).json({ message: "LegalUpdate updated successfully", error: 0, data: updatedLegalUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating LegalUpdate", error: 1, detail: err.message });
    }
};

// Delete LegalUpdate
exports.deleteLegalUpdate = async (req, res) => {
    try {
        const { id } = req.params;


        if (!id) {
            return res.status(400).json({ message: "LegalUpdate ID is required", error: 1 });
        }

        const deletedLegalUpdate = await LegalUpdate.findByIdAndDelete(id);

        if (!deletedLegalUpdate) {
            return res.status(404).json({ message: "LegalUpdate not found", error: 1 });
        }

        res.status(200).json({ message: "LegalUpdate deleted successfully", error: 0, data: deletedLegalUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting LegalUpdate", error: 1, detail: err.message });
    }
};







exports.getLegalUpdateByUrl = async (req, res) => {
    const { url } = req.params;

    // Validate if URL is provided
    if (!url) {
        return res.status(400).json({ message: "LegalUpdate URL is required", error: 1 });
    }

    try {
        const legalUpdate = await LegalUpdate.findOne({ url }); // Find by URL

        if (!legalUpdate) {
            return res.status(404).json({ message: "LegalUpdate not found", error: 1 });
        }

        res.status(200).json({ message: "LegalUpdate fetched successfully", error: 0, data: legalUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching LegalUpdate by URL", error: 1, detail: err.message });
    }
};