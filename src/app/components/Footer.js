import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="bg-gray-900 text-white flex items-center justify-center px-4 h-16">
           <p className="text-center">Copyright &copy;{currentYear} Get-Me-A-Chai | All Right Reserved</p>
        </footer>
    )
}

export default Footer