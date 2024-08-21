import sendEmail from './src/models/emailService.js'; // Ensure this path is correct

const testEmail = async () => {
    const result = await sendEmail('noa.krispin@e.braude.ac.il', 'Test Subject', 'This is a test email.');
    console.log(result);
};

testEmail();
