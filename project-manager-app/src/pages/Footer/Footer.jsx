import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyle";

const Footer = () => {
  return (
    <Box>
      {/* <h1 style={{ color: "#198754", textAlign: "center", marginTop: "-50px" }}>
        Project Manager
      </h1> */}
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="/about">Mission</FooterLink>
            <FooterLink href="/about">Vision</FooterLink>
            <FooterLink href="/about">Testimonials</FooterLink>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="/about">Task Management</FooterLink>
            <FooterLink href="/about">Board Customization</FooterLink>
            <FooterLink href="/about">Mobile Access</FooterLink>
            <FooterLink href="/about">Improved Organization</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="/about">San Pedro Sula</FooterLink>
            <FooterLink href="/about">Tegucigalpa</FooterLink>
            <FooterLink href="/about">La Ceiba</FooterLink>
            <FooterLink href="/about">Choluteca</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="https://www.facebook.com/project-manager">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>Facebook</span>
              </i>
            </FooterLink>
            <FooterLink href="https://www.instagram.com/project-manager">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>Instagram</span>
              </i>
            </FooterLink>
            <FooterLink href="https://twitter.com/project-manager">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>Twitter</span>
              </i>
            </FooterLink>
            <FooterLink href="https://www.youtube.com/company/project-manager">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>Youtube</span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};

export default Footer;
