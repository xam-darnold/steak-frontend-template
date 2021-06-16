import React from 'react'
import Footer from '../components/footer'

export function FooterContainer() {
    return(
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                <Footer.Column>
                    <Footer.Title>About Us</Footer.Title>
                    <Footer.Link href="#">Story</Footer.Link>
                    <Footer.Link href="#">Team</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                    <Footer.Title>Socials</Footer.Title>
                    <Footer.Link href="#">Twitter</Footer.Link>
                    <Footer.Link href="#">Medium</Footer.Link>
                    <Footer.Link href="#">Github</Footer.Link>
                    <Footer.Link href="#">Discord</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                    <Footer.Title>Information</Footer.Title>
                    <Footer.Link href="#">Documents</Footer.Link>
                    <Footer.Link href="#">Product Paper</Footer.Link>
                </Footer.Column>
                </Footer.Row>
            </Footer.Wrapper>
        </Footer>
    )
}