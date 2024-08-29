import sendEmail from '../models/emailService.js';

export const contactUs = async (req, res) => {
    console.log('Received contact request:', req.body); // Debugging log

    const { name, email, subject, message } = req.body;

    try {
        const emailResult = await sendEmail(name,email, subject, message);
        if (emailResult.success) {
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false, message: emailResult.message });
        }
    } catch (err) {
        console.error('Error handling contact request:', err); // Debugging log
        res.status(400).json({ error: err.message });
    }
};