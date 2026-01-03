const Expertise = require("../model/ExpertiseDetail");

// Create Expertise
exports.createExpertiseDetail = async (req, res) => {
    try {
        const data = new Expertise(req.body);

        if (req.file) {
            data.image = req.file.path;
        }

        const result = await data.save();
        res.status(201).json({ message: "Expertise created successfully", error: 0, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating expertise", error: 1, detail: err.message });
    }
};


exports.getAllExpertiseDetail = async (req, res) => {
    try {
        const data = await Expertise.find();
        res.status(200).json({ message: "Expertise data fetched successfully", error: 0, data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching expertise data", error: 1, detail: err.message });
    }
};






// Update Expertise
exports.updateExpertiseDetail = async (req, res) => {
    const { id, ...updatedData } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Expertise ID is required", error: 1 });
    }

    try {
        const updatedExpertise = await Expertise.findByIdAndUpdate(id, updatedData, { new: true });



        if (req.file) {
            updatedData.image = req.file.path;  // Assuming image is uploaded and path is provided
        }

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
exports.deleteExpertiseDetail = async (req, res) => {
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



exports.getExpertiseByUrl = async (req, res) => {
    try {
        // Extracting parameters from the URL
        const { url } = req.params;

        // Finding expertise data based on the unique URL
        const data = await Expertise.findOne({ url });


        if (!data) {
            return res.status(404).json({ message: "Expertise data not found", error: 1 });
        }

        res.status(200).json({ message: "Expertise data fetched successfully", error: 0, data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching expertise data by URL", error: 1, detail: err.message });
    }
};
