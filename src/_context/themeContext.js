import React, { createContext, Component } from 'react'

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {

    state = {
        isLightTheme: true,
        light: {
            name: "light",
            backgroundColor: "#fff",
            color: "#282c34",
            linkColor: "#61dafb",
            logoBackground: "red",
            
            border: 'rgba(0,0,0,.2)',
        },
        dark: {
            name: "dark",
            backgroundColor: "#2D2D2D",
            color: "white",
            linkColor: "#61dafb",
            logoBackground: "white",
            border: 'rgba(255,255,255,.1)',
        },
    }



    toggleTheme = () => {
        this.setState({ isLightTheme: !this.state.isLightTheme })
    }

    render() {
        return (
            <ThemeContext.Provider
                value={{ ...this.state, toggleTheme: this.toggleTheme }}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }



}


export default ThemeContextProvider;
