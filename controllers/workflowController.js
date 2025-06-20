const workflowService = require('../services/workflowService');

exports.runWorkflow = async (req, res) => {
  try {
    const { workflow, data } = req.body;

    if (!workflow || !data) {
      return res.status(400).json({ error: 'Missing workflow or data in request body' });
    }

    const workflowSteps = JSON.parse(workflow);
    const workflowData = JSON.parse(data);
    const documents = req.files || [];

    const result = await workflowService.run(workflowSteps, workflowData, documents);

    res.status(200).json({ message: '✅ Workflow executed successfully', result });
  } catch (error) {
    console.error('❌ Error executing workflow:', error.message);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
