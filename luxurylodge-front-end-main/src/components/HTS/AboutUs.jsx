import React from 'react';
import { connect } from 'react-redux';
import Nav from '../home/Nav';
import Footer from '../home/footer';

const AboutUsPage = ({ darkMode }) => {
    const teamMembers = [
        {
            id: 1,
            name: 'LAWAL LAWAL MUAZU ',
            imageUrl: 'images/lawal.jpeg',
            description: 'Software Manager ,Frontend &​ Backend Developer​',
            link: "https://www.instagram.com/emzel__?igsh=MTgxb2Q0emZzYTQ2cg%3D%3D&utm_source=qr"
        },
        {
            id: 2,
            name: 'ZAID HAMDI MOHTASEB​',
            imageUrl: 'images/zaid.jpg',
            description: 'Mobile Application Developer',
            link: "https://www.instagram.com/zaid.mohtaseb?igsh=MTB4dHVvMzZoZ2FqMA=="
        },
        
      
        {
            id: 3,
            name: 'Prince-alfred frank​',
            imageUrl: 'images/prince.jpg',
            description: 'Web Frontend Developer',
            link: "https://www.instagram.com/king_al_d1st?igsh=MXNhbmU4eGtkOG04MA=="
        },
        {
            id: 4,
            name: 'SADIQ IBRAHIM UMAR​',
            imageUrl: 'images/sadik.jpg',
            description: 'Mobile Application Developer',
            link: "  https://www.instagram.com/sadiqib0?igsh=eTZsbzBocTd5ZnFn"
        },
        {
            id: 5,
            name: 'Musa Muhammad ​',
            imageUrl: 'images/musa.jpg',
            description: 'Database Architecture​& Backend Developer',
            link:"https://www.instagram.com/its_mozzey?igsh=MTFsY2ZqdG5ncDk4dw=="
        }
    ];

    return (
        <div>
            <Nav/>
            
            <div className={`section ${darkMode ? "dark" : ""}`}>
            <hr/>
                <div className="about-us-container">
                   
                    <h1>About Us</h1>
                    <div className="team-members">
                        {teamMembers.map(member => (
                            <a key={member.id} href={member.link} className="team-member">
                                <img src={member.imageUrl} alt={member.name} />
                                <h2>{member.name}</h2>
                                <p>{member.description}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};




const mapStateToProps = (state) => {
    return {
        cardData: state.cardData,
        darkMode: state.darkMode,
    };
};

export default connect(mapStateToProps)(AboutUsPage);