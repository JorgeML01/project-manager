import React from "react";
import "./styles.css";

function ContactInfo() {
  return (
    <section id="contact" role="contact">
      <div className="container-contact">
        <h2>Contact Us</h2>
        <p>
          We'd love to hear from you! If you have any questions, feedback, or
          inquiries, please don't hesitate to reach out to us. Our dedicated
          support team is here to assist you.
        </p>
        <div className="contact-info">
          <p>
            <i className="fas fa-phone"></i> Phone: +504 9519-9999
          </p>
          <p>
            <i className="fas fa-envelope"></i> Email:
            project_manager@contact.com
          </p>
          <p>
            <i className="fas fa-comments"></i> Live Chat: Visit our website and
            chat with one of our representatives during business hours.
          </p>
        </div>
        <p>
          Our office hours are Monday to Friday, 9:00 AM to 5:00 PM. We strive
          to respond to all inquiries within 24 hours. Your satisfaction is our
          top priority, and we're here to assist you every step of the way.
        </p>
        <p>
          Connect with us on social media to stay updated with our latest news,
          feature releases, and helpful tips:
        </p>
        <ul>
          <li>
            Facebook:{" "}
            <a href="https://www.facebook.com/project-manager">
              facebook.com/project-manager
            </a>
          </li>
          <li>
            Twitter:{" "}
            <a href="https://twitter.com/project-manager">
              twitter.com/project-manager
            </a>
          </li>
          <li>
            Instagram:{" "}
            <a href="https://www.instagram.com/project-manager">
              instagram.com/project-manager
            </a>
          </li>
          <li>
            Youtube:{" "}
            <a href="https://www.youtube.com/company/project-manager">
              youtube.com/company/project-manager
            </a>
          </li>
        </ul>
        <p>
          We value your feedback and strive to continuously improve our
          platform. Your input is crucial to help us deliver the best user
          experience possible. Don't hesitate to reach out to us with any
          questions, suggestions, or concerns. We're here to listen and assist
          you!
        </p>
      </div>
    </section>
  );
}

export default ContactInfo;
