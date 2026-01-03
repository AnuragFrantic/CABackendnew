const SetsApart = require("../model/SetsApart")

// Create a new SetsApart entry
exports.createApart = async (req, res) => {
    const data = new SetsApart(req.body);
    try {
        if (req.file) {
            data.image = req.file.path;  // Correct variable
        }

        // Save the new SetsApart instance to the database
        await data.save();

        res.status(201).json({ message: "Your SetsApart has been created", error: 0, data });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating SetsApart", error: 1 });
    }
}


// Get all SetsApart entries
exports.getAllAparts = async (req, res) => {
    try {
        const result = await SetsApart.find()

        res.status(200).json({ message: "Fetched all SetsApart", error: 0, data: result })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error fetching SetsApart", error: 1 })
    }
}

// Get a specific SetsApart by ID
exports.getApartById = async (req, res) => {
    try {
        const result = await SetsApart.findById(req.params.id)
        if (!result) {
            return res.status(404).json({ message: "SetsApart not found", error: 1 })
        }
        res.status(200).json({ message: "Fetched SetsApart", error: 0, data: result })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error fetching SetsApart", error: 1 })
    }
}

// Update a specific SetsApart by ID
exports.updateApart = async (req, res) => {
    try {
        // Find and update the document by ID
        let result = await SetsApart.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!result) {
            return res.status(404).json({ message: "SetsApart not found", error: 1 });
        }

        // Check if there is a file (image) in the request and update the image field
        if (req.file) {
            result.image = req.file.path;
            await result.save();  // Save the document again to persist the new image
        }

        // Send a success response with the updated data
        res.status(200).json({ message: "SetsApart updated successfully", error: 0, data: result });
    } catch (err) {
        // Log the error and send an error response
        console.error("Error updating SetsApart:", err);
        res.status(500).json({ message: "Error updating SetsApart", error: 1 });
    }
};



exports.deleteApart = async (req, res) => {
    try {
        const result = await SetsApart.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.status(404).json({ message: "SetsApart not found", error: 1 })
        }
        res.status(200).json({ message: "SetsApart deleted successfully", error: 0 })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error deleting SetsApart", error: 1 })
    }
}
