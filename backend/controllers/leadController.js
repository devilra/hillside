import Lead from '../models/Lead.js';

// Create a contact callback lead (Public)
export const createContactLead = async (req, res) => {
  const { name, phone, city, subtitle } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'Name and phone number are required.' });
  }

  try {
    await Lead.create({
      type: 'contact',
      name,
      phone,
      city: city || null,
      subtitle: subtitle || null
    });

    return res.status(201).json({ message: 'Callback request registered successfully.' });
  } catch (error) {
    console.error('Error creating contact lead:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Create a detailed dream land lead (Public)
export const createDreamLandLead = async (req, res) => {
  const {
    name,
    phone,
    landSize,
    unitSize,
    houseOption,
    landType,
    landscape,
    requirements
  } = req.body;

  if (!name || !phone || !requirements) {
    return res.status(400).json({ message: 'Name, phone, and requirements are required.' });
  }

  // Format checkbox arrays to strings
  const formattedLandType = Array.isArray(landType) ? landType.join(', ') : landType;
  const formattedLandscape = Array.isArray(landscape) ? landscape.join(', ') : landscape;

  try {
    await Lead.create({
      type: 'dream_land',
      name,
      phone,
      landSize: landSize || null,
      unitSize: unitSize || 'Sq.Ft',
      houseOption: houseOption || null,
      landType: formattedLandType || null,
      landscape: formattedLandscape || null,
      requirements
    });

    return res.status(201).json({ message: 'Dream land requirements submitted successfully.' });
  } catch (error) {
    console.error('Error creating dream land lead:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get all leads (Admin protected)
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll({
      order: [['created_at', 'DESC']]
    });
    return res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Update lead status (Admin protected)
export const updateLeadStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required.' });
  }

  const validStatuses = ['new', 'contacted', 'ignored'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  try {
    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found.' });
    }

    lead.status = status;
    await lead.save();

    return res.json({ message: 'Lead status updated successfully.' });
  } catch (error) {
    console.error('Error updating lead status:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Delete lead (Admin protected)
export const deleteLead = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await Lead.destroy({
      where: { id }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Lead not found.' });
    }

    return res.json({ message: 'Lead deleted successfully.' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
