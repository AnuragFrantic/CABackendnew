const Expertise = require("../model/ExpertiseModal");

// Create Expertise
exports.createExpertise = async (req, res) => {
    try {
        const data = new Expertise(req.body);

        // Handle image and icon file uploads if present
        if (req.files && req.files['image']) {
            data.image = req.files['image'][0].path;  // Store image path
        }
        if (req.files && req.files['icon']) {
            data.icon = req.files['icon'][0].path;    // Store icon path
        }

        const result = await data.save();
        res.status(201).json({ message: "Expertise created successfully", error: 0, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating expertise", error: 1, detail: err.message });
    }
};

// Get All Expertise
exports.getAllExpertise = async (req, res) => {
    try {
        const data = await Expertise.find();
        res.status(200).json({ message: "Expertise data fetched successfully", error: 0, data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching expertise data", error: 1, detail: err.message });
    }
};

// Update Expertise
exports.updateExpertise = async (req, res) => {
    const { id, ...updatedData } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Expertise ID is required", error: 1 });
    }

    try {
        // Handle image and icon file uploads if present
        if (req.files && req.files['image']) {
            updatedData.image = req.files['image'][0].path;
        }
        if (req.files && req.files['icon']) {
            updatedData.icon = req.files['icon'][0].path;
        }

        const updatedExpertise = await Expertise.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedExpertise) {
            return res.status(404).json({ message: "Expertise not found", error: 1 });
        }

        res.status(200).json({ message: "Expertise updated successfully", error: 0, data: updatedExpertise });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating expertise", error: 1, detail: err.message });
    }
};

// Delete Expertise
exports.deleteExpertise = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Expertise ID is required", error: 1 });
        }

        const deletedExpertise = await Expertise.findByIdAndDelete(id);

        if (!deletedExpertise) {
            return res.status(404).json({ message: "Expertise not found", error: 1 });
        }

        res.status(200).json({ message: "Expertise deleted successfully", error: 0, data: deletedExpertise });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting expertise", error: 1, detail: err.message });
    }
};
