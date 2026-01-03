const ProBono = require('../model/Probono'); // Adjust the path as necessary

// Create a new ProBono
exports.createProBono = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newProBono = new ProBono({ title, description });
        await newProBono.save();
        return res.status(201).json({ message: 'ProBono created successfully', newProBono });
    } catch (error) {
        return res.status(400).json({ message: 'Error creating ProBono', error });
    }
};

// Get all ProBonos
exports.getAllProBonos = async (req, res) => {
    try {
        const ProBonos = await ProBono.find();
        return res.status(200).json({ message: 'ProBonos retrieved successfully', data: ProBonos });
    } catch (error) {
        return res.status(400).json({ message: 'Error retrieving ProBonos', error });
    }
};

// Get an ProBono by ID
exports.getProBonoById = async (req, res) => {
    try {
        const ProBono = await ProBono.findById(req.params.id);
        if (!ProBono) {
            return res.status(404).json({ message: 'ProBono not found' });
        }
        return res.status(200).json({ message: 'ProBono retrieved successfully', ProBono });
    } catch (error) {
        return res.status(400).json({ message: 'Error retrieving ProBono', error });
    }
};

// Update an ProBono by ID
exports.updateProBono = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedProBono = await ProBono.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedProBono) {
            return res.status(404).json({ message: 'ProBono not found' });
        }
        return res.status(200).json({ message: 'ProBono updated successfully', updatedProBono });
    } catch (error) {
        return res.status(400).json({ message: 'Error updating ProBono', error });
    }
};

// Delete an ProBono by ID
exports.deleteProBono = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProBono = await ProBono.findByIdAndDelete(id);
        if (!deletedProBono) {
            return res.status(404).json({ message: 'ProBono not found' });
        }
        return res.status(200).json({ message: 'ProBono deleted successfully', deletedProBono });
    } catch (error) {
        return res.status(400).json({ message: 'Error deleting ProBono', error });
    }
};
