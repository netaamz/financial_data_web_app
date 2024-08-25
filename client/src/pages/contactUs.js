import React, { useState } from 'react';
import './ContactUs.css'; // Import your custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Ensure axios is imported

function ContactUs() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '', 
        topic: '',
    });
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validateContactForm = () => {
        const { name, email, subject,message, topic } = form;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let errorMessage = '';

        if (!name) {
            errorMessage += 'Name is required.\n';
        }

        if (!emailPattern.test(email)) {
            errorMessage += 'Invalid email address.\n';
        }

        if (!subject) {
            errorMessage += 'Subject is required.\n';
        }

        if (!message) {
            errorMessage += 'Message is required.\n';
        }

        if (topic === '') {
            errorMessage += 'Please select a topic.\n';
        }

        setErrors(errorMessage);
        return !errorMessage;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateContactForm()) {
            try {
                const response = await axios.post('http://localhost:3001/contactUs', form);

                if (response.data.success) {
                    setSuccess('Message sent successfully!');
                    setForm({
                        name: '',
                        email: '',
                        subject: '',
                        message: '',
                        topic: ''
                    });
                } else {
                    setErrors(response.data.message || 'Failed to send message.');
                }
            } catch (error) {
                setErrors(error.response?.data?.message || 'An error occurred.');
            }
        }
    };

    const contactSupport = () => {
        window.location.href = "mailto:support@example.com";
    };

    return (
        <div className="container1 mt-5">
            <div className="row justify-content-center">
                <div className="mainContact col-md-10 col-lg-8 p-0">
                    <div className="row g-0">
                        {/* Contact Information Column */}
                        <div className="contactInfo col-12 col-md-6 p-3">
                            <h1>Need 24/7 Support</h1>
                            <button type="button" onClick={contactSupport} className="btn btn-primary support-button">
                                Contact Support
                            </button>
                            <br></br>
                            <h2>Let's get in touch</h2>
                            <ul className="list-unstyled">
                                <li><i className="bi bi-telephone" aria-hidden="true"></i> CALL SALES NOW</li>
                                <p>+1-512-827-3500</p>
                                <li><i className="bi bi-clock" aria-hidden="true"></i> SALES HOURS</li>
                                <p>7am- 7pm</p>
                                <li><i className="bi bi-person" aria-hidden="true"></i> SALES CONTACT INFO</li>
                                <p>mysales@gmail.com <br />+1-512-827-3500</p>
                                <li><i className="bi bi-envelope" aria-hidden="true"></i> MAILING ADDRESS</li>
                                <p>Austin, Texas 78701<br />United States</p>
                            </ul>
                            <p>Connect with us:</p>
                            <div className="social-media">
                            <div className="social-media">
                                <a className="btn btn-link" href="https://facebook.com" aria-label="Facebook">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a className="btn btn-link" href="https://twitter.com" aria-label="Twitter">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="btn btn-link" href="https://instagram.com" aria-label="Instagram">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a className="btn btn-link" href="https://linkedin.com" aria-label="LinkedIn">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                            </div>
                        </div>
                        {/* Contact Form Column */}
                        <div className="contactForm col-12 col-md-6 p-3">
                            <form id="contactForm" onSubmit={handleSubmit}>
                                <label htmlFor="contactName" aria-hidden="true">Contact Us</label>
                                <input
                                    type="text"
                                    id="contactName"
                                    name="name"
                                    placeholder="Name"
                                    className="form-control"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="email"
                                    id="contactEmail"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    id="contactSubject"
                                    name="subject"
                                    placeholder="Subject"
                                    className="form-control"
                                    value={form.subject}
                                    onChange={handleChange}
                                    required
                                />
                                <textarea
                                    id="contactMessage"
                                    name="message"
                                    placeholder="Message"
                                    className="form-control"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />
                                <select
                                    id="contactTopic"
                                    name="topic"
                                    className="form-select"
                                    value={form.topic}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select Topic</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="support">Support</option>
                                    <option value="feedback">Feedback</option>
                                </select>
                                <button type="submit" className="btn btn-primary mt-3">
                                    Send
                                </button>
                                {errors && <div className="alert alert-danger mt-3">{errors}</div>}
                                {success && <div className="alert alert-success mt-3">{success}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
