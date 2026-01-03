const Insight = require('../model/InsightModal'); // Adjust the path as necessary

// Create a new insight
exports.createInsight = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newInsight = new Insight({ title, description });
        await newInsight.save();
        return res.status(201).json({ message: 'Insight created successfully', newInsight });
    } catch (error) {
        return res.status(400).json({ message: 'Error creating insight', error });
    }
};

// Get all insights
exports.getAllInsights = async (req, res) => {
    try {
        // Fetch and sort insights by createdAt in descending order
        const insights = await Insight.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Insights retrieved successfully',
            data: insights
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Error retrieving insights',
            error
        });
    }
};


// Get an insight by ID
exports.getInsightById = async (req, res) => {
    try {
        const insight = await Insight.findById(req.params.id);
        if (!insight) {
            return res.status(404).json({ message: 'Insight not found' });
        }
        return res.status(200).json({ message: 'Insight retrieved successfully', insight });
    } catch (error) {
        return res.status(400).json({ message: 'Error retrieving insight', error });
    }
};

// Update an insight by ID
exports.updateInsight = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedInsight = await Insight.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedInsight) {
            return res.status(404).json({ message: 'Insight not found' });
        }
        return res.status(200).json({ message: 'Insight updated successfully', updatedInsight });
    } catch (error) {
        return res.status(400).json({ message: 'Error updating insight', error });
    }
};

// Delete an insight by ID
exports.deleteInsight = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInsight = await Insight.findByIdAndDelete(id);
        if (!deletedInsight) {
            return res.status(404).json({ message: 'Insight not found' });
        }
        return res.status(200).json({ message: 'Insight deleted successfully', deletedInsight });
    } catch (error) {
        return res.status(400).json({ message: 'Error deleting insight', error });
    }
};
