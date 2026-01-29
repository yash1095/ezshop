import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('All fields are required');
      return;
    }

    if (formData.message.length < 10) {
      toast.error('Message must be at least 10 characters long');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/contact', formData);
      
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='px-5'>
      <div className='max-w-2xl m-auto'>
        <div className='mb-10'>
          <h1 className='text-4xl font-bold mb-2'>Contact Us</h1>
          <p className='text-gray-600'>We would love to hear from you. Send us a message and we will respond as soon as possible.</p>
        </div>

        <div className='grid grid-cols-12 gap-8'>
          {/* Contact Form */}
          <div className='col-span-12 md:col-span-7'>
            <div className='border rounded-lg p-6 bg-white'>
              <form onSubmit={handleSubmit}>
                <div className='mb-5'>
                  <label htmlFor="name" className='block font-semibold mb-2'>Full Name *</label>
                  <input 
                    id='name' 
                    name='name'
                    type="text" 
                    placeholder='Enter your full name' 
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div className='mb-5'>
                  <label htmlFor="email" className='block font-semibold mb-2'>Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div className='mb-5'>
                  <label htmlFor="subject" className='block font-semibold mb-2'>Subject *</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name='subject'
                    placeholder='What is this about?'
                    value={formData.subject}
                    onChange={handleChange}
                    className='w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div className='mb-6'>
                  <label htmlFor="message" className='block font-semibold mb-2'>Message *</label>
                  <textarea 
                    id="message"
                    name='message'
                    placeholder='Enter your message (minimum 10 characters)'
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className='w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                  ></textarea>
                  <p className='text-xs text-gray-500 mt-1'>{formData.message.length}/min 10 characters</p>
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-gradient-to-br from-blue-500 to-cyan-500 py-3 px-4 rounded-md text-white font-semibold hover:saturate-200 duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className='col-span-12 md:col-span-5'>
            <div className='bg-blue-50 rounded-lg p-6 mb-6'>
              <h3 className='text-xl font-bold mb-4'>Get in Touch</h3>
              <div className='space-y-4'>
                <div>
                  <p className='font-semibold text-gray-700'>Email</p>
                  <a href="mailto:support@ezshop.com" className='text-blue-500 hover:underline'>support@ezshop.com</a>
                </div>
                <div>
                  <p className='font-semibold text-gray-700'>Phone</p>
                  <p className='text-gray-600'>+91 1234567890</p>
                </div>
                <div>
                  <p className='font-semibold text-gray-700'>Address</p>
                  <p className='text-gray-600'>123 Shopping Street,<br/>Commerce City, CC 12345</p>
                </div>
              </div>
            </div>

            <div className='bg-green-50 rounded-lg p-6'>
              <h3 className='text-lg font-bold mb-2'>Response Time</h3>
              <p className='text-gray-600'>We typically respond to all inquiries within 24 hours during business days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact