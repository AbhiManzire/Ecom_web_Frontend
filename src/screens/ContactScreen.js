import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaPaperPlane } from 'react-icons/fa';
import Meta from '../components/Meta';

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Meta title="Contact Us - YOUTH CIRCLE" />

      {/* Luxury Editorial Header */}
      <div className="relative pt-12 pb-24 bg-white overflow-hidden border-b border-slate-dark/5">
        {/* Background Decorative Watermark */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.07] select-none pointer-events-none overflow-hidden">
          <h2 className="text-[100px] sm:text-[160px] md:text-[200px] lg:text-[250px] font-black text-slate-dark tracking-tighter leading-none italic">CONTACT</h2>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-end">
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-12 h-[2px] bg-slate-dark"></div>
              <span className="text-[10px] font-black tracking-[0.4em] text-slate-dark/40 uppercase">Global Support</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-slate-dark leading-[0.85] tracking-tighter uppercase">
              REACH <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px #30364F' }}>OUT.</span>
            </h1>
          </div>
          <div className="pb-4">
            <p className="text-xl text-slate-dark/60 font-medium max-w-lg leading-relaxed mx-auto lg:mx-0">
              Our concierge team is available worldwide to provide personalized assistance for every YOUTH CIRCLE inquiry.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-12 sm:py-16 md:py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-20">
            {/* Contact Information Sidebar */}
            <div className="lg:col-span-2 space-y-16">
              <div className="space-y-4">
                <span className="text-[10px] font-black tracking-[0.3em] text-slate-dark/30 uppercase">Inquiries</span>
                <h2 className="text-5xl font-black text-slate-dark tracking-tighter uppercase">Get In Touch</h2>
                <div className="w-16 h-[6px] bg-slate-dark"></div>
              </div>

              <div className="space-y-10">
                {[
                  { icon: <FaPhone />, title: "Voice", info: ["+1 (555) 123-4567", "+1 (555) 987-6543"] },
                  { icon: <FaEnvelope />, title: "Digital", info: ["info@youthcircle.com", "support@youthcircle.com"] },
                  { icon: <FaMapMarkerAlt />, title: "Archives", info: ["123 Fashion Street, Style District", "New York, NY 10001"] },
                ].map((item, i) => (
                  <div key={i} className="group flex items-start gap-6">
                    <div className="w-14 h-14 bg-white border border-slate-dark/5 flex items-center justify-center rounded-2xl group-hover:bg-slate-dark group-hover:text-white transition-all duration-500 shadow-sm">
                      <div className="text-xl">{item.icon}</div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-dark/30">{item.title}</h4>
                      {item.info.map((line, j) => (
                        <p key={j} className="text-lg font-bold text-slate-dark leading-tight">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Connect */}
              <div className="pt-10 border-t border-slate-dark/10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-dark/40 mb-8">Social Connect</h3>
                <div className="flex space-x-4">
                  {[FaFacebook, FaInstagram, FaTwitter, FaPinterest].map((Icon, i) => (
                    <a key={i} href="/" className="w-12 h-12 bg-white border border-slate-dark/5 text-slate-dark flex items-center justify-center rounded-xl hover:bg-slate-dark hover:text-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-slate-dark/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-1000">
                  <FaPaperPlane size={140} />
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-dark/30 ml-4">Full Identity</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#FAF9F6] px-8 py-5 rounded-2xl font-bold text-sm text-slate-dark border border-slate-dark/5 focus:border-slate-dark/20 focus:outline-none transition-all placeholder:text-slate-dark/20"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-dark/30 ml-4">Digital Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#FAF9F6] px-8 py-5 rounded-2xl font-bold text-sm text-slate-dark border border-slate-dark/5 focus:border-slate-dark/20 focus:outline-none transition-all placeholder:text-slate-dark/20"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-dark/30 ml-4">Inquiry Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#FAF9F6] px-8 py-5 rounded-2xl font-bold text-sm text-slate-dark border border-slate-dark/5 focus:border-slate-dark/20 focus:outline-none transition-all placeholder:text-slate-dark/20"
                      placeholder="Order Status, Collaboration, etc."
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-dark/30 ml-4">Brief Narrative</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full bg-[#FAF9F6] px-8 py-6 rounded-3xl font-bold text-sm text-slate-dark border border-slate-dark/5 focus:border-slate-dark/20 focus:outline-none transition-all placeholder:text-slate-dark/20 resize-none"
                      placeholder="How can we assist you today?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-6 bg-slate-dark text-white rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:shadow-slate-dark/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 group/btn"
                  >
                    Transmit Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Editorial Section */}
      <div className="bg-white py-32 border-t border-slate-dark/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-24 space-y-4">
            <span className="text-[10px] font-black tracking-[0.5em] text-slate-dark/40 uppercase">Common Intelligence</span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-dark tracking-tighter uppercase leading-none">THE ARCHIVE FAQ</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              { q: "What is your return policy?", a: "We offer a 30-day return policy for all items in original condition. Returns are free and easy to process." },
              { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery in select areas." },
              { q: "Do you offer international shipping?", a: "Yes, we ship worldwide. International shipping times vary by location, typically 7-14 business days." },
              { q: "How can I track my order?", a: "Once your order ships, you'll receive a tracking number via email. You can track your package on our website." },
            ].map((faq, i) => (
              <div key={i} className="group p-10 bg-[#FAF9F6] rounded-3xl border border-slate-dark/5 hover:border-slate-dark/20 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-2xl font-black text-slate-dark/10 group-hover:text-slate-dark/20 transition-colors italic">0{i + 1}</span>
                  <h3 className="text-xl font-black text-slate-dark uppercase tracking-tighter leading-tight">{faq.q}</h3>
                </div>
                <p className="text-sm font-bold text-slate-dark/50 leading-relaxed pl-12">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactScreen;
